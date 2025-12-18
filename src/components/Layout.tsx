import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Navbar from "../pages/Navbar"
import { UserRole } from "../types"

const Layout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        role={user?.role ?? UserRole.GUEST}
        onLogout={() => {
          logout()
          navigate("/login")
        }}
        onHome={() => navigate("/")}
      />

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
