/*const socket = WebSocket('ws://localhost:8080');

// Listen for messages
socket.onmessage = ({ data }) => {
    console.log("Message from server ", data);
};

document.querySelector('button').onclick = () =>{
    socket.send('hello');
};  
*/

//ws://photolabx.herokuapp.com:' + process.env.PORT
const socket = io('/');

socket.on('message', text => {
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el);
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', text);
}