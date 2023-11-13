import { createEffect, createEvent, createStore, sample } from "effector"
import { API } from "../../../config"
import { Employee } from "../../../types"

export const getEmployees = createEvent()

export const getEmployeesFx = createEffect(async () => {
  const req = await fetch(`${API}/employees`)
  return req.json()
})

export const $employees = createStore<Employee[]>([])
  .on(getEmployeesFx.doneData, (_, employees) => employees)

sample({
  clock: getEmployees,
  source: $employees,
  target: getEmployeesFx,
})
