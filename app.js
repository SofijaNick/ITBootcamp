import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js"

// DOM

let forma1 = document.querySelector('#formMessage');
let forma2 = document.querySelector('#formUsername');
let msg = document.querySelector('#message');
let username = document.querySelector('#username');
let sekcija = document.querySelector('section ul');

// Objekti klasa

let chatroom = new Chatroom("general", "Sofija");
let chatUI = new ChatUI (sekcija);

// Ispis dokumenata u konzoli

chatroom.getChats(d => {
    console.log(d)
})

// Ispis na stranici

chatroom.getChats(d => {
    chatUI.templateLI(d);
})

// Submitovanje formi

function submitForm1(e){
    e.preventDefault();
    let poruka = msg.value;
    chatroom.addChat(poruka)
    .then(() => {
        msg.value = '';
        console.log(poruka)
    })
    .catch(err => {
        console.log(`Greska ${err}`)
    })
}

function submitForm2(e){
    e.preventDefault();
    let newUsername = username.value;
    chatroom.username = newUsername;
    console.log('Apdejtovano ime')
    forma2.reset();
}

forma1.addEventListener('submit', submitForm1);
forma2.addEventListener('submit', submitForm2);

