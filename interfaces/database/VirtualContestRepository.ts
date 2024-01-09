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

    async findByTime(from: number, to: number): Promise<VirtualContest[]> {
        throw new Error("Method not implemented.");
    }

    async findByID(virtualContestID: string): Promise<VirtualContest> {
        throw new Error("Method not implemented.");
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
                virtualContest.members,
                virtualContest.problems
            ]
        )

        return virtualContest
    }

    async persistAll(virtualContests: VirtualContest[]): Promise<VirtualContest[]> {
        throw new Error("Method not implemented.");
    }

    delete(virtualContestID: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}