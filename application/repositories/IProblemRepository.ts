import { Problem } from "../../domain/models/Problem.ts";

export abstract class IProblemRepository {
    abstract findAll(): Promise<Array<Problem>>
    abstract findByID(problemID: string): Promise<Problem>
    abstract persist(problem: Problem): Promise<Problem>
    abstract persistAll(problems: Problem[]): Promise<Problem[]>
    abstract delete(problem: Problem): Promise<Problem>
}