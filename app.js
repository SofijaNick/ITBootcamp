import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js"

let chatroom1 = new Chatroom("js", "Sofija")

console.log(chatroom1.room);
console.log(chatroom1.username);
console.log(chatroom1.chats);


let chatroom2 = new Chatroom("general", "Milena");
chatroom2.addChat("HR trening")
.then(() => console.log("Trening pisanja CV-ja"))
.catch(err => {
    console.log(`Greska: ${err}`)
})

chatroom2.getChats(d => {
    console.log(d)
})

chatroom2.username = 'Zika'

console.log(chatroom2._room)
console.log(chatroom2.username)

let sekcija = document.querySelector('section ul')

let chatUI1 = new ChatUI (sekcija)
console.log(chatUI1.listaPoruka)

// Ispis na stranici

chatroom2.getChats(d => {
    chatUI1.templateLI(d);
})

let forma1 = document.querySelector('#formMessage');
let msg = document.querySelector('#message')

function submitForm1(e){
    e.preventDefault();
    let poruka = msg.value;
    chatroom2.addChat(poruka)
    .then(() => {
        msg.value = '';
        console.log(poruka)
    })
    .catch(err => {
        console.log(`Greska ${err}`)
    })
}

forma1.addEventListener('submit', submitForm1);


