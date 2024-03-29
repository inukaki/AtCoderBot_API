import { IProblemRepository } from "../repositories/IProblemRepository.ts"
import { CreateMultiProblem } from "../usecases/problem/CreateMultiProblem.ts"
import { GetProblem } from "../usecases/problem/GetProblem.ts"
import { GetRandomProblem } from "../usecases/problem/GetRandomProblem.ts"
import { ListProblems } from "../usecases/problem/ListProblems.ts"

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

    async getRandomProblem(from: number, to: number, count: number) {
        let useCase = new GetRandomProblem(this.problemRepository)
        let result = await useCase.execute(from,to,count)

        return result
    }

    async listProblems() {
        let useCase = new ListProblems(this.problemRepository)
        let result = await useCase.execute()
        
        return result
    }
}