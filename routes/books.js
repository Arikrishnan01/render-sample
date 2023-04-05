import express from "express";
import { getAllBooks, getBookById, deleteBook, addBook } from "../helper.js";
const router = express.Router();
// app.get("/books",(req,res)=>{
//     const {language,rating} = req.query;
//     console.log(req.query,language);
//     console.log(req.query,rating);
//     let filteredBook=books;
//     if(language)
//     {
//       filteredBook=filteredBook.filter((bk) => bk.language == language)
//     }
//     if(rating)
//     {
//       filteredBook=filteredBook.filter((bk) => bk.rating == rating)
//     }
//     res.send(filteredBook);
// });

// get all books from db

router.get("/",async (req,res)=>{
    const {language,rating} = req.query;
    console.log(req.query,language);
    if(req.query.rating){   // all data store in the req.query so check and store here
      req.query.rating = req.query.rating;
    }
    // const book = await client.db("test").collection("books").find(req.query).toArray();
    const book = await getAllBooks(req);
    res.send(book);
  })
  
  // get book by the id
  router.get("/:id",async (req,res) =>{
      const {id} = req.params;
      // const book = await client.db("test").collection("books").findOne({ id: id });
      const book = await getBookById(id);
      // const book=books.find((bk)=> bk.id === id);
      res.send(book);
  });
  
  // delete the perticular book by id
  router.delete("/:id",async (req, res) =>{
    const {id} = req.params;
    console.log(req.params);
    // const book = await client.db("test").collection("books").deleteOne({ id: id });
    const book = await deleteBook(id);
    res.send(book);
  });
  
  // Add the book into db => express.json(),
  router.post("/",async (req,res)=>{
    const newBook = req.body;
    console.log(newBook);
    // const book = await client.db("test").collection("books").insertMany(newBook);
    const result = await addBook(newBook);
    res.send(result);
  })

  // Update the books
  router.put("/",async (req,res)=>{
    const {id}=req.params;
    const updatedBook = req.body;
    console.log(updatedBook);
    // const book = await client.db("test").collection("books").insertMany(newBook);
    const resulted = await updateBooks(id,updatedBook);
    res.send(resulted);
  })

 export const booksRoute = router;