import { getYear } from 'date-fns'

export const getDateDifference = (purchaseDate) => {
    const dateOfPurchase = new Date(purchaseDate)
    const yearOfPurchase = getYear(dateOfPurchase)
    const currentYear = new Date().getFullYear()
    return currentYear - yearOfPurchase
}