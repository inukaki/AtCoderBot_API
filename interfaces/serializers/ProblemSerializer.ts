import { Problem } from "../../domain/models/Problem.ts"

const _serializeSingleProblem = (problem: Problem) => {
    return {
        problemID: problem.problemID,
        problemIndex: problem.problemIndex,
        contestID: problem.contestID,
        name: problem.name,
        point: problem.point,
        difficulty: problem.difficulty
    }
}

export class ProblemSerializer {
    serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleProblem)
        }
        return _serializeSingleProblem(data)
    }
}