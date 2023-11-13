import styled from "@emotion/styled"
import { Add } from "@mui/icons-material"
import { Button } from '@mui/joy'
import { Container } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'
import { useStore } from 'effector-react'
import { useEffect } from "react"
import { AlertDialog } from "./dialogs/ConfirmDialog"
import { EmployeeDialog } from "./dialogs/EmployeeDialog"
import { NewEmployeeDialog } from "./dialogs/NewEmployeeDialog"
import {
  toggleConfirmDialog,
  toggleEmployeeDialog,
  toggleNewDialog
} from "./stores/dialog.store"
import { setEmployee } from "./stores/employee.store"
import {
  $employees,
  getEmployees,
  getEmployeesFx
} from "./stores/employees.store"

export const Home = () => {
  const employees = useStore($employees)
  const loading = useStore(getEmployeesFx.pending)
  useEffect(() => getEmployees(), [])

  return (
    <Container>
      <NewEmployeeDialog />
      <EmployeeDialog />
      <AlertDialog />
      <Title>
        <h1>Employees</h1>
        <Button endDecorator={<Add />} onClick={() => toggleNewDialog()}>
          New employee
        </Button>
      </Title>
      <div style={{ height: 399, width: '100%' }}>
        <DataGrid
          rows={employees}
          loading={loading}
          columns={[
            { field: 'firstName', headerName: 'First name', flex: 250 },
            { field: 'lastName', headerName: 'Last name', flex: 250 },
            {
              field: 'status',
              headerName: 'Status',
              valueGetter: ({ row: { inVacation } }) =>
                (inVacation ? "Vacation 🌴" : "Work 💻"),
              flex: 200,
            },
            {
              field: 'id',
              headerName: 'Actions',
              renderCell: ({ row }) =>
                <Actions>
                  <Button
                    onClick={() => {
                      setEmployee(row)
                      toggleEmployeeDialog()
                    }}
                    variant="outlined">
                    Details
                  </Button>
                  <Button
                    onClick={() => {
                      setEmployee(row)
                      toggleConfirmDialog()
                    }}
                    color="danger"
                    variant="outlined">
                    Delete
                  </Button>
                </Actions>
              ,
              flex: 350,
              sortable: false,
              filterable: false
            }
          ]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick={true}
          checkboxSelection={true}
          autoHeight
        />
      </div>
    </Container>
  )
}

const Title = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
`
const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: .8rem;
  align-items: center;
  width: 100%;
`
