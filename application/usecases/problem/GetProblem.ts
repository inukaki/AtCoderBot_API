import { Problem } from "../../../domain/models/Problem.ts";
import { IProblemRepository } from "../../repositories/IProblemRepository.ts";

export class GetProblem {
    private problemRepository: IProblemRepository

    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository
    }

    execute(problemID: string) {
        return this.problemRepository.findByID(problemID)
    } 
}