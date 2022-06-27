import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/SetContent'
import './style.scss'

const SingleCharacterPage = (props) => {
  const { characterId } = useParams()
  const [character, setCharacter] = useState(null)
  const { getCharacter, clearError, process, setProcess } = useMarvelService()

  useEffect(() => {
    updateCharacter()
  }, [props.characterId])

  const updateCharacter = () => {
    clearError()
    getCharacter(characterId)
      .then(onCharacterLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onCharacterLoaded = (character) => {
    setCharacter(character)
  }

  return (
    <>
      {setContent(process,View, character)}
    </>
  )
}

const View = ({ data }) => {
  const { name, description, thumbnail } = data
  return (
    <div className="single-comic">
      <div><img src={thumbnail} alt={name} className="single-comic__char-img" /></div>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  )
}

export default SingleCharacterPage
