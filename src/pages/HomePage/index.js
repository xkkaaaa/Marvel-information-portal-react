import { useState } from 'react'
import RandomChar from '../../components/randomChar'
import CharList from '../../components/charList'
import CharInfo from '../../components/charInfo'
import decoration from '../../resources/img/vision.png'

const HomePage = () => {
  const [selectedChar, setChar] = useState(null)

  const onCharSelected = (id) => {
    setChar(id)
  }

  return (
    <div className="home-page">
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <CharInfo charId={selectedChar} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </div>
  )
}
export default HomePage
