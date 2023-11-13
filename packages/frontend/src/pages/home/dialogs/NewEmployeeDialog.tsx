import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material"
import { useStore } from "effector-react"
import { useState } from "react"
import { createEmployee } from "../stores/createEmployee.store"
import { $newEmployeeDialog, toggleNewDialog } from "../stores/dialog.store"

export const NewEmployeeDialog = () => {
  const open = useStore($newEmployeeDialog)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const disabled =
    firstName.trim().length <= 0 ||
    lastName.trim().length <= 0
  const toggle = () => toggleNewDialog()

  const handleCreate = () => {
    createEmployee({ firstName, lastName })
    toggleNewDialog()
    setFirstName('')
    setLastName('')
  }

  return (
    <Dialog open={open} onClose={toggle}>
      <DialogTitle>Create Employee</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value)
          }}
          margin="dense"
          id="firstName"
          label="First name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value)
          }}
          margin="dense"
          id="lastName"
          label="Last name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        <Button
          onClick={handleCreate}
          disabled={disabled}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
