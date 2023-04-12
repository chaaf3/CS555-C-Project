import React, { useEffect, useState } from "react";
import { Input, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState({ email: undefined });
  const [password, setPassword] = useState({ password: undefined });
  const [name, setName] = useState({ name: undefined });
  const [local, setLocal] = useState(null);
  const [error, setError] = useState(null);

  if (!local) {
    return (
      <div>
        <FormControl
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              let temp = await axios.post(
                "http://localhost:3001/users/signUp",
                {
                  values: { name: name, email: email, password: password },
                }
              );
              localStorage.setItem("user", temp.data._id);
              setLocal(temp.data._id);
            } catch (e) {
              console.log(e.response.data.error);
              setError(e.response.data.error);
              throw "bad inputs";
            }
          }}
        >
          <InputLabel>User Name:</InputLabel>
          <Input
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
            id="name"
            placeholder="username"
            value={name.name}
          />

          <InputLabel>email:</InputLabel>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
            id="email"
            placeholder="email"
            value={email.email}
          />
          <InputLabel>password:</InputLabel>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password);
            }}
            id="password"
            placeholder="password"
            value={password.password}
          />

          <Input type="submit" />
        </FormControl>
        {error && <p>{error}</p>}
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          user with id: {localStorage.getItem("user")} is created and logged in
        </h1>
        <button
          onClick={() => {
            localStorage.clear();
            setLocal(null);
            setError(null);
          }}
        >
          logOut
        </button>
      </div>
    );
  }
};

export default SignUp;
