import { Submission } from "../../domain/models/Submission"

const _deserializeSingleSubmission = (submission: any) => {
    return new Submission(submission.id, submission.epoch_second, submission.problem_id, submission.contest_id, submission.user_id, submission.language, submission.point, submission.length, submission.result, submission.execution_time)
}

export class SubmissionDeserializer {
    
    /**
     * jsonからSubmissionに変換
     * @param data jsonもしくはjsonの配列
     * @returns SubmissionもしくはSubmission[]
     */
    deserialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_deserializeSingleSubmission)
        }
        return _deserializeSingleSubmission(data)
    }
}