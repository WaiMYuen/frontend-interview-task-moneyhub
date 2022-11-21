import { getYear } from 'date-fns'

export const getDateDifference = (purchaseDate) => {
    const dateOfPurchase = new Date(purchaseDate)
    const yearOfPurchase = getYear(dateOfPurchase)
    const currentYear = new Date().getFullYear()
    return currentYear - yearOfPurchase
}

export const formatPrice = (price) => new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price)