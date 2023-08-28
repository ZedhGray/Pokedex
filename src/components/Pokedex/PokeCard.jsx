import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import './PokeCard.css'
import { useNavigate } from 'react-router-dom'

const PokeCard = ({ url }) => {
  const [pokemon, getPokemonById] = useFetch(url)

  useEffect(() => {
    getPokemonById()
  }, [])

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/pokedex/${pokemon.name}`)
  }
  return (
    <article
      className={`pokecard ${pokemon?.types[0].type.name}`}
      onClick={handleNavigate}
    >
      <header className={`pokecard__header bg-${pokemon?.types[0].type.name}`}>
        <img
          className="pokecard__img"
          src={pokemon?.sprites.other['official-artwork'].front_default}
          alt="poke__img"
        />
      </header>
      <section className="pokecard__body">
        <h3 className="pokecard__name">{pokemon?.name}</h3>
        {
          <ul className="pokename__types">
            {pokemon?.types.length === 1 ? (
              <li
                className={`pokename__types-item c-${pokemon?.types[0].type.name}`}
              >
                {pokemon?.types[0].type.name}
              </li>
            ) : (
              <>
                <li
                  className={`pokename__types-item c-${pokemon?.types[0].type.name}`}
                >
                  {pokemon?.types[0].type.name}
                </li>
                <li
                  className={`pokename__types-item c-${pokemon?.types[1].type.name}`}
                >
                  {pokemon?.types[1].type.name}
                </li>
              </>
            )}
          </ul>
        }
      </section>
      <footer className="pokecard__footer">
        <ul className="pokecard__stats">
          {pokemon?.stats.map((statInfo) => (
            <li className="pokecard__stats-item" key={statInfo.stat.url}>
              <span className="pokecard__stats-label">
                {statInfo.stat.name}:
              </span>
              <span className="pokecard__stats-value">
                {statInfo.base_stat}
              </span>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  )
}

export default PokeCard
