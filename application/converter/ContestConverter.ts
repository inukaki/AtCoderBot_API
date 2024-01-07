import { IContestRepository } from "../repositories/IContestRepository.ts";
import { CreateMultiContest } from "../usecases/contest/CreateMultiContest.ts";
import { GetContest } from "../usecases/contest/GetContest.ts";
import { GetContestByTime } from "../usecases/contest/GetContestByTime.ts";

export class ContestConverter {
    private contestRepository: IContestRepository

    constructor(contestRepository: IContestRepository) {
        this.contestRepository = contestRepository
    }

    async getContestByTime(from: number, to: number) {
        let useCase = new GetContestByTime(this.contestRepository)
        let result = await useCase.execute(from,to)

        return result
    }

    async createMultiContest(args: any[]) {
        let useCase = new CreateMultiContest(this.contestRepository)
        let result = await useCase.execute(args)

        return result
    }

    async getContest(contestID: string) {
        let useCase = new GetContest(this.contestRepository)
        let result = await useCase.execute(contestID)

        return result
    }
}