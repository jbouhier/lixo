import { createEffect, createEvent, createStore, sample } from "effector"
import { API } from "../../../config"
import { Employee } from "../../../types"
import { getEmployees } from "./employees.store"

export const getEmployee = createEvent<Employee>()
export const setEmployee = createEvent<Employee>()
export const deleteEmployee = createEvent<string>()
export const resetEmployee = createEvent()

const getEmployeeFx =
  createEffect(async (employee: Employee) => {
    const res = await fetch(`${API}/employee/${employee?.id}`)
    return res.json()
  })

const deleteEmployeeFx =
  createEffect(async (id: string) => {
    const res = await fetch(`${API}/employee/${id}`, {
      method: 'DELETE'
    })
    getEmployees()
    return res.json()
  })

export const $employee = createStore<Employee>({
  id: '',
  firstName: '',
  lastName: '',
  vacations: [],
  inVacation: false
})
  .on(setEmployee, (_, employee) => employee)
  .on(getEmployeeFx.doneData, (_, employee) => employee)
  .reset(resetEmployee)

sample({
  clock: getEmployee,
  source: $employee,
  target: getEmployeeFx
})

sample({
  clock: deleteEmployee,
  target: deleteEmployeeFx
})
