import { IContestRepository } from "../../application/repositories/IContestRepository.ts";
import { Contest } from "../../domain/models/Contest.ts";
import { server } from "../../infrastructure/server.ts";
import { IDBConnection } from "./IDBConnection.ts";

export class ContestRepository extends IContestRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    convert(x: any) {
        return new Contest(x.id,x.start_at,x.duration_second,x.title, JSON.parse(x.problems))
    }
    
    findAll(): Promise<Contest[]> {
        throw new Error("Method not implemented.");
    }

    async findByTime(from: number, to: number): Promise<Contest[]> {
        let result = await this.connection.execute(
            'select * from contests where start_at >= ? and start_at <= ?',
            [
                from,
                to
            ]
        )

        return result.map(this.convert)
    }

    async findByID(contestID: string): Promise<Contest> {
        let result = await this.connection.execute(
            'select * from contests where id = ?',
            [
                contestID
            ]
        )

        return this.convert(result[0])
    }

    persist(contest: Contest): Promise<Contest> {
        throw new Error("Method not implemented.");
    }

    async persistAll(contests: Contest[]): Promise<Contest[]> {
        let query = `insert into contests (id, start_at, duration_second, problems) values `
        const list: any[] = []

        for(var i = 0; i < contests.length; i++) {
             query += "(?, ?, ?, ?)"
             if(i != contests.length-1) query += ", "

             const contest = contests[i]

             list.push(contest.contestID,
                contest.startAt,
                contest.durationSecond,
                JSON.stringify(contest.problems)
             )
        }

        query += " on duplicate key update start_at = values(start_at), duration_second = values(duration_second), problems = values(problems)"

        let result = await this.connection.execute(
            query,
            list    
        )

        return contests
    }

    delete(contestID: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}