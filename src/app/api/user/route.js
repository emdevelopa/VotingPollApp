import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract the token from the Authorization header
  console.log("Received Token:", token); // Log the token to ensure it's being sent
  if (!token) {
    return new Response(JSON.stringify({ message: "No token provided" }), {
      status: 401,
    });
  }
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
  return new Response(JSON.stringify({ user: decoded.user }), { status: 200 });
} catch (error) {
  if (error instanceof jwt.TokenExpiredError) {
    return new Response(
      JSON.stringify({ message: "Token expired. Please login again." }),
      { status: 401 }
    );
  }
  return new Response(JSON.stringify({ message: "Invalid or expired token" }), {
    status: 401,
  });
}

}
