import { IProblemRepository } from "../../application/repositories/IProblemRepository.ts";
import { Problem } from "../../domain/models/Problem.ts";
import { IDBConnection } from "./IDBConnection.ts";

export class ProblemRepository extends IProblemRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    async findAll(): Promise<Problem[]> {
        throw new Error("Method not implemented.");
    }

    async findByID(problemID: string): Promise<Problem> {
        let result = await this.connection.execute(
            'select * from problems where id = ?',
            problemID
        )
        return new Problem(result[0].id, result[0].contest_id, result[0].problem_index, result[0].name, result[0].title, result[0]._point, result[0].difficulty)
    }

    async persist(problem: Problem): Promise<Problem> {
        throw new Error("Method not implemented.");
    }

    async persistAll(problems: Problem[]): Promise<Problem[]> {
        let query = `insert into problems (id, contest_id, problem_index, name, title, _point, difficulty) values `
        const list: any[] = []

        for(var i = 0; i < problems.length; i++) {
             query += "(?, ?, ?, ?, ?, ?, ?)"
             if(i != problems.length-1) query += ", "

             const problem = problems[i]

             list.push(problem.problemID,
                problem.contestID,
                problem.problemIndex,
                problem.name,
                problem.title,
                problem.point,
                problem.difficulty,
             )
        }

        query += " on duplicate key update contest_id = values(contest_id), problem_index = values(problem_index), name = values(name), title = values(title), _point = values(_point), difficulty = values(difficulty)"
        
        let result = await this.connection.execute(
            query,
            list    
        )

        return problems
    }

    async delete(submission: Problem): Promise<Problem> {
        throw new Error("Method not implemented.");
    }
}