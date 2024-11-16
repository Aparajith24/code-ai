import { Inter } from "next/font/google";
import { AuthContextProvider } from "./AuthContext";
import Login from "./login/page";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function Home() {
  return (
    <AuthContextProvider>
     <Login />
    </AuthContextProvider>
  );
}
