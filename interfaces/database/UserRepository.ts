import { IUserRepository } from '../../application/repositories/IUserRepository.ts'
import { IDBConnection } from './IDBConnection.ts'
import { User } from '../../domain/models/User.ts';

export class UserRepository extends IUserRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    findAll(): Promise<User[]> {
        //TODO いつかかきます
        return Promise.resolve([]);
    }

    //TODO 存在しない場合
    /**
     * Discord ID から User を探す
     * 多分 O(logN)
     * @param discordID 
     * @returns Promise<User>
     */
    async findByDiscord(discordID: number): Promise<User> {
        let result = await this.connection.execute(
            'select atcoder_id from users where discord_id = ?',
            [
                discordID
            ]
        )
        
        return new User(discordID, result[0].ATCODER_ID)
    }

    /**
     * AtCoder ID から User を探す
     * 多分 O(N)
     * @param atcoderID 
     * @returns Promise<User>
     */
    async findByAtCoder(atcoderID: string): Promise<User> {
        let result = await this.connection.execute(
            'select discord_id from users where atcoder_id = ?',
            [
                atcoderID
            ]
        )

        return new User(result[0].DISCORD_ID, atcoderID)
    }

    async persist(user: User): Promise<User> {
        await this.connection.execute(
            'insert into users (discord_id, atcoder_id) values (?, ?) on duplicate key update atcoder_id = values(atcoder_id)',
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