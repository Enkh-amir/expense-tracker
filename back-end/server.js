import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8888;
const sql = neon(`${process.env.DATABASE_URL}`);

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await sql`SELECT * FROM users WHERE = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await sql`
        INSERT INTO users (name, email, password) 
        VALUES (${name}, ${email}, ${password})
        RETURNING id, email`;

    res
      .status(201)
      .json({ message: "user created successfully", user: newUser[0] });
  } catch (error) {
    res.status(201).json({ message: "Internal server error creating user" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
