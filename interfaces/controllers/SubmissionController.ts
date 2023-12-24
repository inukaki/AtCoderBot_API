import { CreateMultiSubmission } from "../../application/usecases/submission/CreateMultiSubmissions.ts"
import { CreateSubmission } from "../../application/usecases/submission/CreateSubmission.ts"
import { IDBConnection } from "../database/IDBConnection.ts"
import { SubmissionRepository } from "../database/SubmissionRepository.ts"
import { SubmissionSerializer } from "../serializers/SubmissionSerializer.ts"

export class SubmissionController {
    private submissionSerializer: SubmissionSerializer
    private submissionRepository: SubmissionRepository

    constructor(dbConnection: IDBConnection) {
        this.submissionSerializer = new SubmissionSerializer()
        this.submissionRepository = new SubmissionRepository(dbConnection)
    }

    async createSubmission(req: any, res: any) {
        const {id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time} = req.body
        const useCase = new CreateSubmission(this.submissionRepository)
        let ress = await useCase.execute(id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time)
        return this.submissionSerializer.serialize(ress)
    }

    async createMultiSubmission(req: any, res: any) {
        const useCase = new CreateMultiSubmission(this.submissionRepository)
        const list: any[] = []
        
        for(const submission of req.body) {
            const {id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time} = submission
            list.push(id, epoch_second, problem_id, contest_id, user_id, language, point, length, result, execution_time)
        }

        let result = await useCase.execute(list)
        
        return this.submissionSerializer.serialize(result)
    }
}