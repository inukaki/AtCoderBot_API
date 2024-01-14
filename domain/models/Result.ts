export class Result {
    private _atcoderID: string
    private _solved: string[]

    constructor(atcoderID: string, solved: string[]) {
        this._atcoderID = atcoderID
        this._solved = solved
    }

    get atcoderID() {
        return this._atcoderID
    }

    get solved() {
        return this._solved
    }
}