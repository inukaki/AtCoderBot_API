import { Result } from "../../domain/models/Result.ts";

const _serializeSingleResult = (result: Result) => {
    let solved: any = {}

    for(const [color, count] of result.solved) {
        solved[color] = count
    }

    return {
        atcoderID: result.atcoderID,
        solved: solved
    }
}

export class ResultSerializer {
    serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleResult)
        }
        return _serializeSingleResult(data)
    }
}