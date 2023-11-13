import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route
} from "react-router-dom"
import { Layout } from "./Layout"
import { Home } from "./pages"
import { home } from "./paths"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="*" element={<Navigate to={home} replace />} />
    </Route>
  )
)

