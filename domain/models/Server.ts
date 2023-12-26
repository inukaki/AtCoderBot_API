import { Color } from "./Difficulty"

export class Server {
    private _serverID: number
    private _members: string[] //AtCoder ID
    private _daily: boolean
    private _dailyID: Color[]

    constructor(serverID: number, members: string[], daily: boolean, dailyID: Color[]) {
        this._serverID = serverID
        this._members = members
        this._daily = daily
        this._dailyID = dailyID
    }

    get serverID() {
        return this._serverID
    }

    get members() {
        return this._members
    }

    get daily() {
        return this._daily
    }

    get dailyID() {
        return this._dailyID
    }
}