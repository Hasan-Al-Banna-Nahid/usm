"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { registerUser, resetState } from "@/store/registrationSlice";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar/Navbar";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const { loading, error, success } = useSelector(
    (state: RootState) => state.registration
  );

  useEffect(() => {
    if (success) {
      router.push("/routes/login");
      dispatch(resetState());
    }
  }, [success, router, dispatch]);

  const handleRegister = () => {
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div>
      <Navbar />
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default RegisterPage;
