export class Contest {
    private _contestID
    private _startAt
    private _durationSecond
    private _title
    private _problems

    constructor(contestID: string, startAt: number, durationSecond: number, title: string, problems: string[]) {
        this._contestID = contestID
        this._startAt = startAt
        this._durationSecond = durationSecond
        this._title = title
        this._problems = problems
    }

    get contestID() {
        return this._contestID
    }

    get startAt() {
        return this._startAt
    }

    get durationSecond() {
        return this._durationSecond
    }

    get title() {
        return this._title
    }

    get problems() {
        return this._problems
    }
}