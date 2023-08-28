import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
import './PokedexName.css'

const PokedexName = () => {
  const { name } = useParams()
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  const [pokemon, getPokemonByName, hasError] = useFetch(url)

  useEffect(() => {
    getPokemonByName()
  }, [name])

  console.log(pokemon)

  return (
    <div className="PokedexName">
      <div className="pokename_decoration-t">
        <img src="../public/assets/bgt.png" alt="" />
      </div>
      {hasError ? (
        <h1>The pokemon {name} doesn't exist</h1>
      ) : (
        <>
          <img
            className={`pokename__img bgn-${pokemon?.types[0].type.name}`}
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt="poke_img"
          />
          <div className="pn__container">
            <h2 className="pn__container-title">
              {pokemon?.name} No.° {pokemon?.order}
            </h2>
        <div className='pn__container-ta'>
        <h3 className="pn__title-type">Type</h3>
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
            <h3 className="pn__title-abilities">Abilities</h3>
            <ul className="pn__abilities">
              {pokemon?.abilities.map((abilityInfo) => (
                <li key={abilityInfo.ability.url}>
                  {abilityInfo.ability.name}
                </li>
              ))}
            </ul>
        </div>
            <h3 className='pokename__stats-title'>Stats</h3>
            <ul className="pokename__stats">
              {pokemon?.stats.map((statInfo) => (
                <li className="pokename__stats-item" key={statInfo.stat.url}>
                  <span className="pokename__stats-label">
                    {statInfo.stat.name}:
                  </span>
                  <span className="pokename__stats-value">
                    {statInfo.base_stat}
                  </span>
                </li>
              ))}
            </ul>
            {/**
     <h3>Movements</h3>
            <ul>
              {pokemon?.moves.map((moveInfo) => (
                <li key={moveInfo.move.url}>{moveInfo.move.name}</li>
              ))}
            </ul>
                 */}
          </div>
        </>
      )}
      <div className="pokename_decoration-b">
        <img src="../public/assets/bgb.png" alt="" />
      </div>
    </div>
  )
}

export default PokedexName
