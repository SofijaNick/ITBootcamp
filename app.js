import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js"

// DOM
let forma1 = document.querySelector('#formMessage');
let forma2 = document.querySelector('#formUsername');
let msg = document.querySelector('#message');
let username = document.querySelector('#username');
let sekcija = document.querySelector('section ul');
let navigacija = document.querySelector('nav');
let divIspis = document.querySelector('#ispis');
let ul = document.querySelector('ul');
let dugmici = document.querySelectorAll('nav button');
let forma3 = document.querySelector('#formColor');
let color = document.querySelector('#color');
let body = document.querySelector('body');
let general = document.querySelector('#general')
let forma4 = document.querySelector('#formDate');
let pocetak = document.querySelector('#pocetak');
let kraj = document.querySelector('#kraj');
let setDates = document.querySelector('#setDates')



// Objekti klasa
let chatroom = new Chatroom("general", "Sofija");
let chatUI = new ChatUI (sekcija);

// Ispis na stranici
chatroom.getChats(data => {
    chatUI.templateLI(data);
})

let z = localStorage.korisnickoIme;
export {z};
if (z) {
    chatroom.username = z;
}else{
    chatroom.username = 'Anonymous'
}

// Sobe
let s = localStorage.soba;
if(s){
    chatroom.updateRoom(s)
    chatroom.getChats(d => {
    chatUI.templateLI(d)
    })
}else{
    chatroom.room = 'general';
    localStorage.setItem('soba', 'general');
    
}
if(s){
    let trenutnaSoba = document.getElementById(s);
    trenutnaSoba.style.color = 'white';
    trenutnaSoba.style.borderColor ='#f1ff5c';
}else{
    let trenutnaSoba = document.querySelector('#general')
    trenutnaSoba.style.color = 'white';
    trenutnaSoba.style.borderColor ='#f1ff5c';
}


// Submitovanje formi
function submitForm1(e){
    e.preventDefault();
    let poruka = msg.value;
    msg.value = '';
    if(poruka.trim() == ""){
        alert("Cant send an empty message")
    }else{
    chatroom.addChat(poruka)
    .then(() => {
        msg.value = '';
    })
    .catch(err => {
        console.log(`Greska ${err}`)
    })
}
}

// submit Form 2
function submitForm2(e){
    e.preventDefault();
    let newUsername = username.value;
    chatroom.username = newUsername;
    console.log('Apdejtovano ime')
    forma2.reset();
    localStorage.setItem('korisnickoIme', newUsername);
    
    //
    if(newUsername.length >= 2){
    divIspis.innerHTML = `Trenutni korisnik - ${newUsername}`;
    divIspis.hidden = false;
    setTimeout(() => {
        location.reload();
        divIspis.hidden = true;
    }, 2000)
}
}

// submit form 3
if(localStorage.boja){
    body.style.backgroundColor = localStorage.boja;
}else{
    body.style.backgroundColor = '#151b29';
}

function submitForm3(e){
    e.preventDefault();
    setTimeout(() => {
        body.style.backgroundColor = `${color.value}`
    }, 500)
    clearInterval();
    localStorage.setItem('boja', color.value)

}

// Submit form 4

setDates.addEventListener('click', e => {
    e.preventDefault();
    let inputPocetak = pocetak.value;
    let inputKraj = kraj.value;
    let pocetakDate = new Date(inputPocetak);
    pocetakDate = firebase.firestore.Timestamp.fromDate(pocetakDate);
    let krajDate = new Date(inputKraj);
    krajDate = firebase.firestore.Timestamp.fromDate(krajDate);

    chatUI.clear();

    chatroom.getChats(d => {
        let poslato = d.data().created_at;
        if(poslato.seconds > pocetakDate.seconds && poslato.seconds < krajDate.seconds){
            chatUI.templateLI(d);
        }
    })
})

// forme

forma1.addEventListener('submit', submitForm1);
forma2.addEventListener('submit', submitForm2);
forma3.addEventListener('submit', submitForm3);

// Menjanje soba
navigacija.addEventListener('click', (event) => {
    if(event.target.tagName == "BUTTON"){
    chatUI.clear();

    //2. Menjanje sobe
    chatroom.updateRoom(event.target.id);
    localStorage.setItem('soba', event.target.id)

    dugmici.forEach(d => {
        d.style.color = '#ffa260'
        d.style.borderColor = '#ffa260'
    })
    let dugme = document.getElementById(event.target.id)
    dugme.style.color = 'white';
    dugme.style.borderColor = '#f1ff5c';
    chatroom.getChats(d => {
        chatUI.templateLI(d)
    })
}
});

// Brisanje poruka

ul.addEventListener('click', (event) => {
    if(event.target.tagName == "I"){
        if(z == event.target.parentNode.firstChild.nextSibling.innerHTML.trim()){
            if(confirm("Do you want to delete this message?")){
                event.target.parentNode.remove()
                chatroom.deleteMsg(event.target.parentElement.id);
            }
        }else{
            event.target.parentNode.remove()
        }
    }
})


