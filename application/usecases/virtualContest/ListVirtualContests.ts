import { IVirtualContestRepository } from "../../repositories/IVirtualContestRepository.ts";

export class ListVirtualContests {
    private virtualContestRepository: IVirtualContestRepository

    constructor(virtualContestRepository: IVirtualContestRepository) {
        this.virtualContestRepository = virtualContestRepository
    }

    execute(serverID: string, from: number, to: number) {
        if(!from) from = 0
        if(!to) to = 253402182000
        if(!serverID) return this.virtualContestRepository.findByTime(from,to)
        return this.virtualContestRepository.findByTimeAndServerID(serverID,from,to)
    }
}