export class Submission {
    private _id: number
    private _epochSecond: number
    private _problemID: string
    private _contestID: string
    private _atcoderID: string
    private _language: string
    private _point: number
    private _length: number
    private _result: string
    private _executionTime: number

    constructor(id: number, epochSecond: number, problemID: string, contestID: string, atcoderID: string, language: string, point: number, length: number, result: string, executionTime: number) {
        this._id = id;
        this._epochSecond = epochSecond;
        this._problemID = problemID;
        this._contestID = contestID;
        this._atcoderID = atcoderID;
        this._language = language;
        this._point = point;
        this._length = length;
        this._result = result;
        this._executionTime = executionTime;
    }

    get id(): number {
        return this._id
    }

    get epochSecond(): number {
        return this._epochSecond
    }

    get problemID(): string {
        return this._problemID
    }

    get contestID(): string {
        return this._contestID
    }

    get atcoderID(): string {
        return this._atcoderID
    }

    get language(): string {
        return this._language
    }

    get point(): number {
        return this._point
    }

    get length(): number {
        return this._length
    }

    get result(): string {
        return this._result
    }

    get executionTime(): number {
        return this._executionTime
    }
}