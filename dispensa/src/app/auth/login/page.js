"use client";
import { Navbar } from "@/app/components/navbar";
import { LoginForm } from "@/app/components/loginForm";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row flex-fill">
        <div className="col-12 col-lg-6 ">
          <img
            src="/img/dispensa.jpg"
            width="100%"
            height="75%"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-4">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    </div>
  );
}
