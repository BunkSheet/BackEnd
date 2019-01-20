const mongoose =require('mongoose');
var mongodb = require('mongodb');
const Books = require('/models/books');
const bodyParser = require('body-parser');
var alias = '/nd';
const axios = require('axios');
// root url https://mighty-hollows-23016.herokuapp.com/
module.exports = function(app){


    app.get(alias + '/libCount', function(req, res){
        var count={"count1":"100","count2":"50","count3":"65","count4":"99"}
        res.send(count);
    });
    app.get(alias + '/notifyCount', function(req, res){
        var count={"notifications":"3"}
        res.send(count);
    });
    app.get(alias+'/webClientUser',function(req,res){
        var temp={
            "name":"Nitin Dhevar","Image":"https://unsplash.com/photos/ew3-7k3sl-g","RegId":"E2K17206323","Contact":"8888823456","Address":"Pict,pune.","Dob":"03-06-1998"
        }
        res.send(temp);
    });

    app.get(alias + '/test', function(req, res){
        res.send('test');
    });

// mongoose.connect('mongodb://localhost/LibraryDB')
//     .then(()=> console.log('connected'))
//     .catch(err=>console.error('err'))

    app.get(alias+'/pushNotification',function(req,res){
        var temp=[{
            "title":"Library Notice","body":"There is an seminar organised by central library in february!","Image":"http://books.google.com/books/content?id=r9x-OXdzpPcC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            ,"Id":"ND12345678",
            "time":Date(Date.now()).toString()
        },{
            "title":"Notice","body":"Tommorow is an holiday!","Image":"http://books.google.com/books/content?id=gvg5OtC0CJ8C&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE71PrCV7rQlMkwtvOZ_wKm0b9YbVduAVyRnHsObu3vY3WQQVqdPYujfmw_aroQ7xJRaJD64zW07P-CnmHnEUCGPFkHYtluzlgE8L7D4RcpDJbqz1nqjXAGFCOvSesiyQ9qEM6b_K&source=gbs_api",
            "Id":"ND12345679",
            "time":Date(Date.now()).toString()
        }]
        res.send(temp);

    });

    // var MongoClient = mongodb.MongoClient;
    // var url = 'mongodb://dbuser:Dbuser123@ds161134.mlab.com:61134/bunksheet';
    // MongoClient.connect(url, function (err, db) {
    //     if (err) {
    //       console.log('Unable to connect to the mongoDB server. Error:', err);
    //     } else {
    //       console.log('Connection established to', url);
    //       var temp=db.find();
    //       console.log(db);
    //     }
    //   });
var url = "mongodb://dbuser:Dbuser123@ds161134.mlab.com:61134/bunksheet";

mongoose.connect(url)
    .then((result)=>console.log(`Connected to mlab db`))
    .catch((err)=>console.log(err));
    var db = mongoose.connection;
    // var temp=db.books.find();
    // console.log(temp);



    //var title,body,imageLink,Id;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post(alias + '/addBook',(req,res)=>{
        var tempIsbn=req.body.Isbn;
        var tempAcNo=req.body.AcNo;
        var tempselfLink=req.body.selfLink;
        var newBook;
            axios.get(tempselfLink)
                .then(response => {
                    // console.log(response.data.url);
                    // console.log(response.data.explanation);
                     newBook = new Books(response.json);
                     newBook.save()
                     })
                  .catch(error => {
                   console.log(error);
                    });
            // async function createBook(){
            // const result= await newBook.save();
            // console.log(result);
        //}
        //createBook();
        res.send("All Done");

    });



    app.post(alias+'/postNotifications',function(req,res){
        title=req.title;
        body=req.body;
        imageLink=req.imageLink;
        Id=req.Id;
    });


    app.post(alias+'/delNotification',function(req,res){
        var tempId=req.Id;
        if(Id==tempId){
            title=null;
            body=null;
            imageLink=null;
            Id=null;
        }
    });


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



}
