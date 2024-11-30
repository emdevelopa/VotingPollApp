This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## DB Configuration

User Table
```bash
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each user
    name VARCHAR(255) NOT NULL,        -- Name of the user
    email VARCHAR(255) NOT NULL,       -- Email address
    phoneNo VARCHAR(15),               -- Phone number
    VCN VARCHAR(50),                   -- VCN (adjust length as necessary)
    nin VARCHAR(50),                   -- NIN (adjust length as necessary)
    SOR VARCHAR(100),                  -- State of Residence (adjust length as necessary)
    LG VARCHAR(100),                   -- Local Government
    ward VARCHAR(100),                 -- Ward
    PUN VARCHAR(100),                  -- Polling Unit Number
    ProfilePic VARCHAR(255),           -- Profile picture URL or filename
    gender ENUM('Male', 'Female', 'Other'), -- Gender as an ENUM
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically track creation time
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Automatically track updates
);

```
