import { IUserRepository } from '../../application/repositories/IUserRepository'
import { IDBConnection } from './IDBConnection'
import { User } from '../../domain/models/User';


export class UserRepository implements IUserRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        this.connection = connection;
    }

    findAll(): Promise<User[]> {
        //TODO いつかかきます
        return Promise.resolve([]);
    }

    //TODO 存在しない場合
    //O(logN)
    async findByDiscord(discordID: number): Promise<User> {
        let result = await this.connection.execute(
            'select ATCODER_ID from users where DISCORD_ID = ?',
            [
                discordID
            ]
        )
        
        return new User(discordID, result[0].ATCODER_ID)
    }

    //遅いです O(N)
    async findByAtCoder(atcoderID: string): Promise<User> {
        let result = await this.connection.execute(
            'select DISCORD_ID from users where ATCODER_ID = ?'
            [
                atcoderID
            ]
        )

        return new User(result[0].DISCORD_ID, atcoderID)
    }

    async persist(user: User): Promise<User> {
        await this.connection.execute(
            'insert into users (DISCORD_ID, ATCODER_ID) values (?, ?)',
            [
                user.discordID,
                user.atcoderID
            ]
        )
        return user
    }

    //TODO いつかかく
    delete(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

}