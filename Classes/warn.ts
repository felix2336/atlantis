export default class Warn {
    userid: string
    reason: string
    id: string


    constructor(userid: string, reason: string) {
        this.userid = userid;
        this.reason = reason;
        this.id = this.generateId()
    }

    // public assignData(data: Warn){
    //     this.userid = data.userid
    //     this.reason = data.reason
    //     return this
    // }

    private generateId(){
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
        let id: string = "";

        for (let index = 0; index < 5; index++) {
            const randIndex = Math.floor(Math.random() * charset.length)
            id += charset.charAt(randIndex)
        }

        return id;
    }
}