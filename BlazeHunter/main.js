var alias = '/bh';
module.exports = function(app){

    app.get(alias + '/test', function(req, res){
        res.send('test');
    });
}
