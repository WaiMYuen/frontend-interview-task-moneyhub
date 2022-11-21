import RowContainer from "../../components/row-container";
import {
    AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset
  } from "../property-details/style";
import { format, getYear } from 'date-fns'

const ValuationChange = ({ account }) => {
    const originalPrice = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(account.originalPurchasePrice)
    const dateOfPurchase = new Date(account.originalPurchasePriceDate)
    const originalDate = format(dateOfPurchase, "MMMM do")
    const yearOfPurchase = getYear(dateOfPurchase)
    const currentYear = new Date().getFullYear()
    const dateDifference = currentYear - yearOfPurchase 
    const changeSincePurchase = account.recentValuation.amount - account.originalPurchasePrice
    const formattedChangeSincePurchase = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(changeSincePurchase)
    const sincePurchasePercentage = changeSincePurchase / account.originalPurchasePrice * 100
    const annualAppreciation = sincePurchasePercentage / dateDifference
    return (
        <AccountSection>
            <AccountLabel>Valuation Changes</AccountLabel>
            <RowContainer>
            <AccountList>
                <AccountListItem><InfoText>Purchased for {originalPrice} in {originalDate}</InfoText></AccountListItem>
                <AccountListItem><InfoText>Since purchase {formattedChangeSincePurchase}</InfoText></AccountListItem>
                <AccountListItem><InfoText>Annual Appreciation {annualAppreciation}%</InfoText></AccountListItem>
            </AccountList>
            </RowContainer>
      </AccountSection>
    )
}

export default ValuationChange