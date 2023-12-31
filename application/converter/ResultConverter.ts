import { Color, getColor } from "../../domain/models/Difficulty.ts";
import { Result } from "../../domain/models/Result.ts";
import { difficulty } from "../../infrastructure/api/ProblemAPI.ts";
import { server } from "../../infrastructure/server.ts";

export class ResultConverter {
    async getUserResultByTime(atcoderID: string, from: number) {
        let submissions = await server.instance.submissionConverter.getUserSubmissionsByTime(atcoderID, from)

        let count = new Map<Color, number>()

        for(const submission of submissions) {
            let diff = difficulty.get(submission.problemID)
            if(!diff) diff = 0

            let color = getColor(diff)

            let current = count.get(color)
            if(!current) current = 0

            count.set(color, current+1)
        }

        return new Result(atcoderID, count)
    }

    async getUserResultByTimeAndServer(serverID: string, from: number) {
        let s = await server.instance.serverConverter.getServer(serverID)

        let result: Result[] = []

        for (const member of s.members) {
            let memberResult = await this.getUserResultByTime(member, from)
            result.push(memberResult)
        }

        return result
    }
}