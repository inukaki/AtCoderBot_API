import { ContestResult } from "../../domain/models/ContestResult.ts"
import { server } from "../../infrastructure/server.ts"

const _serializeSingleResult = async (result: ContestResult) => {
    let solved = []

    for(const problemID of result.solved) {
        let problem = await server.instance.problemConverter.getProblem(problemID);
        solved.push(problem);
    }

    return {
        contestID: result.contestID,
        atcoderID: result.atcoderID,
        solved: server.instance.problemSerializer.serialize(solved)
    }
}

export class ContestResultSerializer {
    async serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return Promise.all(data.map(_serializeSingleResult))
        }
        return _serializeSingleResult(data)
    }
}