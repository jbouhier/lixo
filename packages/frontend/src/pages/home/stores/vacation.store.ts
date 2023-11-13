import { createEffect, createEvent, createStore, sample } from "effector"
import { API } from "../../../config"
import { NewVacation, Vacation } from "../../../types"
import { getEmployee } from "./employee.store"
import { getEmployees } from "./employees.store"

export const setStartDate = createEvent<Date | null>()
export const setEndDate = createEvent<Date | null>()
export const setComment = createEvent<string>()
export const createVacation = createEvent<NewVacation>()
export const resetVacation = createEvent()

export const createVacationFx = createEffect(async ({
  employee, vacation
}: NewVacation) => {
  const req = await fetch(`${API}/vacation/${employee.id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vacation)
  })
  getEmployee(employee)
  resetVacation()
  getEmployees()
  return req.json()
})

export const $vacation = createStore<Vacation>({
  startDate: null,
  endDate: null,
  comment: ''
})
  .on(setStartDate, (state, startDate) => ({ ...state, startDate }))
  .on(setEndDate, (state, endDate) => ({ ...state, endDate }))
  .on(setComment, (state, comment) => ({ ...state, comment }))
  .reset(resetVacation)

sample({
  clock: createVacation,
  target: createVacationFx
})
