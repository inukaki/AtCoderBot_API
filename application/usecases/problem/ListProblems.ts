import { Problem } from "../../../domain/models/Problem.ts";
import { IProblemRepository } from "../../repositories/IProblemRepository.ts";

export class ListProblems {
    private problemRepository: IProblemRepository

    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository
    }

    execute() {
        return this.problemRepository.findAll()
    } 
}