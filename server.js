var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();
app.use(express.static('public'));
app.use(express.static('data'));
app.use(formidable());

app.get('/get-posts', function (req, res) {
    res.sendFile(__dirname + '/data/posts.json');
});

app.post('/create-post', function (req, res) {

    var blogpost = req.fields.blogpost;
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {

        var parsedFile = JSON.parse(file);
        parsedFile[Date.now()] = blogpost;
        var stringifiedFile = JSON.stringify(parsedFile, null, 4);

        fs.writeFile(__dirname + '/data/posts.json', stringifiedFile, function (error) {
            if (error) {
                console.error(error);
            }
            res.send({ blogpost: blogpost });
        });
    });
});

app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});
