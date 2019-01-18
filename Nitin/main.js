const mongoose =require('mongoose');
var alias = '/nd';
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

mongoose.connect('mongodb://localhost/LibraryDB')
    .then(()=> console.log('connected'))
    .catch(err=>console.error('err'))

    app.get(alias+'/pushNotification',function(req,res){
        var temp={
            "title":"Library Notice","body":"There is an seminar organised by central library in february!","Image":"https://unsplash.com/photos/ew3-7k3sl-g","Id":"ND12345678",
            "time":"Date.now()"
        }
        res.send(temp);

    });

    var title,body,imageLink,Id;
    app.get(alias+'/postNotifications',function(req,res){
        title=req.title;
        body=req.body;
        imageLink=req.imageLink;
        Id=req.Id;
    });


    app.get(alias+'/delNotification',function(req,res){
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
