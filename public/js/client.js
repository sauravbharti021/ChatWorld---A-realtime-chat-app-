
const socket= io();

var audio= new Audio("../pop_up.mp3");
const form= document.getElementById("send_container");

const messageInput= document.getElementById("messageInput");
const msgContainer= document.querySelector('.container');



form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`<b>You</b> : ${message}`, "right");

    socket.emit('send', message );
    messageInput.value="";
} )

const user_name = prompt("Enter your name to join");
socket.emit('new-user-joined', user_name); 

const append= (message, position)=>{
    const messageEle= document.createElement("div");
    
    messageEle.innerHTML= message;
    messageEle.classList.add("message");
    messageEle.classList.add(position);
    msgContainer.append(messageEle);
 
    if(position=="left")  audio.play();
    msgContainer.scrollTop=msgContainer.scrollHeight;
    

}



socket.on("user-joined", name =>{
    append(`<b> ${name} </b> joined the chat`, "left");
})

socket.on("receive", data =>{
    append(`<b>${data.name}</b> : ${data.message}`, "left");
})

socket.on('left', name=>{
    append(`<b>${name}</b> left the chat`, 'left');
})