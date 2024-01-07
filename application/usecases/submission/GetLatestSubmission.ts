import { ISubmissionRepository } from "../../repositories/ISubmissionRepository.ts";

export class GetLatestSubmission {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    }

    execute() {
        return this.submissionRepository.findLatest()
    }
}