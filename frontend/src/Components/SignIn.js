import React, { useEffect, useState } from "react";
import axios from "axios";
const SignIn = () => {
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
                "http://localhost:3001/users/signIn",
                {
                  values: { email: email, password: password },
                }
              );
              console.log(localStorage.getItem("user"));
              localStorage.setItem("user", temp.data._id);
              setLocal(temp.data._id);
            } catch (e) {
              setError(e.response.data.error);
              throw "bad inputs";
            }
          }}
        >
          <label>email:</label>
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
        <h1>user with id: {localStorage.getItem("user")} is logged in</h1>;
        <button
          onClick={() => {
            localStorage.clear();
            setLocal(null);
          }}
        >
          logOut
        </button>
      </div>
    );
  }
};

export default SignIn;
