import { VirtualContest } from "../../domain/models/VirtualContest.ts";

export abstract class IVirtualContestRepository {
    abstract findAll(): Promise<Array<VirtualContest>>
    abstract findByID(id: string): Promise<VirtualContest>
    abstract findByTime(from: number, to: number): Promise<VirtualContest[]>
    abstract persist(contest: VirtualContest): Promise<VirtualContest>
    abstract persistAll(contests: VirtualContest[]): Promise<VirtualContest[]>
    abstract delete(id: string): Promise<void>
}