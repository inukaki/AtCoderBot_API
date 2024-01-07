import { Daily } from "../../domain/models/Daily.ts";
import { server } from "../../infrastructure/server.ts";

const _serializeSingleDaily = (daily: Daily) => {
    let result: any = {}

    daily.problems.forEach((problem, color) => {
        result[color] = server.instance.problemSerializer.serialize(problem)
    })

    return result
}

export class DailySerializer {
    async serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return await Promise.all(data.map(_serializeSingleDaily))
        }
        return _serializeSingleDaily(data)
    }
}