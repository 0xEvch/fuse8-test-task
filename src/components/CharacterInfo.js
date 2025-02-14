import { useQuery } from '@tanstack/react-query'
import { useEffect } from "react";
import axios from 'axios';
import './CharacterInfo.css';

const getId= (index, suffix) => `${index < 2 ? `big${suffix}` : `small${suffix}`}`;
const getStatus = (value) =>`${value.toLowerCase()}`

async function GetInfo(name) {
  if (!name) return [];

    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    return { count: response.data.info.count,
      results: response.data.results.map((char) => ({
        name: char.name,
        species: char.species,
        status: char.status,
        created: char.created,
        url: char.url
    }))}
}

function ChangeDate(value) {
  const [year, month, day] = value.split("T")[0].split("-");
  return `${day}.${month}.${year}`;
}

export default function Characterinfo({name, setCount}) {

    const {data, isLoading, error} = useQuery({
        queryKey: [name],
        queryFn: () => GetInfo(name),
        enabled: !!name,
    });
    if (isLoading) console.log("Loading...");
    if (error) console.log("Error");
    
    useEffect(() => {
      !!name ? setCount(data?.count) : setCount(0);
    }, [name]);

    return (
      <div className='container'>
        <ul>
        {data?.results.map((char, index) => ( 
          <li key={index}>
            <a href={char.url}>
              <p className="name" id={getId(index, "name")}>{char.name} – {char.species}</p>
              <p className='status' id={getId(index, "status")}>Status: <span className={getStatus(char.status)}>{char.status}</span></p>
              <p className='created' id={getId(index, "created")}>Created: {ChangeDate(char.created)}</p>
            </a>
          </li>
        ))}
      </ul>
      </div>
    )
    
}