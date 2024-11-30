// // cloudinaryConfig.js
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "djwldmjmy",
//   api_key: "lbfs2_sfGntUSP0rsCPcvACNwiQ",
//   api_secret: "867951997569272",
// });

// export default cloudinary;


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

