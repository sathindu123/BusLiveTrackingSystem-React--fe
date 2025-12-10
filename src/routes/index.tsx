import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Layout from "../components/Layout"


const Loginto = lazy(() => import("../pages/DriverLoginPage"))
const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/DriverRegisterPage"))

type RequreAuthTypes = { children: ReactNode, roles?: string[] }


const RequireAuth = ({ children, roles }: RequreAuthTypes) => {

  const { user, loading } = useAuth()

  if (loading) {
    return <div>User Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold md-2">Access denied</h2>
        <p>You do not have permission to view this page</p>
      </div>
    )
  }

  return <>{children}</>
}

// home component eka portected kala
export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          
          <Route path="/login" element={<Login />} />
          
          <Route
              path="/register"
              element={
                <Loginto
                  onLoginSuccess={(name) => {
                    console.log("Driver Login Success:", name);
                  }}
                  onBack={() => {
                    window.history.back();
                  }}
                  onRegisterClick={() => {
                    console.log("Redirect to register page");
                  }}
                />
              }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />

   
          <Route element={<RequireAuth><Layout /></RequireAuth>}>
            <Route path="/home" element={<Home />} />

            <Route
              path="/mypost"
              element={
                <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                  <Login />
                </RequireAuth>
              }
            />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
