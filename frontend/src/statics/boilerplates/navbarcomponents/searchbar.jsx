import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./searchbar.css"

export default function SearchBar() {
  const [input, setInput] = useState("")

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())  
      .then((json) =>{
        const results = json.filter((user) => {
          return (
            value && 
            user && 
            user.name.toLowerCase().includes(value)
          );

        });
        setResults(results);
      });
  }

  const handleChange = (value) =>{
    setInput(value)
    fetchData(value)
  }

  return(
    <>
      <div className="input-wrapper">
        <SearchIcon id="search-icon"/>
        <input type="Type to Search..." id="text-input" value={input} onChange={(e) => handleChange(e.target.value)}/>
      </div>
    </>
  );
}