import { VirtualContest } from "../../domain/models/VirtualContest.ts";

export abstract class IVirtualContestRepository {
    abstract findAll(): Promise<Array<VirtualContest>>
    abstract findByID(id: number): Promise<VirtualContest>
    abstract findByTime(from: number, to: number): Promise<VirtualContest[]>
    abstract findByTimeAndServerID(serverID: string, from: number, to: number): Promise<VirtualContest[]>
    abstract persist(contest: VirtualContest): Promise<VirtualContest>
    abstract merge(contest: VirtualContest): Promise<VirtualContest>
    abstract persistAll(contests: VirtualContest[]): Promise<VirtualContest[]>
    abstract delete(id: number): Promise<void>
}