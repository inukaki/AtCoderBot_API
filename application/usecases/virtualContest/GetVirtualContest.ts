import { VirtualContest } from "../../../domain/models/VirtualContest.ts";
import { IVirtualContestRepository } from "../../repositories/IVirtualContestRepository.ts";

export class GetVirtualContest {
    private virtualContestRepository: IVirtualContestRepository

    constructor(virtualContestRepository: IVirtualContestRepository) {
        this.virtualContestRepository = virtualContestRepository
    }

    execute(virtualContestID: number) {
        return this.virtualContestRepository.findByID(virtualContestID)
    }
}