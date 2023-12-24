//Userというモデルから、APIに出力する形に変換する

import { Submission } from "../../domain/models/Submission.ts"

const _serializeSingleSubmission = (submission: Submission) => {
    return {
        id: submission.id,
        epoch_second: submission.epochSecond,
        problem_id: submission.problemID,
        contest_id: submission.contestID,
        user_id: submission.atcoderID,
        language: submission.language,
        point: submission.point,
        length: submission.length,
        result: submission.result,
        execution_time: submission.executionTime
    }
}

export class SubmissionSerializer {
    serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleSubmission)
        }
        return _serializeSingleSubmission(data)
    }
}