import api from "./api"

type busregType = {
  fullname: string;
  telNb: number;
  buscode: string;
  startstation: string;
  endstation: string;
}


export const busdetailsSave = async (data: busregType) => {
  const res = await api.post("/auth/saveprofile", data)
  return res.data
}

export const getroutedetails = async (busCode: any) => {
  const res = await api.get(`/auth/getroutedetails?busCode=${busCode}`)
  return res.data
}

export const saveRouteStatus = async (payload: any) => {
  const res = await api.post("/auth/saveroute", payload);
  return res.data;
};