import { useState } from 'react'
import PokeCard from './PokeCard'
import './PokeContainer.css'

const PokeContainer = ({ pokemons }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 21

  // Calculate the total number of pages
  const totalPages = Math.ceil(pokemons?.length / itemsPerPage)

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = pokemons?.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page navigation
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  return (
    <div className="Pokecontainer">
      <p className="pc__pages">
        Page {currentPage} of {totalPages}
      </p>
      <div className="poke__c-counter">
        {currentPage > 1 && (
          <button onClick={goToPreviousPage}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={goToNextPage}>Next</button>
        )}
      </div>
      {currentItems?.map((pokemon) => (
        <PokeCard key={pokemon.url} url={pokemon.url} />
      ))}
      <p className="pc__pages">
        Page {currentPage} of {totalPages}
      </p>
      <div className="poke__c-counter">
        {currentPage > 1 && (
          <button onClick={goToPreviousPage}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={goToNextPage}>Next</button>
        )}
      </div>
    </div>
  )
}

export default PokeContainer
