import { IProblemRepository } from "../repositories/IProblemRepository.ts"
import { CreateMultiProblem } from "../usecases/problem/CreateMultiProblem.ts"
import { GetProblem } from "../usecases/problem/GetProblem.ts"

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

    async getProblem(problemID: string) {
        let useCase = new GetProblem(this.problemRepository)
        let result = await useCase.execute(problemID)

        return result
    }
}