"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    VCN: "",
    nin: "",
    SOR: "",
    LG: "",
    ward: "",
    PUN: "",
    ProfilePic: "",
    gender:""
  });
  const [message, setMessage] = useState("");

  const [uploadedImageName, setUploadedImageName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message);
  };


  const handleUpload = (result) => {
    console.log("Upload result:", result); // Log the entire result
    try {
      if (result.event === "success") {
        const imageName = result.info.public_id;
        setUploadedImageName(imageName);
        // console.log("Uploaded image name:", imageName); // Log the image name

        // Update formData with the image name
        setFormData((prevData) => ({
          ...prevData,
          ProfilePic: imageName,
        }));
        
        
      } else {
        console.error("Upload event was not successful", result);
      }
    } catch (error) {
      console.error("Error during the upload process:", error);
      // Optional: Report to Rollbar if you want to track this error
      rollbar.error("Error in handleUpload function", error);
    }
  };
  return (
    <div>
      <Navbar page="register" />
      <div className="flex flex-col items-center justify-center ">
        <h1 className="font-bold text-[24px] mb-10">
          Register an account now to start voting
        </h1>
        <form className="flex flex-col w-[50%] gap-6" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-4">
            <input
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-between gap-4">
            <input
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              type="text"
              placeholder="Phone Number"
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData({ ...formData, phoneNo: e.target.value })
              }
              required
            />
            <input
              type="text"
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              placeholder="Voters Card Number"
              value={formData.VCN}
              onChange={(e) =>
                setFormData({ ...formData, VCN: e.target.value })
              }
              required
            />
          </div>{" "}
          <div className="flex justify-between gap-4">
            <input
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              type="text"
              placeholder="NIN"
              value={formData.nin}
              onChange={(e) =>
                setFormData({ ...formData, nin: e.target.value })
              }
              required
            />
            <input
              type="text"
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              placeholder="State of Residence"
              value={formData.SOR}
              onChange={(e) =>
                setFormData({ ...formData, SOR: e.target.value })
              }
              required
            />
          </div>{" "}
          <div className="flex justify-between gap-4">
            <input
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              type="text"
              placeholder="Local Government"
              value={formData.LG}
              onChange={(e) => setFormData({ ...formData, LG: e.target.value })}
              required
            />
            <input
              type="text"
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              placeholder="Ward"
              value={formData.ward}
              onChange={(e) =>
                setFormData({ ...formData, ward: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-between gap-4">
            <input
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              type="text"
              placeholder="Polling Unit Name"
              value={formData.PUN}
              onChange={(e) =>
                setFormData({ ...formData, PUN: e.target.value })
              }
              required
            />
            <CldUploadButton
              uploadPreset="votingpoll"
              onSuccess={handleUpload}
              style={{
                width: "100%",
                backgroundColor: "#007BFF",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Upload Profile Picture
            </CldUploadButton>

            {/* <input
              type="text"
              className="outline-none w-full border border-[grey] rounded-md p-3 "
              placeholder="Profile Picture"
              value={formData.VCN}
              onChange={(e) =>
                setFormData({ ...formData, VCN: e.target.value })
              }
              required
            /> */}
          </div>
          {uploadedImageName && (
            <div className="flex items-center gap-4 mt-4">
              <Image
                className="w-16 h-16 object-cover rounded-full"
                src={`https://res.cloudinary.com/djwldmjmy/image/upload/v1721685621/${uploadedImageName}.avif`}
                alt="Uploaded"
                width={100}
                height={100}
              />
            </div>
          )}
          {/* Gender */}
          <div>
            <label className="font-bold">Gender</label>
            <div className="flex gap-2 items-center justify-center w-fit">
              <input
                type="radio"
                name="gender" // Group radio buttons with the same name
                value="Male"
                id="male"
                className="outline-none border border-[grey] rounded-md p-3"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <label for="male">Male</label>
            </div>
            <div className="flex gap-2 items-center justify-center w-fit">
              <input
                type="radio"
                name="gender"
                value="Female"
                id="female"
                className="outline-none border border-[grey] rounded-md p-3"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <label for="female">Female</label>
            </div>
            <div className="flex gap-2 items-center justify-center w-fit">
              <input
                type="radio"
                name="gender"
                value="Other"
                id="other"
                className="outline-none border border-[grey] rounded-md p-3"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <label for="other">Other</label>
            </div>
          </div>
          <button
            className="outline-none font-bold border border-[grey] bg-[#000000] text-white rounded-md p-3 hover:bg-transparent hover:text-black transition-all duration-500 ease-in-out"
            type="submit"
          >
            Register
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
