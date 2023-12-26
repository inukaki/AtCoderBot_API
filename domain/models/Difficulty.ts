export enum Color {
    Gray,
    Brown,
    Green,
    Cyan,
    Blue,
    Yellow,
    Orange,
    Red,
    None
}

export const valueOfColor = (name: string): Color | undefined => {
    return Color[name as keyof typeof Color];
}

export const getColor = (rating: number): Color => {
    let index = Math.floor(rating / 400)
    if(index > 7) index = 7
    if(index < 0) index = Color.None

    return index
}
