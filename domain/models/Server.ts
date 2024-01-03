export class Server {
    private _serverID: string
    private _members: string[] //AtCoder ID
    private _dailyID: string

    constructor(serverID: string, members: string[], dailyID: string) {
        this._serverID = serverID
        this._members = members
        this._dailyID = dailyID
    }

    get serverID() {
        return this._serverID
    }

    get members() {
        return this._members
    }

    get dailyID() {
        return this._dailyID
    }
}