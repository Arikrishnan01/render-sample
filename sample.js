// const express = require('express')
// const { MongoClient } = require('mongodb');
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv' // this for dotenv import here
// import { getAllBooks, getBookById, deleteBook, addBook } from "./helper.js";
import { booksRoute } from "./routes/books.js";
dotenv.config()
const app = express()
// interceptor we use for body data to json data
app.use(express.json());
// const PORT=9000; // this is local storage purpoose on mongo
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
// console.log(process.env);
async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongodb is connected");
  return client;
}
export const client = await createConnection();




// const books=[
//     {
//       id: "001",
//       name: "Don Quixote App",
//       language:"Tamil",
//       rating: 8,
//       poster: "https://d1pwnu15mzvjms.cloudfront.net/210x320/9781504044486.jpg",
//       summary: "Often referred to as the first modern European novel, Don Quixote follows the exploits of the titular noble who becomes obsessed with the romantic notion of chivalry.",
//       trailer: "https://www.youtube.com/embed/yiiRZJUTT2k"
//     },
//     {
//       id: "002",
//       name: "Harry Potter",
//       language:"Tamil",
//       rating: 8.5,
//       poster: "https://orion-uploads.openroadmedia.com/sm_9333ba5b72d2-hp.jpg",
//       summary: "The most recent novel on this list, Harry Potter and the Sorcerer’s Stone brings readers into a world of magic at Hogwarts School of Witchcraft and Wizardry.",
//       trailer: "https://www.youtube.com/embed/VyHV0BRtdxo"
//     },
//     {
//       id: "003",
//       name: " There Were None",
//       language:"English",
//       rating: 7,
//       poster: "https://orion-uploads.openroadmedia.com/sm_e82064-and-then-there-were-none.jpg",
//       summary: "From acclaimed mystery author Agatha Christie, And Then There Were None is a mastery of tension. ",
//       trailer: "https://www.youtube.com/embed/zNzgvYdjRRI"
//     },
//     {
//       id: "004",
//       name: "Atitude Everythink",
//       language:"Hindi",
//       rating: 6,
//       poster: "https://i.pinimg.com/originals/48/16/db/4816db6e3a276f5795683058a13015b2.jpg",
//       summary: " The author explains using multiple examples instead of giving some soul-deep theories, which makes it easy to comprehend.",
//       trailer: "https://www.youtube.com/embed/ojQangi3poc"
//     }
//   ]

app.get('/', function (req, res) {
  res.send('Hello World')  
});

// // app.get("/books",(req,res)=>{
// //     const {language,rating} = req.query;
// //     console.log(req.query,language);
// //     console.log(req.query,rating);
// //     let filteredBook=books;
// //     if(language)
// //     {
// //       filteredBook=filteredBook.filter((bk) => bk.language == language)
// //     }
// //     if(rating)
// //     {
// //       filteredBook=filteredBook.filter((bk) => bk.rating == rating)
// //     }
// //     res.send(filteredBook);
// // });

// // get all books from db
// app.get("/books",async (req,res)=>{
//   const {language,rating} = req.query;
//   console.log(req.query,language);
//   if(req.query.rating){   // all data store in the req.query so check and store here
//     req.query.rating = req.query.rating;
//   }
//   // const book = await client.db("test").collection("books").find(req.query).toArray();
//   const book = await getAllBooks(req);
//   res.send(book);
// })

// // get book by the id
// app.get("/books/:id",async (req,res) =>{
//     const {id} = req.params;
//     // const book = await client.db("test").collection("books").findOne({ id: id });
//     const book = await getBookById(id);
//     // const book=books.find((bk)=> bk.id === id);
//     res.send(book);
// });

// // delete the perticular book by id
// app.delete("/books/:id",async (req, res) =>{
//   const {id} = req.params;
//   console.log(req.params);
//   // const book = await client.db("test").collection("books").deleteOne({ id: id });
//   const book = await deleteBook(id);
//   res.send(book);
// });

// // Add the book into db => express.json(),
// app.post("/books",async (req,res)=>{
//   const newBook = req.body;
//   console.log(newBook);
//   // const book = await client.db("test").collection("books").insertMany(newBook);
//   const result = await addBook(newBook);
//   res.send(result);
// })

app.use("/books",booksRoute);
app.listen(PORT,()=> console.log("Server is started :",PORT));



