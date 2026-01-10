import api from "./api"

type RegisterDataType = {
  busNb: String
  username: String
  password: string
  telNb: String
}


export const register = async (data: RegisterDataType) => {
  const res = await api.post("/auth/register", data)
  return res.data
}

// http://localhost:5000/api/v1/auth/login
export const loginDash = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { username, password })
  return res.data
}

export const getMyDetails = async () => {
  const token = localStorage.getItem("accessToken")
  if (!token) throw new Error("No access token found")

  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}



export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", {token: refreshToken})
  return res.data
}


