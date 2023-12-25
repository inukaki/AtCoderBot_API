export class Problem {
    private _problemID: string
    private _contestID: string
    private _problemIndex: string
    private _name: string
    private _title: string
    private _difficulty: number

    constructor(problemID: string, contestID: string, problemIndex: string, name: string, title: string, difficulty: number) {
        this._problemID = problemID
        this._contestID = contestID
        this._problemIndex = problemIndex
        this._name = name
        this._title = title
        this._difficulty = difficulty
    }

    get problemID() {
        return this._problemID
    }
    
    get contestID() {
        return this._contestID
    }

    get problemIndex() {
        return this._problemIndex
    }

    get name() {
        return this._name
    }

    get title() {
        return this._title
    }

    get difficulty() {
        return this._difficulty
    }
}