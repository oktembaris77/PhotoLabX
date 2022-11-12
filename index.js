/*const socketIO = require('socket.io');
const io = socketIO(5500);

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı: ' + socket.id);
  });
});*/


const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const http = require("http").Server(app);
const io = require('socket.io')(http);

app.use(express.json());
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const inputPath = 'cat.jpg';
const formData = new FormData();
  /*
  ,{
  cors: {origin: "*"}
});
*/
//app.use(express.static(__dirname + '/../../build'));

formData.append('size', 'auto');
formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

axios({
  method: 'post',
  url: 'https://api.remove.bg/v1.0/removebg',
  data: formData,
  responseType: 'arraybuffer',
  headers: {
    ...formData.getHeaders(),
    'X-Api-Key': process.env.KEY,
  },
  encoding: null
})
.then((response) => {
  if(response.status != 200) return console.error('Error:', response.status, response.statusText);
  fs.writeFileSync("cat-no-bg.png", response.data);
})
.catch((error) => {
    return console.error('Request failed:', error);
});

router.get("/", function(req, res){
  res.sendFile(path.join(__dirname+'/app/index.html'));
});

app.get("/app.js", function(req, res){
  res.sendFile(path.join(__dirname+'/app/app.js'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message',`${socket.id} said ${message}`);

  });

});

app.use('/', router);
http.listen(process.env.PORT, () => console.log('listening on http://photolabx.herokuapp.com:' + process.env.PORT));