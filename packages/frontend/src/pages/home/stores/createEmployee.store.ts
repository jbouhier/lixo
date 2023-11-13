import { createEffect, createEvent, sample } from "effector"
import { API } from "../../../config"
import { Employee } from "../../../types"
import { getEmployees } from "./employees.store"

type NewEmployee = Omit<Employee, 'id' | 'vacations' | 'inVacation'>

export const createEmployee = createEvent<NewEmployee>()

export const createEmployeeFx = createEffect(async (data: NewEmployee) => {
  const res = await fetch(`${API}/employee/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  getEmployees()
  return res.json()
})

sample({
  clock: createEmployee,
  target: createEmployeeFx
})
