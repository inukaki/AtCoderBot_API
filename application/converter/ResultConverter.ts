import { ContestResult } from "../../domain/models/ContestResult.ts";
import { getColor } from "../../domain/models/Difficulty.ts";
import { Result } from "../../domain/models/Result.ts";
import { Submission } from "../../domain/models/Submission.ts";
import { server } from "../../infrastructure/server.ts";

export class ResultConverter {
    async getUserResultByTime(atcoderID: string, from: number, to: number) {
        let submissions = await server.instance.submissionConverter.getUserSubmissionsByTime(atcoderID, from, to)

        let count = new Map<string, number>()

        for(const submission of submissions) {
            if(submission.result != "AC") continue
            let diff = (await server.instance.problemConverter.getProblem(submission.problemID)).difficulty
            if(!diff) diff = 0

            let color = getColor(diff)

            let current = count.get(color)
            if(!current) current = 0

            count.set(color, current+1)
        }

        return new Result(atcoderID, count)
    }

    async getUserResultByTimeAndServer(serverID: string, from: number, to: number) {
        let s = await server.instance.serverConverter.getServer(serverID)

        let result: Result[] = []

        for (const member of s.members) {
            let memberResult = await this.getUserResultByTime(member, from, to)
            result.push(memberResult)
        }

        return result
    }

    async getUserContestResult(contestID: string, atcoderID: string) {
        let contest = await server.instance.contestConverter.getContest(contestID)

        let submissions = await server.instance.submissionConverter.getUserSubmissionsByTime(atcoderID, contest.startAt, contest.startAt + contest.durationSecond)
        let st = new Set<Submission>()

        for(const submission of submissions) {
            if(submission.contestID != contestID) continue
            if(submission.result != "AC") continue
            if(submission.contestID != contestID) continue

            st.add(submission)
        }

        let solved = []
        for(const submission of st) {
            solved.push(submission.problemID)
        }

        return new ContestResult(contestID,atcoderID,solved)
    }
}