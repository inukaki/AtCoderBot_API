export class Standing {
    private _atcoderID
    private _time
    private _point
    private _problems

    constructor(atcoderID: string, time: number, point: number, problems: any[]) {
        this._atcoderID = atcoderID
        this._time = time
        this._point = point
        this._problems = problems
    }

    get atcoderID() {
        return this._atcoderID
    }

    get time() {
        return this._time
    }

    get point() {
        return this._point
    }

    get problems() {
        return this._problems
    }
}