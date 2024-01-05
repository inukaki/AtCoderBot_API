import { ISubmissionRepository } from "../../repositories/ISubmissionRepository";

export class GetUserSubmissionsByTime {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    }

    execute(atcoderID: string, from: number, to: number) {
        if(!from) from = 0
        if(!to) to = 253402182000
        return this.submissionRepository.findByIdAndTime(atcoderID, from, to)
    }
}