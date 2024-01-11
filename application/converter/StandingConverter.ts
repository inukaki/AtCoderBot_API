import { Problem } from "../../domain/models/Problem.ts";
import { Standing } from "../../domain/models/Standing.ts";
import { server } from "../../infrastructure/server.ts";

export class StandingConverter {

    async getVirtualContestStandings(virtualContestID: number) {
        let virtualContest = await server.instance.virtualContestConverter.getVirtualContest(virtualContestID)
        let result: Standing[] = []
        
        let index = new Map<string, number>()
        let problemMap = new Map<string, Problem>()

        for(let idx = 0; idx < virtualContest.problems.length; idx++) {
            let problemID = virtualContest.problems[idx]

            index.set(problemID, idx)
            problemMap.set(problemID, await server.instance.problemConverter.getProblem(problemID))
        }

        for(const atcoderID of virtualContest.members) {
            let submissions = await server.instance.submissionConverter.getUserSubmissionsByTime(atcoderID, virtualContest.startAt, virtualContest.startAt + virtualContest.durationSecond)

            let time = 0
            let point = 0
            let problems: any[] = []

            virtualContest.problems.forEach((problem, idx) => {
                problems.push({
                    problemIndex: String.fromCharCode('A'.charCodeAt(0) + idx),
                    accepted: false,
                    penalty: 0,
                    time: 0,
                    timePenalty: 0,
                    point: problemMap.get(problem)?.point
                })
            })

            for(const submission of submissions) {
                if(!index.has(submission.problemID)) continue
                let idx = index.get(submission.problemID)!!
                if(problems[idx].accepted) continue
                if(submission.result == "AC") {
                    problems[idx].accepted = true
                    problems[idx].time = submission.epochSecond
                    problems[idx].timePenalty += submission.epochSecond

                    time = Math.max(time, problems[idx].timePenalty)
                    point += problems[idx].point
                }else{
                    problems[idx].penalty++
                    problems[idx].timePenalty += 5 * 60
                }
            }
            result.push(new Standing(atcoderID, time, point, problems))
        }

        result.sort((a, b) => {
            if (a.point !== b.point) {
                return b.point - a.point; 
            } else {
                return a.time - b.time; 
            }
        });

        return result
    }

}