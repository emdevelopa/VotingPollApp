// src/utils/auth.js

export const getUserDetails = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    throw new Error("User is not logged in");
  }

  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
        "Content-Type": "application/json", // Optionally include content-type if needed
      },
    });

    // Check if the response status is OK (200-299)
    if (!response.ok) {
      // Log additional error details
      console.error("Error fetching user details:");
      console.error(`Status: ${response.status}`);
      console.error(`Status Text: ${response.statusText}`);
      window.location.href = "/login";

      // Optionally, log the response body if available
      const responseBody = await response.text(); // or response.json() if it's JSON
      console.error("Response Body:", responseBody);

      // Throw an error with a custom message
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json(); // Parse JSON response
    return data; // User details
  } catch (error) {
    console.error("Error fetching user details:", error);
    window.location.href = "/login";

    throw error;
  }
};
