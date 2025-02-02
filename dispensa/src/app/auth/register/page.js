"use client";
import { Navbar } from "@/app/components/navbar";
import { RegisterForm } from "@/app/components/registerForm";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row flex-fill">
        <div className="col-12 col-lg-6 p-0">
          <img
            src="/img/dispensa.jpg"
            width="100%"
            height="75%"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-4">
          <RegisterForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
      </div>
    </div>
  );
}
