import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState({ email: undefined });
  const [password, setPassword] = useState({ password: undefined });
  const [name, setName] = useState({ name: undefined });
  const [local, setLocal] = useState(null);
  const [error, setError] = useState(null);
  const [isContractor, setContractor] = useState({ isContractor: undefined });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLocal(localStorage.getItem("user"));
    }
  }, []);

  if (!local) {
    return (
      <div>
        <header>Sign In</header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isContractor) {
              try {
                let temp = await axios.post(
                  "http://localhost:3001/users/signIn",
                  {
                    values: { email: email, password: password },
                  }
                );
                console.log(localStorage.getItem("user"));
                localStorage.setItem("user", temp.data._id);
                localStorage.setItem("type", "user");
                setLocal(temp.data._id);
              } catch (e) {
                setError(e.response.data.error);
                throw "bad inputs";
              }
            } else {
              try {
                let temp = await axios.post(
                  "http://localhost:3001/contractors/signIn",
                  {
                    values: { email: email, password: password },
                  }
                );
                localStorage.setItem("user", temp.data._id);
                setLocal(temp.data._id);
                localStorage.setItem("type", "contractor");
              } catch (e) {
                setError(e.response.data.error);
                throw "bad inputs";
              }
            }
          }}
        >
          <label>Email:</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
            id="email"
            placeholder="email"
            value={email.email}
            name="email"
          />
          <label>Password:</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password);
            }}
            id="password"
            placeholder="password"
            value={password.password}
          />
          <label style={{ display: "block", textAlign: "center" }}>
            Account Type Contractor:
          </label>
          <input
            onChange={() => {
              setContractor(true);
              document.getElementById("contractor").checked = true;
              document.getElementById("user").checked = false;
            }}
            id="contractor"
            type="radio"
            value={isContractor.isContractor}
          />
          <label style={{ display: "block", textAlign: "center" }}>
            Account Type User:
          </label>
          <input
            onChange={() => {
              setContractor(false);
              document.getElementById("contractor").checked = false;
              document.getElementById("user").checked = true;
            }}
            id="user"
            type="radio"
            value={isContractor.isContractor}
          />

          <input type="submit" />
        </form>
        {error && <p>{error}</p>}
        
      </div>
    );
  } else {
    return (
      <div>
        <header>Home Page</header>
        <nav class="nav-bar">
          <Link
            href="Auth"
            class="page-link"
          >
            Home
          </Link>
          <Link
            href="Calendar"
            class="page-link"
          >
            Calendar
          </Link>
          <Link
            href="ImageHandler"
            class="page-link"
          >
            Upload Image
          </Link>
        </nav>
        <h1>User with ID: {localStorage.getItem("user")} is logged in</h1>
        <button
          onClick={() => {
            localStorage.clear();
            setLocal(null);
          }}
        >
          Log Out
        </button>
      </div>
    );
  }
};

export default SignIn;
