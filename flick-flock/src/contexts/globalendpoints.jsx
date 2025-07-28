import { createContext, useContext } from "react";

const API_BASE = "http://localhost:5000";
const movieEndpointContext = createContext()

export const ApiProvider = ({ children }) => {
  const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
    };
}
