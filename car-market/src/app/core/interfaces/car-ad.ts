export interface ICarAd {
    _id: string,
    brand: string,
    model: string,
    year: number,
    description: string,
    price: number,
    location:  string,
    phone: string,
    img: string,
    isSwappable: boolean,
    authorId: string,
    comments: string[]
}