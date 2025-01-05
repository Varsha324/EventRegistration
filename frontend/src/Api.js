import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", 
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("accessToken"); 
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

export const loginUser = (data) => API.post("/api/users/login", data);
export const signUpUser = (data) => API.post("/api/users/signup", data);
export const getAllEvents = () => API.get("/api/register/all");
export const getEvents = () => API.get("/api/register/");
export const createEvents = (data) => API.post("/api/register/", data);
export const updateEvents = (id,data) => API.put(`/api/register/${id}`,data);
export const deleteEvents = (id) => API.delete(`/api/register/${id}`);
export const getEvent = (id) => API.get(`/api/register/${id}`);
export const approveOrRejectEvent = (id, data) => API.put(`/api/register/${id}`, data);
export const getAllAssesment = ()=>API.get("/api/assesment/all")
export const getAssesment = ()=>API.get("/api/assesment/")
export const updateAssesment=(id,data)=>API.put(`/api/assesment/${id}`,data)
export const createAssesments=(data)=>API.post("/api/assesment/",data)
export const approveOrRejectAssesment = (id, data) => API.put(`/api/assesment/${id}`, data);

