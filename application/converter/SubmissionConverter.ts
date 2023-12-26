import { ISubmissionRepository } from "../repositories/ISubmissionRepository.ts";
import { CreateMultiSubmission } from "../usecases/submission/CreateMultiSubmission.ts";
import { CreateSubmission } from "../usecases/submission/CreateSubmission.ts";
import { GetUserSubmissionsByTime } from "../usecases/submission/GetUserSubmissionsByTime.ts";

export class SubmissionConverter {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    } 

    async createSubmission(id: number, epochSecond: number, problemID: string, contestID: string, atcoderID: string, language: string, point: number, length: number, result: string, executionTime: number) {
        let useCase = new CreateSubmission(this.submissionRepository)
        let res = await useCase.execute(id, epochSecond, problemID, contestID, atcoderID, language, point, length, result, executionTime)
        return res
    }

    async createMultiSubmission(args: any[]) {
        let useCase = new CreateMultiSubmission(this.submissionRepository)
        let res = await useCase.execute(args)
        return res
    }

    async getUserSubmissionsByTime(atcoderID: string, from: number) {
        let useCase = new GetUserSubmissionsByTime(this.submissionRepository)
        let res = await useCase.execute(atcoderID, from)
        return res
    }
}