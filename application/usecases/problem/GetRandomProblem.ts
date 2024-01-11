import { Problem } from "../../../domain/models/Problem.ts";
import { IProblemRepository } from "../../repositories/IProblemRepository.ts";

export class GetRandomProblem {
    private problemRepository: IProblemRepository

    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository
    }

    execute(from: number, to: number, count: number) {
        return this.problemRepository.findRandom(from, to, count)
    } 
}