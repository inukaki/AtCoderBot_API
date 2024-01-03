import { Contest } from "../../domain/models/Contest.ts";

export abstract class IContestRepository {
    abstract findAll(): Promise<Array<Contest>>
    abstract findByID(contestID: string): Promise<Contest>
    abstract findByTime(from: number, to: number): Promise<Contest[]>
    abstract persist(contest: Contest): Promise<Contest>
    abstract persistAll(contests: Contest[]): Promise<Contest[]>
    abstract delete(contestID: string): Promise<void>
}