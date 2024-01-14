import { ContestResult } from "../../domain/models/ContestResult.ts";
import { getColor } from "../../domain/models/Difficulty.ts";
import { Result } from "../../domain/models/Result.ts";
import { Submission } from "../../domain/models/Submission.ts";
import { server } from "../../infrastructure/server.ts";

export class ResultConverter {
    async getUserResultByTime(atcoderID: string, from: number, to: number) {
        let submissions = await server.instance.submissionConverter.getUserSubmissionsByTime(atcoderID, from, to)

        let solved = new Set<string>()

        for(const submission of submissions) {
            if(submission.result != "AC") continue
            
            solved.add(submission.problemID)
        }

        return new Result(atcoderID, Array.from(solved))
    }

    async getUserResultByTimeAndServer(serverID: string, from: number, to: number) {
        let s = await server.instance.serverConverter.getServer(serverID)

        let result: Result[] = []

        for (const member of s.members) {
            let user = await server.instance.userConverter.getUser(member)

            let memberResult = await this.getUserResultByTime(user.atcoderID, from, to)
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

            st.add(submission)
        }

        let solved = []
        for(const submission of st) {
            solved.push(submission.problemID)
        }

        return new ContestResult(contestID,atcoderID,solved)
    }
}