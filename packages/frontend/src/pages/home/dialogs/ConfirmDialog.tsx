import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useStore } from 'effector-react'
import { $confirmDialog, toggleConfirmDialog } from '../stores/dialog.store'
import { $employee, deleteEmployee } from '../stores/employee.store'

export const AlertDialog = () => {
  const open = useStore($confirmDialog)
  const { id, firstName, lastName } = useStore($employee)
  const toggle = () => toggleConfirmDialog()

  return (
    <Dialog
      open={open}
      onClose={toggle}
      maxWidth="xs"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete employee ?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`${firstName} ${lastName}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}
          variant='outlined'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            deleteEmployee(id)
            toggle()
          }}
          color='error'
          variant='contained'
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
