import db from "../../lib/db";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const {
    name,
    email,
    phoneNo,
    VCN,
    nin,
    SOR,
    LG,
    ward,
    PUN,
    ProfilePic,
    gender,
  } = await req.json();
  console.log(name);

  if (
    !name ||
    !email ||
    !phoneNo ||
    !VCN ||
    !nin ||
    !SOR ||
    !LG ||
    !ward ||
    !PUN ||
    !ProfilePic ||
    !gender
  ) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, phoneNo, VCN, nin, SOR, LG, ward, PUN, ProfilePic, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?,?)",
      [name, email, phoneNo, VCN, nin, SOR, LG, ward, PUN, ProfilePic, gender]
    );

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        userId: result.insertId,
      }),
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return new Response(JSON.stringify({ message: "user already exists" }), {
        status: 400,
      });
    } else {
      console.log(error);

      return new Response(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
      );
    }
  }
};
