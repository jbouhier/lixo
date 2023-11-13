export type Vacation = {
  startDate: Date | null
  endDate: Date | null
  comment?: string
}

export type Employee = {
  id: string
  firstName: string
  lastName: string
  vacations: Vacation[]
  inVacation: boolean
}

export type NewVacation = {
  employee: Employee
  vacation: Vacation
}
