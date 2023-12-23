
export class User {
    private _discordID: number
    private _atcoderID: string
    
    get discordID(): number {
        return this._discordID
    }

    set discordID(id: number) {
        this._discordID = id
    }

    get atcoderID(): string {
        return this._atcoderID
    }

    set atcoderID(id: string) {
        this._atcoderID = id
    }

    constructor(discordID: number, atcoderID: string) {
        this._discordID = discordID
        this._atcoderID = atcoderID
    }
}