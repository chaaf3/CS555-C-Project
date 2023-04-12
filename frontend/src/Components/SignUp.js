import React, { useEffect, useState } from "react";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState({ email: undefined });
  const [password, setPassword] = useState({ password: undefined });
  const [name, setName] = useState({ name: undefined });
  const [local, setLocal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLocal(localStorage.getItem("user"));
    }
  }, []);

  if (!local) {
    return (
      <div>
        <h1>Please enter your cridentials</h1>
        <form
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
          <label>User Name:</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
            id="name"
            placeholder="username"
            value={name.name}
          />

          <label>email:</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
            id="email"
            placeholder="email"
            value={email.email}
          />
          <label>password:</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password);
            }}
            id="password"
            placeholder="password"
            value={password.password}
          />

          <input type="submit" />
        </form>
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
