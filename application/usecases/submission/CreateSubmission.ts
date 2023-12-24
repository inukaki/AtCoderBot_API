import { Submission } from "../../../domain/models/Submission.ts" 
import { ISubmissionRepository } from "../../repositories/ISubmissionRepository.ts" 

export class CreateSubmission {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    }

    execute(id: number, epochSecond: number, problemID: string, contestID: string, atcoderID: string, language: string, point: number, length: number, result: string, executionTime: number) {
        let submission = new Submission(id, epochSecond, problemID, contestID, atcoderID, language, point, length, result, executionTime)
        return this.submissionRepository.persist(submission)
    } 
}