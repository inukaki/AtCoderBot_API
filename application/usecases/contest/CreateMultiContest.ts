import { Contest } from "../../../domain/models/Contest.ts";
import { IContestRepository } from "../../repositories/IContestRepository.ts";

export class CreateMultiContest {
    private contestRepository: IContestRepository

    constructor(contestRepository: IContestRepository) {
        this.contestRepository = contestRepository
    }

    execute(contests: any[]) {
        return this.contestRepository.persistAll(contests.map((x) => {
            return new Contest(x[0], x[1], x[2], x[3], x[4])
        }))
    } 
}