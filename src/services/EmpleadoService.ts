import { Empleados } from "@/interfaces/Empleados";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getEmpleados = async (): Promise<AxiosResponse<Empleados[]>> =>
  await axios.get("/Empleados");

export const getEmpleadosId = async (id: string): Promise<AxiosResponse<Empleados>> =>
  await axios.get(`/Empleados/${id}`);

export const createEmpleados = async (Empleados: Empleados): Promise<AxiosResponse> =>
  await axios.post("/Empleados", Empleados);

export const updateEmpleados = async (
  id: string,
  newEmpleados: Empleados
): Promise<AxiosResponse<Empleados>> => await axios.put(`/Empleados/${id}`, newEmpleados);

export const deleteEmpleados = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/Empleados/${id}`);