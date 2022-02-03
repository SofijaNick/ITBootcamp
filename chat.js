export class Chatroom {
    constructor(r, u){
        this.room = r;
        this.username = u;
        this.chats = db.collection('Chats');
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
        this.chats
        .where('room', '==', this.room)
        .orderBy("created_at", 'asc')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                // Ispisati dokumente koji su dodati u bazu
                if(change.type == 'added'){
                    callback(change.doc.data());
                }
            })
        })
    }

    updateName(callback){
        
    }

}


