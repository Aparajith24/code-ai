"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, User, Laptop2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type UserDataType = {
  name: string | null;
  email: string | null;
  displayPicture?: string | null;
} | null;

const UserOptions = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataType>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUserData({
          name: authUser.displayName || null,
          email: authUser.email || null,
          displayPicture: authUser.photoURL || null,
        });
      } else {
        setUserData(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (e) {}
  };

  return (
    <div className="justify-self-end p-0">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            className="relative h-10 w-10 rounded-full justify-self-end p-0"
          >
            <User className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="font-normal ml-5 h-[10%]"
                  >
                    Set Theme
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2" size={20} /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2" size={20} /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop2 className="mr-2" size={20} /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserOptions;
