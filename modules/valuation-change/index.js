import RowContainer from "../../components/row-container";
import {
    AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, InfoChange
  } from "../property-details/style";
import { format } from 'date-fns'
import { getDateDifference, formatPrice } from './helpers'

const ValuationChange = ({ account }) => {
    const originalDate = format(new Date(account.originalPurchasePriceDate), "MMMM do")
    const changeSincePurchase = account.recentValuation.amount - account.originalPurchasePrice
    const sincePurchasePercentage = changeSincePurchase / account.originalPurchasePrice * 100
    const annualAppreciation = (sincePurchasePercentage / getDateDifference(account.originalPurchasePriceDate)).toFixed(2)
    return (
        <AccountSection>
            <AccountLabel>Valuation Changes</AccountLabel>
            <RowContainer>
            <AccountList>
                <AccountListItem><InfoText>Purchased for <b>{formatPrice(account.originalPurchasePrice)}</b> in {originalDate}</InfoText></AccountListItem>
                <AccountListItem><InfoText>Since purchase</InfoText><InfoChange value={changeSincePurchase}>{formatPrice(changeSincePurchase)} ({sincePurchasePercentage}%)</InfoChange></AccountListItem>
                <AccountListItem><InfoText>Annual Appreciation</InfoText><InfoChange value={annualAppreciation}>{annualAppreciation}%</InfoChange></AccountListItem>
            </AccountList>
            </RowContainer>
      </AccountSection>
    )
}

export default ValuationChange