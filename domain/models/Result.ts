import { Color } from "./Difficulty.ts"

export class Result {
    private _atcoderID: string
    private _solved: Map<Color, number>

    constructor(atcoderID: string, solved: Map<Color, number>) {
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