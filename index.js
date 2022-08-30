/*
adsfasdf
*/
const express = require('express');
const multer = require('multer');
const cors = require("cors");

const app = express();
const PORT = 4000;

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

var storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'pub/imgs/'),
  filename: (req, file, cb) => cb(null, Date.now()+file.originalname)
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  }else {
    cb(null, false);
  }
}

let upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

app.get('/', (req, res) => {
  res.send('this node test');
})

app.get('/test', (req, res) => {
  res.send('this node test test');
})

app.post('/fileUpload', upload.single('myImg'), async (req, res, next) => {
  if(req.file) {
    res.send(req.file)
    // res.send(req.file.path);
  }else {
    res.send('file invalid');
  }
})

app.listen(PORT, () => {
  console.log('listening...');
})