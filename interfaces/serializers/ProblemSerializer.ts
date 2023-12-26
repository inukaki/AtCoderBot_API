import { Problem } from "../../domain/models/Problem.ts"

const _serializeSingleProblem = (problem: Problem) => {
    return {
        id: problem.problemID,
        contest_id: problem.contestID,
        problem_index: problem.problemIndex,
        name: problem.name,
        title: problem.title,
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