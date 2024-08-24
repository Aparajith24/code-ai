import { Inter } from "@next/font/google";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function Login() {
  return (
    <main className={`${inter.variable}`}>
      <h1 className="text-3xl font-bold">Login</h1>
    </main>
  );
}
