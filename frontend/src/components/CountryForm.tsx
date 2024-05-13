import { gql, useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router";
import { styled } from "styled-components";

const ADD_COUNTRY = gql`
    mutation Mutation($data: NewCountryInput!) {
        addCountry(data: $data) {
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
`;

const GET_CONTINENTS = gql`
query Query {
    continents {
      id
      name
    }
  }
`;

export default function CountryForm() {
    const [createCountry] = useMutation(ADD_COUNTRY);
    const { loading, error, data } = useQuery(GET_CONTINENTS);
    const router = useRouter();

    if (loading) return <p>Loading...</p>;
    if (error) return `Erreur : ${error}`;
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
    
        const formJson = Object.fromEntries(formData.entries());
        createCountry({
          variables: {
            data: {
              ...formJson,
              continent: {
                id: parseInt(formJson.continent as string)
              }
            }
          },
          onCompleted: () => {
            router.push('/');
          }
        })
      }      
    
    return (
        <StyledCountryForm onSubmit={(e) => handleSubmit(e)}>
            <label>Name</label>
            <input type="text" name="name"/>
            <label>Emoji</label>
            <input type="text" name="emoji"/>
            <label>Code</label>
            <input type="text" name="code"/>
            <label>Continent</label>
            <select name="continent" id="continent">
                {data.continents.map((continent: any) => (
                    <option key={continent.id} value={continent.id}>{continent.name}</option>
                ))}
            </select>
            <button type="submit">Add</button>
        </StyledCountryForm>
    )
}

const StyledCountryForm = styled.form`
    display: flex;
    justify-content: center;
    margin: 30px auto;
    gap: 10px;
    border: 1px solid lightgrey;
    width: 90%;
    padding: 25px;

    @media(max-width: 1024px){
        flex-direction: column;
    }

    button {
        border: none;
        background: #e3376c;
        border-radius: 10px;
        color: #FFF;

        @media(max-width: 1024px){
            margin: 0 auto;
            padding: 10px;  
        }
    }
`;