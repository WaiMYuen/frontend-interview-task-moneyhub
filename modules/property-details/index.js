/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React from "react";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, InfoChange, Inset
} from "./style";
import { getDateDifference, formatPrice } from './helpers'
import PropTypes from 'prop-types'

const Detail = ({ account }) => {
  let mortgage;
  const lastUpdate = new Date(account.lastUpdate);
  if (account.associatedMortgages.length) {
    mortgage = account.associatedMortgages[0];
  }

  const EstimatedValue = () => {
    return (
      <AccountSection>
      <AccountLabel>Estimated Value</AccountLabel>
      <AccountHeadline>
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(account.recentValuation.amount)}
      </AccountHeadline>
      <AccountList>
        <AccountListItem><InfoText>
          {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
        </InfoText></AccountListItem>
        <AccountListItem><InfoText>
          {`Next update ${format(
            add(lastUpdate, { days: account.updateAfterDays }),
            "do MMM yyyy"
          )}`}
        </InfoText></AccountListItem>
      </AccountList>
    </AccountSection>
    )
  }

  const PropertyDetails = () => {
    return (
      <AccountSection>
        <AccountLabel>Property details</AccountLabel>
        <RowContainer>
          <AccountList>
            <AccountListItem><InfoText>{account.name}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{account.bankName}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{account.postcode}</InfoText></AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
    )
  }

  const Mortgage = () => {
    return (
      mortgage && (
        <AccountSection>
          <AccountLabel>Mortgage</AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={() => alert("You have navigated to the mortgage page")}
          >
            <AccountList>
              <AccountListItem><InfoText>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(account.associatedMortgages[0].currentBalance)
                )}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>{account.associatedMortgages[0].name}</InfoText></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
      )
    )
  }

  const ValuationChange = () => {
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
              <AccountListItem>
                <InfoText>Since purchase</InfoText>
                <InfoChange value={changeSincePurchase}>{formatPrice(changeSincePurchase)} ({sincePurchasePercentage}%)</InfoChange>
              </AccountListItem>
              <AccountListItem>
                <InfoText>Annual Appreciation</InfoText>
                <InfoChange value={annualAppreciation}>{annualAppreciation}%</InfoChange>
              </AccountListItem>
          </AccountList>
          </RowContainer>
      </AccountSection>
    )
  }

  return (
    <Inset>
      <EstimatedValue />
      <PropertyDetails />
      <Mortgage />
      <ValuationChange />
      <Button
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>
    </Inset>
  );
};

Detail.PropTypes = {
  account: PropTypes.object.isRequired
}

export default Detail;
