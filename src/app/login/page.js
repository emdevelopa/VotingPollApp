"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use this in the app directory
import Navbar from "../components/navbar";

export default function Login() {
  const [formData, setFormData] = useState({ nin: "", VCN: "", email: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await fetch("/api/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(formData),
     });

     if (!response.ok) {
       // Check for non-2xx response codes
       const errorData = await response.json();
       throw new Error(errorData?.message || "An unexpected error occurred.");
     }

     const data = await response.json();

     if (data.token) {
       localStorage.setItem("token", data.token); // Save token
       router.push("/dashboard"); // Redirect to dashboard
     } else {
       setMessage("Unexpected response format from server.");
     }
   } catch (error) {
     // Log the error and display a message to the user
    //  console.error(error); // Only for debugging, remove in production
     setMessage(error.message || "An error occurred. Please try again.");
   }
 };


  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="font-bold text-[24px] mb-10">Welcome Back</h1>
        <form className="flex flex-col w-[40%] gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            className="outline-none border border-[grey] rounded-md p-3"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            className="outline-none border border-[grey] rounded-md p-3"
            type="text"
            placeholder="NIN"
            value={formData.nin}
            onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
            required
          />
          <input
            type="text"
            className="outline-none border border-[grey] rounded-md p-3"
            placeholder="Voters Card Number"
            value={formData.VCN}
            onChange={(e) => setFormData({ ...formData, VCN: e.target.value })}
            required
          />

          <button
            className="outline-none font-bold border border-[grey] bg-[#000000] text-white rounded-md p-3 hover:bg-transparent hover:text-black transition-all duration-500 ease-in-out"
            type="submit"
          >
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
