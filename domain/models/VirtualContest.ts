export class VirtualContest {
    private _virtualContestID
    private _startAt
    private _durationSecond
    private _title
    private _visible
    private _serverID
    private _members
    private _problems

    constructor(virtualContestID: number, startAt: number, durationSecond: number, title: string, visible: string, serverID: string, members: string[], problems: string[]) {
        this._virtualContestID = virtualContestID
        this._startAt = startAt
        this._durationSecond = durationSecond
        this._title = title
        this._visible = visible
        this._serverID = serverID
        this._members = members
        this._problems = problems
    }

    get virtualContestID() {
        return this._virtualContestID
    }

    set virtualContestID(virtualContestID: number) {
        this._virtualContestID = virtualContestID
    }

    get startAt() {
        return this._startAt
    }

    get durationSecond() {
        return this._durationSecond
    }

    get title() {
        return this._title
    }

    get visible() {
        return this._visible
    }

    get serverID() {
        return this._serverID
    }

    get members() {
        return this._members
    }

    get problems() {
        return this._problems
    }
    
}