import { useEffect, useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useSelector } from 'react-redux'
import PokeContainer from '../components/Pokedex/PokeContainer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Pokedex = () => {
  const [selectValue, setSelectValue] = useState('all-pokemons')

  const trainerName = useSelector((states) => states.trainerName)

  let url = 'https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0'
  const [pokemons, getAllPokemons, hasError, setPokemons] = useFetch(url)
  const urlTypes = 'https://pokeapi.co/api/v2/type'
  const [types, getAllTypes] = useFetch(urlTypes)

  useEffect(() => {
    if (selectValue === 'all-pokemons') {
      getAllPokemons()
    } else {
      axios
        .get(selectValue)
        .then((res) => {
          const data = {
            results: res.data.pokemon.map((pokeInfo) => pokeInfo.pokemon),
          }
          setPokemons(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [selectValue])

  useEffect(() => {
    getAllTypes()
  }, [])

  const searchPokemon = useRef()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const inputValue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
  }
  const handleChangeType = (e) => {
    setSelectValue(e.target.value)
  }
  return (
    <div className="Pokedex">
      <div className="pokedex__container-title">
        <h2 className="pokedex__title">Pokédex</h2>
      </div>
      <h2 className="pokedex__subtitle">
        Welcome <span>{trainerName}</span>!
      </h2>
      <form onSubmit={handleSubmit} className="pokedex__form">
        <h2>Name</h2>
        <div className="pokedex__form-search">
          <input
            className="pokedex__input"
            ref={searchPokemon}
            type="text"
            placeholder="Search your pokemon"
          />
          <button className="pokedex__btn">Search</button>
        </div>
        <select onChange={handleChangeType} className="pokedex__select">
          <option value="all-pokemons">All</option>
          {types?.results.map((typeInfo) => (
            <option value={typeInfo.url} key={typeInfo.name}>
              {typeInfo.name}
            </option>
          ))}
        </select>
      </form>
      <div className="pokedex__p">
        <p className="pokedex__p-txt">
          Search for a Pokémon by its name or by using its number from the
          National Pokédex.
        </p>
      </div>
      <PokeContainer pokemons={pokemons?.results} />
    </div>
  )
}

export default Pokedex
