import db from "../../lib/db";

export const POST = async (req) => {
    const { email, candidateId } = await req.json();
    console.log(email, candidateId);
    

  // Check if inputs are empty
  if (!candidateId) {
    return new Response(JSON.stringify({ message: "No canidate voted for" }), {
      status: 400,
    });
  }
  if (!email) {
    return new Response(JSON.stringify({ message: "Unkown Voter" }), {
      status: 400,
    });
  }

  try {
    const [rows] = await db.query(
      "UPDATE users SET candidateId = ? WHERE email = ?",
      [candidateId, email]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const user = rows[0];

    return new Response(JSON.stringify({ message: "Vote Successfull" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
