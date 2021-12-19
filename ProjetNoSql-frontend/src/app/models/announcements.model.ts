export interface Announcements {
    _id?: any;

    ownerId: string
    title: string
    sqm: number
    description: string

    type_ann:  string
    type_lodgement: string
    availability:  boolean
    governorate: string
    city: string
    street: string
    price: string
    imageUrl?:  File
    secondaryImagesUrl?: File[]
    uploaded?:  Date

    baths?: number
    equippedKitchen?: boolean
    rooms?: number
    garden?: boolean
    floor?: number
    elevator?: boolean
}