import { createEvent, createStore } from "effector"

export const toggleConfirmDialog = createEvent()
export const toggleNewDialog = createEvent()
export const toggleEmployeeDialog = createEvent()

export const $confirmDialog = createStore(false)
  .on(toggleConfirmDialog, (state) => !state)

export const $newEmployeeDialog = createStore(false)
  .on(toggleNewDialog, (state) => !state)

export const $employeeDialog = createStore(false)
  .on(toggleEmployeeDialog, (state) => !state)
