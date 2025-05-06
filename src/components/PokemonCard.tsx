import { useState, useEffect } from "react";
import { getRandomPokemon, Pokemon } from "../data/pokeApi";

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Función para cargar un nuevo Pokémon cuando el usuario acierta
  const fetchNewPokemon = () => {
    getRandomPokemon().then(setPokemon);
    setUserGuess(""); // Limpiar el campo de entrada
    setIsCorrect(null); // Resetear estado de respuesta
  };

  useEffect(() => {
    fetchNewPokemon();
  }, []);

  const handleGuess = () => {
    if (pokemon) {
      if (userGuess.toLowerCase() === pokemon.name.toLowerCase()) {
        setIsCorrect(true);
        setTimeout(fetchNewPokemon, 2000); // Espera 2 segundos antes de cambiar de Pokémon
      } else {
        setIsCorrect(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white text-center rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">¿Quién es este Pokémon?</h2>
      {pokemon && (
        <>
          <img
            src={pokemon.image}
            alt="Silueta del Pokémon"
            className={`w-48 h-48 mx-auto transition-all duration-500 ${
              isCorrect ? "filter-none" : "filter brightness-0"
            }`}
          />
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="mt-4 p-2 text-black rounded"
          />
          <button
            onClick={handleGuess}
            className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          >
            Adivinar
          </button>
          {isCorrect !== null && (
            <p className="mt-4 text-lg font-bold">
              {isCorrect ? "¡Correcto! 🎉" : "¡Inténtalo de nuevo! ❌"}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonCard;