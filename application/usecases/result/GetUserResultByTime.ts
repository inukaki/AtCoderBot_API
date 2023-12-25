import { ISubmissionRepository } from "../../repositories/ISubmissionRepository.ts"

export class GetUserResultByTime {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    }

    execute(atcoderID: string, from: number) {
        const data = this.submissionRepository.findByIdAndTime(atcoderID, from)
        
    } 
}