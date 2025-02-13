import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import './CharacterInfo.css';

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
          <li key={index} class='card'>
            <p className ={`name ${index < 2 ? "big" : "small"}`}>{char.name} – {char.species}</p>
            <p class='status'>Status: <span class={`status ${char.status.toLowerCase()}`}>{char.status}</span></p>
            <p class='created'>Created: {ChangeDate(char.created)}</p>
          </li>
        ))}
      </ul>
      </div>
    )
    
}