import { Problem } from "../../domain/models/Problem.ts";
import { Result } from "../../domain/models/Result.ts";
import { server } from "../../infrastructure/server.ts";

const _serializeSingleResult = async (result: Result) => {
    let problems: Problem[] = []
    
    for(const problemID of result.solved) {
        problems.push(await server.instance.problemConverter.getProblem(problemID))
    }

    return {
        atcoderID: result.atcoderID,
        solved: server.instance.problemSerializer.serialize(problems)
    }
}

export class ResultSerializer {
    async serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return await Promise.all(data.map(_serializeSingleResult))
        }
        return _serializeSingleResult(data)
    }
}