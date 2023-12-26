import { IProblemRepository } from "../repositories/IProblemRepository.ts"
import { CreateMultiProblem } from "../usecases/problem/CreateMultiProblem.ts"

export class ProblemConverter {
    private problemRepository: IProblemRepository

    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository
    }

    async createMultiProblem(problems: any[]) {
        let useCase = new CreateMultiProblem(this.problemRepository)
        let result = await useCase.execute(problems)

        return result
    }
}