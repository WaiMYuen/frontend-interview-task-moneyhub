import Detail from "../modules/property-details";
import {Banner} from "../components/banner"

export default function PropertyDetails (props) {
  return (
    <>
      <Banner>Property Details</Banner>
      <Detail account={props}/>
    </>   
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/api/account')

  const data = await response.json()

  return {
    props: data.account
  }
}