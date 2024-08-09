"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar/Navbar";
import "@/app/globals.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const baseUrl =
    "https://nmtb1f8pzc.execute-api.ap-southeast-2.amazonaws.com/default/task4";

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        email,
        password,
      });

      const { accessToken } = response.data;
      console.log(accessToken);
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        router.push("/");
      }
    } catch (error: any) {
      setError(
        "Login failed: " + (error.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="form-control mt-6">
                <button onClick={handleLogin}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
