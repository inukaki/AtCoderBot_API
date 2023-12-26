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
        throw new Error("Method not implemented.");
    }

    async persist(problem: Problem): Promise<Problem> {
        throw new Error("Method not implemented.");
    }

    async persistAll(problems: Problem[]): Promise<Problem[]> {
        let query = `insert ignore into problems (id, contest_id, problem_index, name, title, difficulty) values `
        const list: any[] = []

        for(var i = 0; i < problems.length; i++) {
             query += "(?, ?, ?, ?, ?, ?)"
             if(i != problems.length-1) query += ", "

             const problem = problems[i]

             list.push(problem.problemID,
                problem.contestID,
                problem.problemIndex,
                problem.name,
                problem.title,
                problem.difficulty,
             )
        }
        
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