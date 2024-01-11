import { VirtualContest } from "../../domain/models/VirtualContest.ts";
import { server } from "../../infrastructure/server.ts"

const _serializeSingleVirtualContest = async (virtualContest: VirtualContest) => {
    let problems = []

    for(const problemID of virtualContest.problems) {
        let problem = await server.instance.problemConverter.getProblem(problemID);
        problems.push(problem);
    }

    return {
        virtualContestID: virtualContest.virtualContestID,
        startAt: virtualContest.startAt,
        durationSecond: virtualContest.durationSecond,
        title: virtualContest.title,
        visible: virtualContest.visible,
        serverID: virtualContest.serverID,
        members: virtualContest.members,
        problems: server.instance.problemSerializer.serialize(problems)
    }
}


export class VirtualContestSerializer {
    async serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return await Promise.all(data.map(_serializeSingleVirtualContest))
        }
        return _serializeSingleVirtualContest(data)
    }
}