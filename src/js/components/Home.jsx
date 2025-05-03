import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
const [character, setCharacter] = useState([])
const [location, setLocation] = useState([])
const [episodes, setEpisode] = useState([])
const [combinedData, mergedData] = useState([]); 


//Fetch API Data for Rick and Morti
/*
useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character')
		.then(response =>  {
			if (!response.ok) {
				throw new Error ('Error fetching info');
			} 
			return response.json();
		})
		.then(data => { 
			console.log(data.results),
			setCharacter(data.results)
		})
		.catch(error => console.log(error))
		

'
	}, [])
	*/

const fetchData = async () => {
	const urls = ["https://rickandmortyapi.com/api/character",
					"https://rickandmortyapi.com/api/location",
					"https://rickandmortyapi.com/api/episode"
				]
	try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));

		console.log(data) 
		setCharacter(data[0].results)
		setLocation(data[1].results)
		setEpisode(data[2].results)
		mergedData(data[0].results);
	}
			catch (error) {
				console.error('Error fetching data:', error)
			}
		}
	
useEffect(() => {
	fetchData()

}, [])

	return (
		<div className="container" >
		<h1 className="center-text">Rick and Morty Characters</h1>
		<ul>
                {combinedData.map(character => (
				<div key={character.id}>
					<img src={character.image}></img>
                    <h1>Name:{character.name}</h1>
					<h2>Species:{character.species}</h2>
					<h2>Current Location:{character.location?.name}</h2>
					<h2>Origin: {character.origin?.name}</h2>
				</div>
                ))
				}
				</ul>	
		</div>
	);
};

export default Home;