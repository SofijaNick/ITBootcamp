import { z } from "./app.js";
export class ChatUI {
    constructor(lp){
        this.listaPoruka = lp;
    }

    set listaPoruka(lp){
        this._listaPoruka = lp;
    }

    get listaPoruka(){
        return this._listaPoruka;
    }

    formatDate(doc) {
        // let time = new Date(doc.created_at.seconds * 1000);
        let datum = new Date();
        let time = doc.created_at.toDate();
        let day = time.getDate();
        let month = time.getMonth() + 1;
        let year = time.getFullYear();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        if(minutes < 10){
            minutes = `0${minutes}`;
        }

        let date = `${day}.${month}.${year}. - ${hours}:${minutes}`;
        let danas = `${hours}:${minutes}`;
        if(datum.getDate() == time.getDate()){
            return danas;
        }else{
            return date;
        }
    }


    templateLI(doc) {
        let id = doc.id;
        let data = doc.data();
        // izvuci podatke iz prosljednjenog dokumenta i zapisati ih u formatu 
        // username: poruka
        // time_stamp
        let date = this.formatDate(data);

        if(z == data.username){
            let htmlLi =
            `<li id="${id}" class='desno'>
                <span>${data.username}</span>: ${data.message}
                <br>
                ${date}
                <i class="fas fa-trash trash"></i>
            </li>`;
        this.listaPoruka.innerHTML += htmlLi;
        }else{
            let htmlLi =
            `<li id="${id}" class='levo'>
                <span>${data.username}</span>: ${data.message}
                <br>
                ${date}
                <i class="fas fa-trash trash"></i>
            </li>`;
        this.listaPoruka.innerHTML += htmlLi;
        }
       
    }

    clear(){
        this.listaPoruka.innerHTML = "";
    }
    
}