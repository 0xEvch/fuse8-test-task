import { useEffect, useRef } from "react";
import './SearchBar.css';

export default function SearchBar({ onTextChange, count }) {

    const inputFocus = useRef(null);

    useEffect(() => {
        inputFocus.current?.focus();
    }, []);

    const handleChange = (event) => {
        onTextChange(event.target.value); 
    };
    
    return (
        <div>
            <input type="text" ref={inputFocus} onChange={handleChange} placeholder='Search characters...' autoFocus/>
            {count >0 && <p id="count">Found characters: {count}</p>}
        </div>
    )
}