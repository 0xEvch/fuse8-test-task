import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import './CharacterInfo.css';

const getId= (index, suffix) => `${index < 2 ? `big${suffix}` : `small${suffix}`}`;
const getStatus = (value) =>`${value.toLowerCase()}`

async function GetInfo(name) {
  if (!name) return [];

    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    return response.data.results.map((char) => ({
        name: char.name,
        species: char.species,
        status: char.status,
        created: char.created,
    }))
}

function ChangeDate(value) {
  const [year, month, day] = value.split("T")[0].split("-");
  return `${day}.${month}.${year}`;
}

export default function Characterinfo({name}) {

    const {data, isLoading, error} = useQuery({
        queryKey: [name],
        queryFn: () => GetInfo(name),
        enabled: !!name,
    });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
      <div class='container'>
        <ul>
        {data?.map((char, index) => ( 
          <li key={index}>
            <p class="name" id={getId(index, "name")}>{char.name} – {char.species}</p>
            <p class='status' id={getId(index, "status")}>Status: <span class={getStatus(char.status)}>{char.status}</span></p>
            <p class='created' id={getId(index, "created")}>Created: {ChangeDate(char.created)}</p>
          </li>
        ))}
      </ul>
      </div>
    )
    
}