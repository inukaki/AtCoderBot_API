import { VirtualContest } from "../../../domain/models/VirtualContest.ts";
import { IVirtualContestRepository } from "../../repositories/IVirtualContestRepository.ts";

export class CreateVirtualContest {
    private virtualContestRepository: IVirtualContestRepository

    constructor(virtualContestRepository: IVirtualContestRepository) {
        this.virtualContestRepository = virtualContestRepository
    }

    execute(startAt: number, durationSecond: number, title: string, visible: string, serverID: string, members: string[], problems: string[]) {
        return this.virtualContestRepository.persist(new VirtualContest(0, startAt, durationSecond, title, visible, serverID, members, problems))
    }
}