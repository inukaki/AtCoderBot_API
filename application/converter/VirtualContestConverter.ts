import { IContestRepository } from "../repositories/IContestRepository.ts";

export class VirtualContestConverter {
    private contestRepository: IContestRepository

    constructor(contestRepository: IContestRepository) {
        this.contestRepository = contestRepository
    }
}