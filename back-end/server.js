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
    const existingUser =
      await sql`SELECT * FROM "users" WHERE email = ${email}`;
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

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await sql`SELECT * FROM "users" WHERE email = ${email}`;
    if (user.length === 0) {
      return res.status(400).json({ message: "email or password not match" });
    }

    if (user[0].password !== password) {
      return res.status(400).json({ message: "password not match" });
    }

    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error during login user" });
  }
});

app.post("/records", async (req, res) => {
  const { name, user_id, amount, transaction_type, description, category_id } =
    req.body;

  try {
    console.log("Received data:", req.body);

    const newRecord = await sql`
      INSERT INTO records (name, user_id, amount, transaction_type, category_id, description) 
      VALUES (${name}, ${user_id}, ${amount}, ${transaction_type}, ${category_id}, ${description})
      RETURNING *;
    `;

    res.status(201).json({
      message: "Record created successfully",
      record: newRecord[0],
    });
  } catch (error) {
    console.error("Error creating record:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.get("/records", async (req, response) => {
  try {
    const sqlResponse = await sql`SELECT * FROM records;`;
    response.json({ data: sqlResponse, success: true });
  } catch (error) {
    response.json({ error: error.message, success: false });
  }
});

app.get("/records/:type", async (req, response) => {
  const { type: transaction_type } = req.params;
  try {
    let sqlResponse;

    if (transaction_type) {
      sqlResponse = await sql`
        SELECT * FROM records
        WHERE transaction_type = ${transaction_type};
      `;
    } else {
      sqlResponse = await sql`SELECT * FROM records;`;
    }

    response.json({ data: sqlResponse, success: true });
  } catch (error) {
    response.json({ error: error.message, success: false });
  }
});

app.get("/records/category/:cateType", async (req, response) => {
  const { cateType: category_id } = req.params;

  try {
    let sqlResponse;

    sqlResponse = await sql`
        SELECT * FROM records
        WHERE category_id IN (${category_id});
      `;

    response.json({ data: sqlResponse, success: true });
  } catch (error) {
    response.json({ error: error.message, success: false });
  }
});

app.get("/records/:type/:cateType", async (req, response) => {
  const { type: transaction_type, cateType: category_id } = req.params;
  try {
    let sqlResponse;

    if (transaction_type && category_id) {
      sqlResponse = await sql`
        SELECT * FROM records
        WHERE transaction_type = ${transaction_type} AND category_id = ${category_id};
      `;
    } else {
      sqlResponse = await sql`SELECT * FROM records;`;
    }

    response.json({ data: sqlResponse, success: true });
  } catch (error) {
    response.json({ error: error.message, success: false });
  }
});

app.post("/categories", async (req, res) => {
  const { name, description, category_icon, icon_color } = req.body;

  try {
    const newCategory = await sql`
      INSERT INTO categories (name, description, category_icon, icon_color) 
      VALUES (${name}, ${description}, ${category_icon}, ${icon_color})
      RETURNING *;
    `;

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory[0],
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/categories", async (_, response) => {
  try {
    const sqlResponse = await sql`SELECT * FROM categories;`;
    response.json({ data: sqlResponse, success: true });
  } catch (error) {
    response.json({ error: error, success: false });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
