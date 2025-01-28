"use client"
import { Navbar } from "@/app/components/navbar";
import { Form } from "@/app/components/form";
import { useState } from "react";
import { Footer } from "@/app/components/footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row flex-fill">
        <div className="col-12 col-lg-6 p-0">
          <img
            src="/img/invalid.jpg"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-4">
          <Navbar />
          <Form
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

