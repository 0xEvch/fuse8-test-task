import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Characterinfo from "./components/CharacterInfo.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [name, setName] = useState("");

  const handleInputChange = (value) => {
    setName(value); 
  };

  return (
    <div className="App">
      <SearchBar onTextChange={handleInputChange} />
      <QueryClientProvider client={queryClient}>
        <Characterinfo name={name} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
