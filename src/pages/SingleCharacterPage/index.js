import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../../components/spinner'
import Error from '../../components/error'
import './style.scss'

const SingleCharacterPage = (props) => {
  const { characterId } = useParams()
  const [character, setCharacter] = useState(null)
  const { loading, error, getCharacter, clearError } = useMarvelService()

  useEffect(() => {
    updateCharacter()
  }, [props.characterId])

  const updateCharacter = () => {
    clearError()
    getCharacter(characterId).then(onCharacterLoaded)
  }

  const onCharacterLoaded = (character) => {
    setCharacter(character)
  }
  const errorMessage = error ? <Error /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !character) ? (
    <View character={character} />
  ) : null

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({ character }) => {
  const { name, description, thumbnail } = character
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  )
}

export default SingleCharacterPage
