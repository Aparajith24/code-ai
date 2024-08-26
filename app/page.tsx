import { Inter } from "next/font/google";

import Login from "./login/page";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function Home() {
  return (
    <main className={`${inter.variable}`}>
     <Login />
    </main>
  );
}
