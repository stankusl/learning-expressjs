import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data.json';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.get('/redirect', (req, res) => {
    res.redirect('https://codedemon.co.uk');
});

app.get('/download', (req, res) => {
    res.download('./public/image.jpg');
});

app.use(express.urlencoded({extended: true}));

app.post('/addItemFromForm', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.use(express.json());

app.post('/addItem', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.get('/', (req, res) => {
    res.json(data);
});

// Doesn't work!
app.get('/customError', (res, err, next) => {
    setTimeout(function () {
        try {
          throw new Error("BROKEN");
        }
        catch (err) {
          next(err);
        }
      }, 100);
});


app.get('/error', (req, res) => {
    throw new Error();
});


app.get('/:id', (req, res) => {
    let user = Number(req.params.id);
    res.json(data[user]);
});


app.put('/updateItem', (req, res) => {
    res.send(data);
});

app.delete('/delete/{id}', (req, res) => {
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`port is running ${PORT}`);
});
