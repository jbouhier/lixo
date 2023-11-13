import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween.js"
import { JSONPreset } from 'lowdb/node'
import { nanoid } from 'nanoid'
import { defaultData } from './defaultData.mjs'

dayjs.extend(isBetween)
const db = await JSONPreset('./db.json', defaultData)
const { employees } = db.data

export const createEmployee = async ({ body }, res) => {
  const { firstName, lastName } = body
  const newEmployee = {
    id: nanoid(),
    firstName,
    lastName,
    vacations: [],
    inVacation: false
  }
  db.read()
  employees.push(newEmployee)
  await db.write()
  res.json(newEmployee)
}

export const getEmployees = (_, res) => {
  db.read()
  res.json(employees)
}

export const getEmployee = ({ params }, res) => {
  const { id } = params
  db.read()
  const match = employees.find(e => e.id === id)
  if (!match) res.status(404)
  res.json(match)
}

export const deleteEmployee = ({ params }, res) => {
  const { id } = params
  db.read()
  const index = employees.indexOf(e => e.id === id)
  if (index < 0) res.status(404)
  employees.splice(index, 1)
  db.write()
  res.status(200)
}

export const createVacation = async ({ body, params }, res) => {
  const { employeeId } = params
  const { startDate, endDate, comment } = body
  db.read()
  const match = employees.find(e => e.id === employeeId)
  if (match < 0) res.status(404)
  let inVacation = false
  const newVacation = {
    id: nanoid(),
    startDate,
    endDate,
    comment
  }
  match.vacations.push(newVacation)
  match.vacations.map(vac => {
    const { startDate, endDate } = vac
    const off = dayjs(new Date()).isBetween(startDate, dayjs(endDate))
    if (off) inVacation = true
  })
  match.inVacation = inVacation
  await db.write()
  res.json(newVacation)
}
