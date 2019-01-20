const mongoose =require('mongoose');
const express = require('express');


var app = express();
mongoose.connect('mongodb://localhost/LibraryDB')
    .then(()=> console.log('connected module1'))
    .catch(err=>console.error('err'))


const bookSchema=new mongoose.Schema({
    ISBN : String,
    Title : String,
    Author : String,
    Publisher : String,
    Image : String,
    FA : String,
    Count : Number,
    AC :Number,
    desc : String,
    pc : Number
});

const BookDb = mongoose.model('BookDb', bookSchema);

async function createBook(){
    const Book=new BookDb({
        ISBN : "898456",
        Title :" bunksheet",
        Author : "nitin",
        Publisher : "amey",
        Image : "kwrgrgar",
        FA : "no",
        Count : 10,
        AC :8500,
        desc : "lsajgmal;eg, amgl",
        pc : 10
    });
    const result= await Book.save();
    console.log(result);
}
// for(var i = 0; i < 100;i++){
// createBook();
// }

// async function getBooks(){
//     const books=await BookDb.find();
//     console.log(books);
// }
// getBooks();

app.get('/listBooks', (req, res) => {
    async function getBooks(){
        const books=await BookDb.find().limit(10);
        console.log(books);
        res.send(books, () => {
            console.log(' ');
          })
    }
    getBooks();
    
});



app.listen(3000);

