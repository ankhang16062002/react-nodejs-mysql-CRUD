import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "test_data",
});

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.json("welcome to server");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
  });
});

app.post("/books", (req, res) => {
  const query =
    "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, [values], (error, data) => {
    if (error) res.json(error);
    else res.json("Book has been created successfully.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const query =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, [...values, bookId], (error, data) => {
    if (error) res.json(error);
    else res.json("Book has been update successfully.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (error, data) => {
    if (error) res.json(error);
    else res.json("Book has been delete successfully.");
  });
});

app.listen(8800, () => {
  console.log(`app is running`);
});
