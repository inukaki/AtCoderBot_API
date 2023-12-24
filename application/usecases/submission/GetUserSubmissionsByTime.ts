import { ISubmissionRepository } from "../../repositories/ISubmissionRepository";

export class GetUserSubmissionsByTime {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    }

    execute(atcoderID: string, from: number) {
        return this.submissionRepository.findByIdAndTime(atcoderID, from)
    }
}