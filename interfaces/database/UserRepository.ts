import { IUserRepository } from '../../application/repositories/IUserRepository.ts'
import { IDBConnection } from './IDBConnection.ts'
import { User } from '../../domain/models/User.ts';

export class UserRepository extends IUserRepository {
    private connection: any

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    async findAll(): Promise<User[]> {
        let result = await this.connection.execute(
            'select * from users'
        )
        return result.map((x: any) => {return new User(x.discord_id, x.atcoder_id, x.rating, JSON.parse(x.solved))})
    }

    //TODO 複数ある場合
    /**
     * Discord ID から User を探す
     * @param discordID 
     * @returns Promise<User>
     */
    async findByDiscord(discordID: string): Promise<User> {
        let result = await this.connection.execute(
            'select * from users where discord_id = ?',
            [
                discordID
            ]
        )

        if(result.length == 0) {
            return Promise.reject(404)
        }
        
        return new User(discordID, result[0].atcoder_id, result[0].rating, JSON.parse(result[0].solved))
    }

    /**
     * AtCoder ID から User を探す
     * @param atcoderID 
     * @returns Promise<User>
     */
    async findByAtCoder(atcoderID: string): Promise<User> {
        let result = await this.connection.execute(
            'select * from users where atcoder_id = ?',
            [
                atcoderID
            ]
        )

        return new User(result[0].discord_id, atcoderID, result[0].rating, JSON.parse(result[0].solved))
    }

    async persist(user: User): Promise<User> {
        await this.connection.execute(
            'insert into users (atcoder_id, discord_id, rating, solved) values (?, ?, ?, ?)',
            [
                user.atcoderID,
                user.discordID,
                user.rating,
                JSON.stringify(user.solved)
            ]
        )
        return user
    }

    async merge(user: User) {
        await this.connection.execute(
            'insert into users (atcoder_id, discord_id, rating, solved) values (?, ?, ?, ?) on duplicate key update discord_id = values(discord_id), rating = values(rating), solved = values(solved)',
            [
                user.atcoderID,
                user.discordID,
                user.rating,
                user.solved
            ]
        )
        return user
    }

    async link(discordID: string, atcoderID: string): Promise<void> {
        let result = await this.connection.execute(
            'insert into users (atcoder_id, discord_id, rating, solved) values (?, ?, ?, ?) on duplicate key update discord_id = values(discord_id)',
            [
                atcoderID,
                discordID,
                0,
                JSON.stringify([])
            ]
        )
    }

    async unlink(discordID: string): Promise<void> {
        let result = await this.connection.execute(
            'update users set discord_id = null where discord_id = ?',
            [
                discordID,
            ]
        ) 

        if(result.affectedRows == 0) return Promise.reject(404)
    }

}