import { Container, CssBaseline } from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Outlet } from "react-router-dom"
import { Header } from "./components"

export const Layout = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CssBaseline />
    <Header />
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  </LocalizationProvider>
)
