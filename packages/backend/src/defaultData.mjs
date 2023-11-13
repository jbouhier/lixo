import { nanoid } from 'nanoid'

export const defaultData = {
  employees: [
    {
      id: nanoid(),
      firstName: 'Alain',
      lastName: 'Deloin',
      vacations: [],
      inVacation: false
    },
    {
      id: nanoid(),
      firstName: 'Louis',
      lastName: 'De Fufu',
      vacations: [],
      inVacation: false
    }
  ]
}
