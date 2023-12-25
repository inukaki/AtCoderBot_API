import { Problem } from "../../../domain/models/Problem.ts";
import { IProblemRepository } from "../../repositories/IProblemRepository.ts";

export class CreateMultiProblem {
    private problemRepository: IProblemRepository

    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository
    }

    execute(args: any[]) {
        const problems: Problem[] = []

        for(var i = 0; i < args.length; i += 6) {
            problems.push(new Problem(args[i],args[i+1],args[i+2],args[i+3],args[i+4],args[i+5]))
        }

        return this.problemRepository.persistAll(problems)
    } 
}