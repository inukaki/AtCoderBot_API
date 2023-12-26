import { Problem } from "../../../domain/models/Problem.ts";
import { IProblemRepository } from "../../repositories/IProblemRepository.ts";

export class CreateMultiProblem {
    private problemRepository: IProblemRepository

    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository
    }

    execute(problems: any[]) {
        return this.problemRepository.persistAll(problems.map((x) => {
            return new Problem(x[0], x[1], x[2], x[3], x[4], x[5])
            
        }))
    } 
}