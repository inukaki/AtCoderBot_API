export const Color = ["Gray", "Brown", "Green", "Cyan", "Blue", "Yellow", "Orange", "Red", "None"]

export const getColor = (rating: number): string => {
    if(typeof rating != "number") return "None"
    
    let index = Math.floor(rating / 400)
    if(index > 7) index = 7
    if(index < 0) index = 8

    return Color[index]
}