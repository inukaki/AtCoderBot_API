import { Problem } from "./Problem.ts"

export class ContestResult {
    private _contestID: string
    private _atcoderID: string
    private _solved: string[]


    constructor(contestID: string, atcoderID: string, solved: string[]) {
        this._contestID = contestID
        this._atcoderID = atcoderID
        this._solved = solved
    }

    get atcoderID() {
        return this._atcoderID
    }

    get contestID() {
        return this._contestID
    }

    get solved() {
        return this._solved
    }
}