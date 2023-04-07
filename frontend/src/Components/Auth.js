import React, { useEffect, useState } from "react";
import axios from "axios";
const Auth = () => {
  const [email, setEmail] = useState({ username: undefined });
  const [password, setPassword] = useState({ password: undefined });

  return (
    <div>
      <h1>Please enter your cridentials</h1>
      <form
      // onSubmit={async (e) => {
      //   e.preventDefault();
      //   try {
      //     await axios.get("http://localhost:3000/users/signIn"),
      //       { params: { email: email, password: password } };
      //   } catch (e) {
      //     throw "bad inputs";
      //   }
      // }}
      >
        <label>username:</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
          id="username"
          placeholder="User Name"
          value={email.username}
          name="username"
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
    </div>
  );
};

export default Auth;
