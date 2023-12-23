//Userというモデルから、APIに出力する形に変換する

import { User } from "../../domain/models/User.ts"

const _serializeSingleUser = (user: User) => {
    return {
        discordID: user.discordID,
        atcoderID: user.atcoderID
    }
}

export class UserSerializer {
    serialize(data: any) {
        if(!data) { 
            throw new Error('expect data to be not undefined nor null')
        }
        if(Array.isArray(data)) {
            return data.map(_serializeSingleUser)
        }
        return _serializeSingleUser(data)
    }
}