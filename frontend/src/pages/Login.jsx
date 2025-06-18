import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const { data } = await axios.post(
  //       `http://localhost:8000/api/auth/login`,
  //       {
  //         email,
  //         password,
  //       },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  //     if (data.success) {
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter name"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
