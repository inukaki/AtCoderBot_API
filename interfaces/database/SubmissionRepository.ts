import { ISubmissionRepository } from "../../application/repositories/ISubmissionRepository.ts";
import { Submission } from "../../domain/models/Submission.ts";
import { IDBConnection } from "./IDBConnection.ts";

export class SubmissionRepository extends ISubmissionRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    //json -> model
    convert(x: any) {
        return new Submission(x.id, x.epoch_second, x.problem_id, x.contest_id, x.user_id, x._language, x._point, x._length, x._result, x.execution_time)
    }

    async findAll(): Promise<Submission[]> {
        throw new Error("Method not implemented.");
    }

    async findById(atcoderID: string): Promise<Submission[]> {
        throw new Error("Method not implemented.");
    }

    async findLatest(): Promise<Submission> {
        let result = await this.connection.execute(
            'select * from submissions where id = (select max(id) from submissions)'
        )

        return this.convert(result[0])
    }

    async findByIdAndTime(atcoderID: string, from: number): Promise<Submission[]> {
        let result = await this.connection.execute(
            'select * from submissions where user_id = ? and epoch_second >= ?',
            [
                atcoderID,
                from,
            ]
        )
        
        return result.map(this.convert)   
    }

    async persist(submission: Submission): Promise<Submission> {
        let result = await this.connection.execute(
            `insert ignore into submissions (id, epoch_second, problem_id, contest_id, user_id, _language, _point, _length, _result, execution_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                submission.id,
                submission.epochSecond,
                submission.problemID,
                submission.contestID,
                submission.atcoderID,
                submission.language,
                submission.point,
                submission.length,
                submission.result,
                submission.executionTime
            ]
        )

        return submission
    }

    async persistAll(submissions: Submission[]): Promise<Submission[]> {
        var query = `insert ignore into submissions (id, epoch_second, problem_id, contest_id, user_id, _language, _point, _length, _result, execution_time) values `
        const list: any[] = []

        for(var i = 0; i < submissions.length; i++) {
             query += "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
             if(i != submissions.length-1) query += ", "

             const submission = submissions[i]

             list.push(submission.id,
                submission.epochSecond,
                submission.problemID,
                submission.contestID,
                submission.atcoderID,
                submission.language,
                submission.point,
                submission.length,
                submission.result,
                submission.executionTime
                )
        }

        let result = await this.connection.execute(
            query,
            list    
        )

        return submissions
    }

    async delete(submission: Submission): Promise<Submission> {
        throw new Error("Method not implemented.");
    }
}