import { QueryError, QueryResult } from "mysql2";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Juniverse325!",
  database: "board",
});

connection.connect((err: QueryError | null) => {
  if (err) {
    console.error("!Error connecting to the database:", err);
    return;
  }
  console.log("!Connected to the database");
});

export default connection;
