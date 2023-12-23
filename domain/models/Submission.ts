import { Result } from './Result';

export class Submission {
    private _id: number
    private _epochSecond: number
    private _problemID: string
    private _contestID: string
    private _atcoderID: string
    private _language: string
    private _point: number
    private _length: number
    private _result: Result
    private _executionTime: number

    constructor(id: number, epochSecond: number, problemID: string, contestID: string, atcoderID: string, language: string, point: number, length: number, result: Result, executionTime: number) {
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
}