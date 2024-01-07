
export class User {
    private _discordID: string
    private _atcoderID: string
    private _rating: number
    private _solved: string[]
    
    get discordID(): string {
        return this._discordID
    }

    set discordID(id: string) {
        this._discordID = id
    }

    get atcoderID(): string {
        return this._atcoderID
    }

    set atcoderID(id: string) {
        this._atcoderID = id
    }

    get rating() {
        return this._rating
    }

    set rating(rating: number) {
        this._rating = rating
    }

    get solved() {
        return this._solved
    }

    addSolved(problemID: string) {
        this._solved.push(problemID)
    }

    constructor(discordID: string, atcoderID: string, rating: number, solved: string[]) {
        this._discordID = discordID
        this._atcoderID = atcoderID
        this._rating = rating
        this._solved = solved
    }
}