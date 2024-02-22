import { VirtualContest } from "../../../domain/models/VirtualContest.ts";
import { IVirtualContestRepository } from "../../repositories/IVirtualContestRepository.ts";

export class UpdateVirtualContest {
    private virtualContestRepository: IVirtualContestRepository

    constructor(virtualContestRepository: IVirtualContestRepository) {
        this.virtualContestRepository = virtualContestRepository
    }

    execute(virtualContestID: number, startAt: number, durationSecond: number, title: string, visible: string, serverID: string, members: string[], problems: string[]) {
        return this.virtualContestRepository.merge(new VirtualContest(virtualContestID, startAt, durationSecond, title, visible, serverID, members, problems))
    }
}