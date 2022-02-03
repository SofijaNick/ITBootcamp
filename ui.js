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

        let date = `${day}.${month}.${year}. - ${hours}:${minutes}`;
        let danas = `${hours}:${minutes}`;
        if(datum.getDate() == time.getDate()){
            return danas;
        }else{
            return date;
        }
    }

    templateLI(doc) {
        // izvuci podatke iz prosljednjenog dokumenta i zapisati ih u formatu 
        // username: poruka
        // time_stamp
        let date = this.formatDate(doc);

        let htmlLi =
            `<li>
                ${doc.username}: ${doc.message}
                <br>
                ${date}
            </li>`;
        this.listaPoruka.innerHTML += htmlLi;
    }
    
}