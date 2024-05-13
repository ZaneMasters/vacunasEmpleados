
import { AxiosResponse } from "axios";
import axios from "./axios";
import { Login } from "@/interfaces/Logins";


export const loginadmin = async (Login: Login): Promise<AxiosResponse> =>
    await axios.post("/login", Login);

export const loginuser = async (Login: Login): Promise<AxiosResponse> =>
    await axios.post("/login-new", Login);