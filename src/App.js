import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Characterinfo from "./components/CharacterInfo.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const handleInputChange = (value) => {
    value.length > 3 ? setName(value) : setName("");
  };

  return (
    <div className="App">
      <SearchBar onTextChange={handleInputChange} count={count}/>
      <QueryClientProvider client={queryClient}>
        <Characterinfo name={name} setCount={setCount} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
