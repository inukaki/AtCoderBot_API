import { User } from '../../domain/models/User'; 

export abstract class IUserRepository {
    abstract findAll(): Promise<Array<User>>
    abstract findByDiscord(discordID: number): Promise<User>
    abstract findByAtCoder(atcoderID: string): Promise<User>
    abstract persist(user: User): Promise<User>
    abstract delete(user: User): Promise<User>
}