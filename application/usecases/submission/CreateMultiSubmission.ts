import { Submission } from "../../../domain/models/Submission.ts" 
import { ISubmissionRepository } from "../../repositories/ISubmissionRepository.ts" 

export class CreateMultiSubmission {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    }

    execute(submissions: any[]) {
        return this.submissionRepository.persistAll(submissions.map((x) => {
            return new Submission(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9])
        }))
    } 
}