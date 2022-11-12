/*const socketIO = require('socket.io');
const io = socketIO(5500);

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı: ' + socket.id);
  });
});*/


const http = require('http').createServer();

const io = require('socket.io')(http,{
  cors: {origin: "*"}
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message',`${socket.id} said ${message}`);

  });

});

http.listen(process.env.PORT, () => console.log('listening on http://photolabx.herokuapp.com:' + process.env.PORT));