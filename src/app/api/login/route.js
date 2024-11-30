import db from "../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  const { nin, VCN, email } = await req.json();

  // Check if inputs are empty
  if (!email || !VCN || !nin) {
    return new Response(
      JSON.stringify({ message: "Email and password are required" }),
      { status: 400 }
    );
  }


  try {
   const [rows] = await db.query(
     "SELECT * FROM users WHERE email = ? AND nin = ? AND VCN = ?",
     [email, nin, VCN]
   );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const user = rows[0];
    
    

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   return new Response(JSON.stringify({ message: "Invalid credentials" }), {
    //     status: 401,
    //   });
    // }

    const token = jwt.sign({ user, candidateId: user.candidateId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      { status: 200 }
    );
  } catch (error) {
      console.log(error);
      
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
