import { Standing } from "../../domain/models/Standing.ts"

const _serializeSingleStanding = (standing: Standing) => {
    return {
        atcoderID: standing.atcoderID,
        time: standing.time,
        point: standing.point,
        problems: standing.problems
    }
}

export class StandingSerializer {
    serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleStanding)
        }
        return _serializeSingleStanding(data)
    }
}