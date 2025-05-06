export interface Pokemon {
    name: string;
    image: string;
  }
  
  export async function getRandomPokemon(): Promise<Pokemon> {
    const id = Math.floor(Math.random() * 151) + 1; // Primeros 151 Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    
    return {
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
    };
  }