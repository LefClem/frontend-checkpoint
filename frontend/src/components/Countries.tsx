import { Country } from '@/types';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link';
import { useState } from 'react';
import { styled } from 'styled-components';
import CountryForm from './CountryForm';

const GET_COUNTRIES = gql`
    query Countries {
        countries {
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

export default function Countries (){
    const [countries, setCountries] = useState<Country[]>([])

    const { loading, error } = useQuery(GET_COUNTRIES, {
        onCompleted: (data => {
            setCountries(data.countries)
        })
    });
    if(loading) return <span>Loading...</span>
    if(error) return <span>Error...</span>
    console.log(countries);
    
    return (
        <>
            <CountryForm />
            <CountryContainer>
                {countries.map((country) => (
                    <Card href={`country/${country.code}`}>
                        <h3 key={country.id}>{country.name}</h3>
                        <span>{country.emoji}</span>
                    </Card>
                ))}
            </CountryContainer>
        </>
    )
}

const Card = styled(Link)`
    border: 1px solid lightgrey;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;

    h3 {
        margin: 0;
        color: black;   
    }

    span {
        font-size: 25px;
    }
`

const CountryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
`