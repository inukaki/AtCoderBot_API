import { Problem } from "./Problem.ts"

export class Daily {
    private _problems

    constructor() {
        this._problems = new Map<string, Problem | undefined>
    }

    get problems() {
        return this._problems
    }

    setProblem(color: string, problem: Problem | undefined) {
        this._problems.set(color, problem)
    }
}