'use client'
import React, { useEffect } from "react";
import ModalComponent from "@/components/home/ModelComponent"
import { loginWithGoogle } from "@/function-apis/auth";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useRouter } from 'next/navigation'

const Docs = () => {
  useEffect(() => {
    // Update document title when component mounts
    document.title = 'SoulMind - Login';
    // Clean up document title when component unmounts
    return () => {
        document.title = 'SoulMind';
    }
}, []);
    const router = useRouter()
  const handleLogin = () => {
    loginWithGoogle();
  };
  const { isAuthenticated, userData } = useCheckAuth();
  if(isAuthenticated===true){
    router.push('/community')
  }else {
    return (
        <ModalComponent
        title="SignIn"
        handleLogin={handleLogin}
      ></ModalComponent>
    )
  }
}

export default Docs
