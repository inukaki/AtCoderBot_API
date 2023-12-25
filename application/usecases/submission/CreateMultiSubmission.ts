import { Submission } from "../../../domain/models/Submission.ts" 
import { ISubmissionRepository } from "../../repositories/ISubmissionRepository.ts" 

export class CreateMultiSubmission {
    private submissionRepository: ISubmissionRepository

    constructor(submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository
    }

    execute(args: any[]) {
        const submissions: Submission[] = []
        for(var i = 0; i < args.length; i += 10) {
            submissions.push(new Submission(args[i],args[i+1],args[i+2],args[i+3],args[i+4],args[i+5],args[i+6],args[i+7],args[i+8],args[i+9]))
        }
        return this.submissionRepository.persistAll(submissions)
    } 
}