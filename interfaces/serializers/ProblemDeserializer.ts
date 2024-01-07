import { Problem } from "../../domain/models/Problem.ts"

const _deserializeSingleProblem = (problem: any) => {
    return new Problem(problem.id, problem.contest_id, problem.problem_index, problem.name, problem.title, problem.difficulty)
}

export class ProblemDeserializer {
    
    /**
     * JSONからProblemに変換
     * @param data JSONもしくはJSONの配列
     * @returns ProblemもしくはProblem[]
     */
    deserialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_deserializeSingleProblem)
        }
        return _deserializeSingleProblem(data)
    }
}