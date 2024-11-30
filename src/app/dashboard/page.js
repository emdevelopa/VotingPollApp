// src/app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { getUserDetails } from "../utils/auth";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library for generating unique IDs
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

// Updated candidates array with unique IDs
const candidates = [
  {
    id: "b78cc08b-dbfa-48e1-9af7-375fbd914e09",
    Salutation: "Dr.",
    Name: "John Doe",
    Gender: "Male",
    Picture:
      "https://res.cloudinary.com/djwldmjmy/image/upload/v1721685621/DP_bzocsf.avif",
    PartyOrGroupName: "Future Innovators Alliance",
    LogoOrEmblem:
      "https://images.unsplash.com/photo-1641945512195-c7f95e359283?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvbGl0aWNhbCUyMHBhcnR5fGVufDB8fDB8fHww",
    Profile:
      "John Doe is a visionary leader committed to sustainable innovation and social development. With over 20 years of experience in public policy and technology, he has spearheaded numerous initiatives to bridge the digital divide.",
    SocialMediaLink: {
      Twitter: "https://res.cloudinary.com",
      Facebook: "https://res.cloudinary.com",
      LinkedIn: "https://res.cloudinary.com",
    },
    votes: 8,
  },
  {
    id: "0a2d6d4f-ddf8-43bf-bcc6-f3399bd4100b",
    Salutation: "Ms.",
    Name: "Jane Smith",
    Gender: "Female",
    Picture:
      "https://res.cloudinary.com/djwldmjmy/image/upload/v1721685621/DP_bzocsf.avif",
    PartyOrGroupName: "Green Earth Coalition",
    LogoOrEmblem:
      "https://images.unsplash.com/photo-1641945512195-c7f95e359283?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvbGl0aWNhbCUyMHBhcnR5fGVufDB8fDB8fHww",
    Profile:
      "Jane Smith is an environmental advocate passionate about creating sustainable communities. She has led multiple campaigns for clean energy and wildlife conservation.",
    SocialMediaLink: {
      Instagram: "",
      Twitter: "https://res.cloudinary.com",
    },

    votes: 8,
  },
  {
    id: "cf14d78e-9574-4915-8463-57d6f9653134",
    Salutation: "Mr.",
    Name: "Ali Khan",
    Gender: "Male",
    Picture:
      "https://res.cloudinary.com/djwldmjmy/image/upload/v1721685621/DP_bzocsf.avif",
    PartyOrGroupName: "United Progress Forum",
    LogoOrEmblem:
      "https://images.unsplash.com/photo-1641945512195-c7f95e359283?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvbGl0aWNhbCUyMHBhcnR5fGVufDB8fDB8fHww",
    Profile:
      "Ali Khan is a dynamic leader focused on empowering youth and fostering economic growth. He has worked extensively on education reform and digital entrepreneurship.",
    SocialMediaLink: {
      Facebook: "https://res.cloudinary.com",
      LinkedIn: "https://res.cloudinary.com",
    },
    votes: 8,
  },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [candidateId, setCandidateId] = useState("");
  const [voteCounts, setVoteCounts] = useState(
    candidates.reduce((acc, candidate) => {
      acc[candidate.id] = candidate.votes;
      return acc;
    }, {})
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails.user);
      } catch (error) {
        setError("Error fetching user details");
      }
    };

    fetchUser();
  }, []);

  const handleVote = async (candidateId) => {
    setVotedCandidate(candidateId);
    console.log(candidateId);

    setVoteCounts((prevVotes) => ({
      ...prevVotes,
      [candidateId]: prevVotes[candidateId] + 1,
    }));

    setIsOpen(false);
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, candidateId }),
      });

      if (!response.ok) {
        // Check for non-2xx response codes
        const errorData = await response.json();
        throw new Error(errorData?.message || "An unexpected error occurred.");
      }

      const data = await response.json();

      if (data) {
        console.log(data);

        // localStorage.setItem("token", data.token); // Save token
        // router.push("/dashboard"); // Redirect to dashboard
      } else {
        console.log();
        ("Unexpected response format from server.");
      }
    } catch (error) {
      // Log the error and display a message to the user
      //  console.error(error); // Only for debugging, remove in production
      console.log();
      error.message || "An error occurred. Please try again.";
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <header className="bg-white shadow-md p-4 rounded-md mb-4 flex items-center justify-between">
        <div>
          <img className="w-[4em]" src="logo.png" alt="logo" />
        </div>
        <div>
          <h1 className="text-2xl max-md-[600px]:text-[16px] font-bold text-gray-600">
            Make Your Vote Count
          </h1>
        </div>
      </header>
      {isOpen && (
        <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-gray-700">Confirmation</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600">
                Are you sure you want to vote for this candidate?
              </p>
            </div>
            <div className="flex justify-end p-4 space-x-3 border-t">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                onClick={() => {
                  handleVote(candidateId);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <main>
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Vote for Your Candidate
          </h2>

          <div className="flex gap-4 max-md-[600px]:flex-col-reverse ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-[80%] h-[70vh] overflow-y-auto border p-2 max-md-[600px]:w-full">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`bg-white shadow-md relative rounded-lg p-4 text-center border ${
                    user.candidateId === candidate.id
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    className="w-[2em] h-[2em] max-w-full max-h-full right-2 m-auto object-cover  shadow-md absolute"
                    src={`${candidate.LogoOrEmblem}`}
                    width={100}
                    height={100}
                    alt="candidate_img"
                  />
                  <Image
                    className="w-[5em] h-[5em] max-w-full max-h-full rounded-full m-auto object-cover border-2 border-gray-300 shadow-md"
                    src={`${candidate.Picture}`}
                    width={100}
                    height={100}
                    alt="candidate_img"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {candidate.Salutation} {candidate.Name}
                  </h3>
                  <p className="text-[13px] text-left text-gray-600 mb-1">
                    {candidate.Profile}
                  </p>
                  <div className="w-full  text-left flex-col gap-2">
                    <p className="text-[13px] font-bold">
                      <strong>Party:</strong>
                      <span className="text-gray-600">
                        {" "}
                        {candidate.PartyOrGroupName}
                      </span>
                    </p>{" "}
                    <p className="text-[13px] font-bold">
                      <strong>Gender: </strong>
                      <span className="text-gray-600"> {candidate.Gender}</span>
                    </p>
                    <div className="mt-2">
                      {/* <strong className="text-[13px]">
                        Social Media Links:
                      </strong> */}
                      <ul className="flex items-center justify-center gap-3">
                        {Object.entries(candidate.SocialMediaLink).map(
                          ([platform, link]) => (
                            <li key={platform}>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-600"
                              >
                                {platform === "Twitter" && <FaTwitter />}
                                {platform === "Facebook" && <FaFacebook />}
                                {platform === "Instagram" && <FaInstagram />}
                                {platform === "LinkedIn" && <FaLinkedin />}
                                {/* Fallback to platform name if no icon matches */}
                                {![
                                  "Twitter",
                                  "Facebook",
                                  "Instagram",
                                  "LinkedIn",
                                ].includes(platform) && platform}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {user.candidateId === candidate.id ? (
                      <>Votes: {voteCounts[candidate.id]}</>
                    ) : (
                      ""
                    )}
                  </p>
                  {user.candidateId ? (
                    <p
                      className={`text-sm font-bold ${
                        user.candidateId === candidate.id
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {user.candidateId === candidate.id
                        ? "You voted for this candidate"
                        : "You cannot vote again"}
                    </p>
                  ) : (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => {
                        setCandidateId(candidate.id);
                        setIsOpen(true);
                      }}
                    >
                      Vote
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="shadow-md p-4 w-[30%] bg-white h-fit max-md-[600px]:w-full">
              <Image
                className="w-[8em] h-[8em] object-cover rounded-full m-auto"
                src={`https://res.cloudinary.com/djwldmjmy/image/upload/v1721685621/${user.ProfilePic}.avif`}
                alt="Uploaded"
                width={100}
                height={100}
              />
              <h1 className="text-center font-bold mt-4 text-[22px]">
                {user.name}
              </h1>
              <p className="mt-4 ">
                <strong>Email: </strong>
                {user.email}
              </p>
              <p className="mt-4 ">
                <strong>NIN: </strong>
                {user.nin}
              </p>
              <p className="mt-4 ">
                <strong>Voters Card Number: </strong>
                {user.VCN}
              </p>
              <p className="mt-4 ">
                <strong>Poll Unit Name: </strong>
                {user.PUN}
              </p>
              <p className="mt-4 ">
                <strong>Phone Number: </strong>
                {user.phoneNo}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
