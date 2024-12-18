"use client"
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserAuth } from "@/app/AuthContext"
import { auth } from '../firebase'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isValidUser, setIsValidUser] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsValidUser(true);
        } else {
          router.push("/");
        }
      });
    };
    checkAuth();
  }, []);

  if (isValidUser) {
    return (
      <div className={inter.className}>
        {children}
      </div>
    );
  } else {
    return null;
  }
}

export default RootLayout;
