import RowContainer from "../../components/row-container";
import {
    AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset
  } from "../property-details/style";
import { format } from 'date-fns'
import { getDateDifference, formatPrice } from './helpers'

const ValuationChange = ({ account }) => {
    const originalDate = format(new Date(account.originalPurchasePriceDate), "MMMM do")
    const changeSincePurchase = account.recentValuation.amount - account.originalPurchasePrice
    const sincePurchasePercentage = changeSincePurchase / account.originalPurchasePrice * 100
    const annualAppreciation = sincePurchasePercentage / getDateDifference(account.originalPurchasePriceDate)
    return (
        <AccountSection>
            <AccountLabel>Valuation Changes</AccountLabel>
            <RowContainer>
            <AccountList>
                <AccountListItem><InfoText>Purchased for {formatPrice(account.originalPurchasePrice)} in {originalDate}</InfoText></AccountListItem>
                <AccountListItem><InfoText>Since purchase {formatPrice(changeSincePurchase)}</InfoText></AccountListItem>
                <AccountListItem><InfoText>Annual Appreciation {annualAppreciation}%</InfoText></AccountListItem>
            </AccountList>
            </RowContainer>
      </AccountSection>
    )
}

export default ValuationChange