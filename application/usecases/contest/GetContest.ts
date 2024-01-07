import { IContestRepository } from "../../repositories/IContestRepository.ts";

export class GetContest{
    private contestRepository: IContestRepository

    constructor(contestRepository: IContestRepository) {
        this.contestRepository = contestRepository
    }

    execute(contestID: string) {
        return this.contestRepository.findByID(contestID)
    }
}