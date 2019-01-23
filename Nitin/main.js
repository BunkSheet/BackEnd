const mongoose =require('mongoose');
var mongodb = require('mongodb');
//const {Books}  = require(process.cwd() + '/models/books');
const {Book}  = require(process.cwd() + '/models/booksDetails');
const { Backup }  = require(process.cwd() + '/models/backupDb');
//const Books = require(process.cwd() + '/models/books');
var request = require('request');
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
// var url = "mongodb://dbuser:Dbuser123@ds161134.mlab.com:61134/bunksheet";
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
        var tempIsbn=req.body.ISBN;
        var tempAcNo=req.body.ACNO;
        var tempselfLink=req.body.selfLink;
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        newdate = year + "/" + month + "/" + day;
        var backup= new Backup({ISBN:tempIsbn,ACNO:tempAcNo,SELFLINK:tempselfLink,timeStamp:newdate});
            backup.save();
        request(tempselfLink, function (error, response, body) {
               var data = JSON.parse(body);
               //console.log(data);
               newBook = new Book();
               newBook.data = data;
               newBook.save();
            });


    app.get(alias + '/bookCount', function(req, res){
        async function getBookCount(){
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
        newdate = year + "/" + month + "/" + day;
            const count=await Backup.find({timeStamp:newdate}).count();
            
            res.send(count);
        }
        getBookCount();
    });

            // axios.get(tempselfLink)
            //     .then(response => {
            //         console.log(response.json);
            //         newBook = new Book({data:response.json});
            //         newBook.save();
            //           async function createBook(){
            //          const result= await newBook.save();
            //          console.log(result);
            //                                         }
            //          createBook();
                    // console.log(response.data.url);
                   // console.log(response.json);
                     // newBook = new Books(response.json);
                     // newBook.save()s
                    //  var temp=response.json();
                    //  const newBook=new Books({
                    //     kind:temp.kind,
                    //     id: temp.id,
                    //     etag: temp.etag,
                    //     selfLink: temp.selfLink,
                    //         volumeInfo.title: temp.volumeInfo.title,
                    //         volumeInfo.authors:temp.volumeInfo.authors ,
                    //         volumeInfo.publisher:temp.volumeInfo.publisher ,
                    //         volumeInfo.publishedDate: temp.volumeInfo.publishedDate,
                    //         volumeInfo.description: temp.volumeInfo.description,
                    //         volumeInfo.industryIdentifiers: temp.volumeInfo.industryIdentifiers,
                    //         volumeInfo.readingModes.text: temp.volumeInfo.readingModes.text,
                    //         volumeInfo.readingModes.image:  temp.volumeInfo.readingModes.image,
                    //         volumeInfo.pageCount:temp.volumeInfo.pageCount ,
                    //         volumeInfo.printType:temp.volumeInfo.printType,
                    //         volumeInfo.categories: temp.volumeInfo.categories,
                    //         volumeInfo.averageRating: temp.volumeInfo.averageRating,
                    //         volumeInfo.ratingsCount: temp.volumeInfo.ratingsCount,
                    //         volumeInfo.maturityRating: temp.volumeInfo.maturityRating,
                    //         volumeInfo.allowAnonLogging: temp.volumeInfo.allowAnonLogging,
                    //         volumeInfo.contentVersion: temp.volumeInfo.contentVersion,
                    //         volumeInfo.imageLinks.smallThumbnail:temp.volumeInfo.imageLinks.smallThumbnail ,
                    //         volumeInfo.imageLinks.thumbnail:temp.volumeInfo.imageLinks.thumbnail  ,
                    //         volumeInfo.language: temp.volumeInfo.language,
                    //         volumeInfo.previewLink: temp.volumeInfo.previewLink,
                    //         volumeInfo.infoLink: temp.volumeInfo.infoLink,
                    //         volumeInfo.canonicalVolumeLink: temp.volumeInfo.canonicalVolumeLink,
                    //     saleInfo.country: temp.saleInfo.country,
                    //     saleInfo.saleability:temp.saleInfo.saleability,
                    //     saleInfo.isEbook: temp.saleInfo.isEbook,
                    //     accessInfo.country: temp.accessInfo.country,
                    //     accessInfo.viewability:temp.accessInfo.viewability ,
                    //     accessInfo.embeddable:temp.accessInfo.embeddable,
                    //     accessInfo.publicDomain: temp.accessInfo.publicDomain,
                    //     accessInfo.textToSpeechPermission: temp.accessInfo.textToSpeechPermission,
                    //     accessInfo.epub.isAvailable: temp.accessInfo.epub.isAvailable,
                    //     accessInfo.pdf.isAvailable: temp.accessInfo.pdf.isAvailable,
                    //     accessInfo.webReaderLink: temp.accessInfo.webReaderLink,
                    //     accessInfo.accessViewStatus: temp.accessInfo.accessViewStatus,
                    //     accessInfo.quoteSharingAllowed: temp.accessInfo.quoteSharingAllowed,
                    //     searchInfo.textSnippet: temp.searchInfo.textSnippet

                    //});
                     // })
                  // .catch(error => {
                  //  console.log(error);
                  //   });
            // async function createBook(){
            // const result= await newBook.save();
            // console.log(result);
        //}
        //createBook();
        res.send("All Done");

    });
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
