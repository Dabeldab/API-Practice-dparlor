import React, {useState} from "react"

    

const PokeApi = () => {
    const [pokemonData, setPokemonData] = useState(null)
    const [pokemonName, setPokemonName] = useState("");
    const [error, setError] = useState(null);

    const capitalizeFirstLetter = (name) => {
        if (!name) return '';
        const capitalized = name.charAt(0).toUpperCase()+name.slice(1)
        return capitalized;
    }

const fetchPokemon = () => {
    if (!pokemonName.trim()) {
        setError("Please enter a Pokémon name");
        ;}


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)

        .then(response => {
            if (!response.ok){
                throw new Error(console.log("Pokemon not found"))
            }
            return response.json()
        })
        .then(data => {setPokemonData(data)
        setError(null)
        })

        .catch(error => {
            console.log(error)
            setPokemonData(null)
            setError(error.message);
        })


};

   return  ( 
         <> 
         <div className="text-center">
                        <h1>Pokemon Database</h1> <br></br>
            <input type="text" 
            value={pokemonName} 
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Enter Pokemon name"

            />
            <button onClick={fetchPokemon}>I choose you!</button><br></br>
            <h1>{error}</h1>

        {  pokemonData &&  (
                    <div>
                        <img 
                        src={pokemonData.sprites.front_default} 
                        alt={`${pokemonData.name}`}
                        />
                        <h2>{capitalizeFirstLetter(pokemonData.name)}</h2>
                        {pokemonData.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    <ul>
                        
                    </ul>
                    </div>)}
        </div>
        </>
    )
};

export default PokeApi