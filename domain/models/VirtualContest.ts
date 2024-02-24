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

    set startAt(startAt: number) {
        this._startAt = startAt
    }

    get durationSecond() {
        return this._durationSecond
    }

    set durationSecond(durationSecond: number) {
        this._durationSecond = durationSecond
    }

    get title() {
        return this._title
    }

    set title(title: string) {
        this._title = title
    }

    get visible() {
        return this._visible
    }

    set visible(visible: string) {
        this._visible = visible
    }

    get serverID() {
        return this._serverID
    }

    set serverID(serverID: string) {
        this._serverID = serverID
    }

    get members() {
        return this._members
    }

    set members(members: string[]) {
        this._members = members
    }

    get problems() {
        return this._problems
    }

    set problems(problems: string[]) {
        this._problems = problems
    }
}