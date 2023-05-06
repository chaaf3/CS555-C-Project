import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Calendar from "./Calendar";
import ImageHandler from "./ImageHandler";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "@/Components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <header>Welcome to the Contractor's Portal</header>
      <NavBar />
    </div>
  );
}
