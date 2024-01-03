import { UserSerializer } from '../serializers/UserSerializer.ts'
import { UserConverter } from '../../application/converter/UserConverter.ts'

export class UserController {
    private userSerializer: UserSerializer
    private userConverter: UserConverter

    constructor(userConverter: UserConverter, userSerializer: UserSerializer) {
        this.userSerializer = userSerializer
        this.userConverter = userConverter
    }

    async createUser(req: any, res: any) {
        const {discordID, atcoderID} = req.body
        let result = await this.userConverter.createUser(discordID, atcoderID)
        return this.userSerializer.serialize(result)
    }

    async listUsers(req: any, res: any) {
        return this.userSerializer.serialize(await this.userConverter.listUsers())
    }

    async getUser(req: any, res: any) {
        const discordID = req.params.discordID
        
        let result = await this.userConverter.getUser(discordID)
            .then(user => {
                return this.userSerializer.serialize(user)
            })
            .catch(error => {
                res.status(404)
                return
            })

        return result
    }

    async linkUser(req:any,res:any){
        const {discordID,atcoderID} = req.body
        let result = await this.userConverter.linkUser(discordID,atcoderID)
    }

    async unlinkUser(req:any,res:any){
        const discordID = req.params.discordID
        let result = await this.userConverter.unlinkUser(discordID)
    }
}