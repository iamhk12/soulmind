"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function ToastProvider({ children }: any) {
  return (
    <>
      {children}
      <ToastContainer style={{ fontFamily: 'Poppins, sans-serif' , zIndex : 9999999}}  autoClose={1800} pauseOnHover={false} closeButton={false}/>
    </>
  );
}