import { User } from '../../domain/models/User.ts'; 

export abstract class IUserRepository {
    abstract findAll(): Promise<Array<User>>
    abstract findByDiscord(discordID: string): Promise<User>
    abstract findByAtCoder(atcoderID: string): Promise<User>
    abstract persist(user: User): Promise<User>
    abstract merge(user: User): Promise<User>
    abstract link(discordID: string, atcoderID: string): Promise<void>
    abstract unlink(discordID: string): Promise<void>
}