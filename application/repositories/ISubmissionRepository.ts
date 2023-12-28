import { Submission } from "../../domain/models/Submission.ts";

export abstract class ISubmissionRepository {
    abstract findAll(): Promise<Array<Submission>>
    abstract findById(atcoderID: string): Promise<Array<Submission>>
    abstract findByIdAndTime(atcoderID: string, from: number): Promise<Array<Submission>>
    abstract findLatest(): Promise<Submission>
    abstract persist(submission: Submission): Promise<Submission>
    abstract persistAll(submissions: Submission[]): Promise<Submission[]>
    abstract delete(submission: Submission): Promise<Submission>
}