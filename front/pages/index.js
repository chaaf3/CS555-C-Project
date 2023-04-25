import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Calendar from "../Components/Calendar";
import ImageHandler from "./ImageHandler";
import { Button } from "@mui/material";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <header>Welcome to the Contractor's Portal</header>
      <nav class='nav-bar'>
        <Link href="Auth" class='page-link'>Sign In</Link>
        <Link href="Calendar" class='page-link'>Calendar</Link>
        <Link href="ImageHandler" class='page-link'>Upload Image</Link>
      </nav>
    </div>
  );
}
