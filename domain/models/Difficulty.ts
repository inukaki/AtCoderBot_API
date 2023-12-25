export enum Color {
    Gray,
    Brown,
    Green,
    Cyan,
    Blue,
    Yellow,
    Orange,
    Red
}

export const getColor = (rating: number) => {
    let index = rating / 400
    if(index > 7) index = 7

    return Color[index]
}
