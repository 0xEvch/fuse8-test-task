import { useEffect, useRef } from "react";
import './SearchBar.css';

export default function SearchBar({ onTextChange }) {

    const inputFocus = useRef(null);

    useEffect(() => {
        inputFocus.current?.focus();
    }, []);

    const handleChange = (event) => {
        onTextChange(event.target.value); 
    };
    
    return  <input type="text" ref={inputFocus} onChange={handleChange} placeholder='Search characters...' autofocus/>;
}