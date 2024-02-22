import { IVirtualContestRepository } from "../repositories/IVirtualContestRepository.ts"
import { CreateVirtualContest } from "../usecases/virtualContest/CreateVirtualContest.ts"
import { GetVirtualContest } from "../usecases/virtualContest/GetVirtualContest.ts"
import { ListVirtualContests } from "../usecases/virtualContest/ListVirtualContests.ts"
import { UpdateVirtualContest } from "../usecases/virtualContest/UpdateVirtualContest.ts"

export class VirtualContestConverter {
    private virtualContestRepository: IVirtualContestRepository

    constructor(virtualContestRepository: IVirtualContestRepository) {
        this.virtualContestRepository = virtualContestRepository
    }

    async createVirtualContest(startAt: number, durationSecond: number, title: string, visible: string, serverID: string, members: string[], problems: string[]) {
        let useCase = new CreateVirtualContest(this.virtualContestRepository)
        let result = await useCase.execute(startAt,durationSecond,title,visible,serverID,members,problems)
        return result
    }

    async listVirtualContests(serverID: string, from: number, to: number) {
        let useCase = new ListVirtualContests(this.virtualContestRepository)
        let result = await useCase.execute(serverID,from,to)
        return result
    }

    async getVirtualContest(virtualContestID: number) {
        let useCase = new GetVirtualContest(this.virtualContestRepository)
        let result = await useCase.execute(virtualContestID)
        return result
    }

    async updateVirtualContest(virtualContestID: number, startAt: number, durationSecond: number, title: string, visible: string, serverID: string, members: string[], problems: string[]) {
        let useCase = new UpdateVirtualContest(this.virtualContestRepository)
        let result = await useCase.execute(virtualContestID, startAt,durationSecond,title,visible,serverID,members,problems)
        return result
    }
}