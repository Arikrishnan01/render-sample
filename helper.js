import { client } from "./sample.js";

export async function getAllBooks(req) {
  return await client.db("test").collection("books").find(req.query).toArray();
}
export async function getBookById(id) {
  return await client.db("test").collection("books").findOne({ id: id });
}
export async function deleteBook(id) {
  return await client.db("test").collection("books").deleteOne({ id: id });
}
export async function addBook(newBook) {
  return await client.db("test").collection("books").insertMany(newBook);
}
export async function updateBooks(id,updatedBook) {
  return await client.db("test").collection("books").updateOne({id:id},{updatedBook});
}
