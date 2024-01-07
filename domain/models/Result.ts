export class Result {
    private _atcoderID: string
    private _solved: Map<string, number>

    constructor(atcoderID: string, solved: Map<string, number>) {
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