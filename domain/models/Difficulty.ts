export const Color = ["Gray", "Brown", "Green", "Cyan", "Blue", "Yellow", "Orange", "Red", "None"]

export const getColor = (rating: number): string => {
    if(typeof rating != "number") return "None"
    
    let index = Math.floor(rating / 400)
    if(index > 7) index = 7
    if(index < 0) index = 8

    return Color[index]
}

export const isColor = (color: string): Boolean => {
    return Color.filter((str)=>{return str == color}).length != 0;
}

export const getRating = (color: string): number[] => {
    let index = Color.indexOf(color)

    let from = (index != 8) ? index * 400 : -1 
    let to = (index + 1) * 400 - 1

    if(index == 7) to = 10000
    if(index == 8) to = 0

    return [from,to]
}