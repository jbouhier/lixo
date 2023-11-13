import styled from "@emotion/styled"
import { Add } from "@mui/icons-material"
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip
} from "@mui/material"
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from 'dayjs'
import { useStore } from "effector-react"
import { Vacation } from "../../../types"
import { $employeeDialog, toggleEmployeeDialog } from "../stores/dialog.store"
import { $employee } from "../stores/employee.store"
import { $vacation, createVacation, resetVacation, setComment, setEndDate, setStartDate } from "../stores/vacation.store"

export const EmployeeDialog = () => {
  const open = useStore($employeeDialog)
  const employee = useStore($employee)
  const vacation = useStore($vacation)
  const { firstName, lastName, vacations } = employee
  const { startDate, endDate, comment } = vacation
  const disabled = !startDate || !endDate || startDate > endDate

  const toggle = () => {
    toggleEmployeeDialog()
    resetVacation()
  }
  const formatDate = (date: Date | null) => dayjs(date).format('DD/MM/YYYY')
  const submitVacation = () => createVacation({ employee, vacation })

  return (
    <>
      <Dialog
        open={open}
        onClose={toggle}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle>{`${firstName} ${lastName}`}</DialogTitle>
        <DialogContent
          sx={{
            minHeight: '500px'
          }}>
          <p>New vacation</p>
          <VacationForm>
            <DatePicker
              label="From"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              format='DD/MM/YYYY'
              sx={{
                width: '300px'
              }}
              disablePast
            />
            <DatePicker
              label="To"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              format='DD/MM/YYYY'
              sx={{
                width: '300px'
              }}
              disablePast
            />
            <TextField
              label="Comment"
              variant="outlined"
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e.target.value)
              }
              fullWidth={true}
            />
            <Tooltip title="Submit vacation" arrow>
              <>
                <Button
                  onClick={submitVacation}
                  variant="contained"
                  disabled={disabled}
                >
                  <Add />
                </Button>
              </>
            </Tooltip>
          </VacationForm>

          <p>Current vacations</p>
          <DataGrid
            rows={vacations}
            loading={!vacations}
            columns={[
              {
                field: 'startDate',
                headerName: 'Start',
                renderCell: ({ row }) =>
                  <>{formatDate(row.startDate)}</>,
                flex: 100
              },
              {
                field: 'endDate',
                headerName: 'End',
                renderCell: ({ row }: GridRenderCellParams<Vacation>) =>
                  <>{formatDate(row.endDate)}</>,
                flex: 100
              },
              {
                field: 'comment',
                headerName: 'Comment',
                flex: 400
              },
            ]}
            disableRowSelectionOnClick={true}
            initialState={{
              pagination: {
                paginationModel: { page: -1, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
            checkboxSelection={false}
            autoHeight
          />

        </DialogContent>
      </Dialog >
    </>
  )
}

const VacationForm = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`
