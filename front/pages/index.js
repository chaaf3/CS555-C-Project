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
      <Link href="ImageHandler">images</Link>
      <Calendar />
    </div>
  );
}
