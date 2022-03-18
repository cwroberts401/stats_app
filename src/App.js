import { useState } from 'react';
import './App.css';



function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState("Press Start to Begin");
  const [question, setQuestion] = useState(0);
  const [right, setRight] = useState(0);
  const [team, setTeam] = useState("");

  const initialFormState = {
    team: ''
  };

  const [formData, setFormData] = useState({...initialFormState})

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name] : target.value
    });
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }



  async function fetchJson(url) {

      const response = await fetch(url);
      console.log('response'+ response.status)
  
      if (response.status === 204) {
        return null;
      }
  
      const payload = await response.json();
      console.log("payload" + payload.first_name)
  

      return payload;
    
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setQuestion(question+1)
    if (team && formData.team.toLowerCase() === team.toLowerCase()){
      alert('right!')
      setRight(right +1)
    }
    console.log(formData.team, '=', team)
    const url = new URL(`https://www.balldontlie.io/api/v1/players/${getRandomInt(1, 500)}`)
    let result = await fetchJson(url)
    setTeam(result.team.name)
    setName(`${result.first_name} ${result.last_name}`)
    //console.log(searchResults)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData.team} onChange={handleChange}/>
        <input type="submit" value="Start" />
      </form>
      <p> {name} </p> 

      <p> {right}/{question} </p>
    </div>
  );
}

export default App;
