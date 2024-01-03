import { IContestRepository } from "../../repositories/IContestRepository.ts";

export class GetContestByTime{
    private contestRepository: IContestRepository

    constructor(contestRepository: IContestRepository) {
        this.contestRepository = contestRepository
    }

    execute(from: number, to: number) {
        if(!from) from = 0
        if(!to) to = Date.now()
        return this.contestRepository.findByTime(from,to)
    }
}