import { SubmissionConverter } from "../../application/converter/SubmissionConverter.ts"
import { SubmissionSerializer } from "../serializers/SubmissionSerializer.ts"

export class SubmissionController {
    private submissionSerializer: SubmissionSerializer
    private submissionConverter: SubmissionConverter

    constructor(submissionConverter: SubmissionConverter, submissionSerializer: SubmissionSerializer) {
        this.submissionSerializer = submissionSerializer
        this.submissionConverter = submissionConverter
    }

    async createSubmission(req: any, res: any) {
        const {id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time} = req.body
        const ress = this.submissionConverter.createSubmission(id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time)
        return this.submissionSerializer.serialize(ress)
    }

    async createMultiSubmission(req: any, res: any) {
        const list: any[] = []
        
        for(const submission of req.body) {
            const {id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time} = submission
            list.push(id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time)
        }

        let result = await this.submissionConverter.createMultiSubmission(list)
        
        return this.submissionSerializer.serialize(result)
    }

    async getUserSubmissionsByTime(req: any, res: any) {
        const {atcoderID, from} = req.body

        let result = await this.submissionConverter.getUserSubmissionsByTime(atcoderID, from)

        return this.submissionSerializer.serialize(result)
    }
}