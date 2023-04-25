import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Calendar from "../Components/Calendar";
import ImageHandler from "./ImageHandler";
import SignIn from "@/Components/SignIn";
import SignUp from "@/Components/SignUp";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Auth() {
  const [alreadyHave, setAlreadyHave] = useState(true);

  if (alreadyHave) {
    return (
      <div>
        <SignIn />
        <br />
        <br />
        <button
          onClick={() => {
            setAlreadyHave(!alreadyHave);
          }}
        >
          Don't have an account? Sign up
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <SignUp />
        <br />
        <br />
        <button
          onClick={() => {
            setAlreadyHave(!alreadyHave);
          }}
        >
          Already have an account? Sign in
        </button>
      </div>
    );
  }
}
