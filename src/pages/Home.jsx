import { useRef } from 'react'
import { setTrainerNameG } from '../store/slices/trainerName.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const trainerNameRef = useRef()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setTrainerNameG(trainerNameRef.current.value.trim()))
    navigate('/pokedex')
  }
  return (
    <div className="Home">
      <div className="home__img">
        <img src="https://i.gifer.com/5FBP.gif" alt="poke" />
      </div>
      <h1 className="home__title">
        <img src="../public/assets/banner.png" alt="Pokedex" />
      </h1>
      <h2 className="home__subtitle">Hi Trainer!</h2>
      <p className="home__txt">
        To start in this applicätion, please, give me your trainer name.
      </p>
      <form onSubmit={handleSubmit} className="home__form">
        <input
          className="home__in"
          ref={trainerNameRef}
          type="text"
          name="trainerName"
          id="trainerName"
          placeholder="Trainer name"
        />
        <button className="home__btn">Catch them all</button>
      </form>
    </div>
  )
}

export default Home
