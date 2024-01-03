import { Contest } from "../../domain/models/Contest.ts"
import { server } from "../../infrastructure/server.ts"

const _serializeSingleContest = async (contest: Contest) => {
    let problems = []

    for(const problemID of contest.problems) {
        let problem = await server.instance.problemConverter.getProblem(problemID);
        problems.push(problem);
    }

    return {
        contestID: contest.contestID,
        startAt: contest.startAt,
        durationSecond: contest.durationSecond,
        title: contest.title,
        problems: server.instance.problemSerializer.serialize(problems)
    }
}


export class ContestSerializer {
    async serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return await Promise.all(data.map(_serializeSingleContest))
        }
        return _serializeSingleContest(data)
    }
}