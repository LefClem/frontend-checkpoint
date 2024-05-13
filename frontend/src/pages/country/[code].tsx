import Header from "@/components/Header";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { Country } from "@/types";
import { styled } from "styled-components";

const GET_COUNTRY = gql`
query Query($code: String!) {
    country(code: $code) {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`

export default function Country(){
    
    const [country, setCountry] = useState<Country>();
    const searchParams = useSearchParams();
    const search = searchParams.get("code");     

    const { loading, error } = useQuery(GET_COUNTRY, {
        variables: {
            code: search
        },
        onCompleted: (data => {
            setCountry(data.country)
        })
    });
    if(loading) return <span>Loading...</span>
    if(error) return <span>Error...</span>    

    console.log(country);
    

    return (
        <>
            <Header/>
            <CountryContainer>
                <h1>{country?.emoji}</h1>
                <span>Name: {country?.name} ({country?.code})</span>
                {country?.continent && <span>Continent: {country?.continent.name}</span>}
            </CountryContainer>
        </>
    )
}

const CountryContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 5px;

    h1 {
        font-size: 100px;
        margin: 0;  
    }
`