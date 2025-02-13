import './SearchBar.css';

export default function SearchBar({ onTextChange }) {

    const handleChange = (event) => {
        onTextChange(event.target.value); 
    };
    
    return  <input type="text" onChange={handleChange} placeholder='Search characters...'/>;
}