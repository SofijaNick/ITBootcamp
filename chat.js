export class Chatroom {
    constructor(r, u){
        this.room = r;
        this.username = u;
        this.chats = db.collection('Chats');
        this.unsub = false; // Odredili smo da false bude kao signal da je stranica 1. put ucitana
    }

    set room(r){
        this._room = r;
    }

    get room(){
        return this._room;
    }

    set username(u){
        if (u.length <2 || u.length > 10 || u.trim() == ""){
            alert("Niste odabrali odgovarajuci username")
        }else{
            this._username = u;
        }
    }

    get username(){
        return this._username;
    }

    // Update room
    updateRoom(ur){
        this.room = ur;
        if(this.unsub != false){ // unsub vise nije false nego je u getChats postalo funkcija
            this.unsub(); // unsub je sada funkcija i pozivam je sa zagradama
        }
    }

    deleteMsg(id){
        this.chats
        .doc(id)
        .delete()
        .then()
        .catch(e => {
            console.log("Greska")
        })
    }

    async addChat(poruka){
        let date = new Date();

        let docChat = {
            message: poruka,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        }
        let response = await this.chats.add(docChat);
        return response; // vraca promise 

    }

    //Metod koji prati promene u bazi i vraca poruke
    getChats(callback) {
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy("created_at", 'asc')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                // Ispisati dokumente koji su dodati u bazu
                if(change.type == 'added'){
                    callback(change.doc);
                }
            })
        })
    }
}