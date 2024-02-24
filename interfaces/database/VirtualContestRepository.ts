import { IVirtualContestRepository } from "../../application/repositories/IVirtualContestRepository.ts";
import { VirtualContest } from "../../domain/models/VirtualContest.ts";
import { IDBConnection } from "./IDBConnection.ts";

export class VirtualContestRepository extends IVirtualContestRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }
    
    findAll(): Promise<VirtualContest[]> {
        throw new Error("Method not implemented.");
    }

    async findByTimeAndServerID(serverID: string, from: number, to: number): Promise<VirtualContest[]> {
        let result = await this.connection.execute(
            'select * from virtual_contests where server_id = ? and start_at >= ? and start_at <= ?',
            [
                serverID,
                from,
                to
            ]
        )

        return result.map((x: any) => {return new VirtualContest(x.virtual_contest_id, x.start_at, x.duration_second, x.title, x.visible, x.server_id, JSON.parse(x.members), JSON.parse(x.problems))})
    }

    async findByTime(from: number, to: number): Promise<VirtualContest[]> {
        let result = await this.connection.execute(
            'select * from virtual_contests where start_at >= ? and start_at <= ?',
            [
                from,
                to
            ]
        )

        return result.map((x: any) => {return new VirtualContest(x.virtual_contest_id, x.start_at, x.duration_second, x.title, x.visible, x.server_id, JSON.parse(x.members), JSON.parse(x.problems))})
    }

    async findByID(virtualContestID: number): Promise<VirtualContest> {
        let result = await this.connection.execute(
            'select * from virtual_contests where virtual_contest_id = ?',
            [
                virtualContestID
            ]
        )

        if(result.length == 0) return Promise.reject(404)

        return new VirtualContest(result[0].virtual_contest_id, result[0].start_at, result[0].duration_second, result[0].title, result[0].visible, result[0].server_id, JSON.parse(result[0].members), JSON.parse(result[0].problems))
    }

    async persist(virtualContest: VirtualContest): Promise<VirtualContest> {
        let result = await this.connection.execute(
            'insert into virtual_contests (virtual_contest_id, start_at, duration_second, title, visible, server_id, members, problems) values (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                virtualContest.virtualContestID,
                virtualContest.startAt,
                virtualContest.durationSecond,
                virtualContest.title,
                virtualContest.visible,
                virtualContest.serverID,
                JSON.stringify(virtualContest.members),
                JSON.stringify(virtualContest.problems)
            ]
        )
        virtualContest.virtualContestID = result.insertId
  
        return virtualContest
    }

    async merge(virtualContest: VirtualContest) {
        let result = await this.connection.execute(
            'insert into virtual_contests (virtual_contest_id, start_at, duration_second, title, visible, server_id, members, problems) values (?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update start_at = values(start_at), duration_second = values(duration_second), title = values(title), visible = values(visible), server_id = values(server_id), members = values(members), problems = values(problems)',
            [
                virtualContest.virtualContestID,
                virtualContest.startAt,
                virtualContest.durationSecond,
                virtualContest.title,
                virtualContest.visible,
                virtualContest.serverID,
                JSON.stringify(virtualContest.members),
                JSON.stringify(virtualContest.problems)
            ]
        )
  
        return virtualContest
    }

    async persistAll(virtualContests: VirtualContest[]): Promise<VirtualContest[]> {
        throw new Error("Method not implemented.");
    }

    delete(virtualContestID: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}