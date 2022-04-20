import { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import './charList.scss'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import useMarvelService from '../../services/MarvelService'

const CharList = (props) => {
  const [charList, setCharList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)

  const {loading, error, getAllCharacters} = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllCharacters(offset).then(onCharListLoaded)
  }


  const onCharListLoaded = (newCharList) => {
    let ended = false
    if (newCharList.length < 9) {
      ended = true
    }
    setCharList((charList) => [...charList, ...newCharList])
    setNewItemLoading(false)
    setOffset((offset) => offset + 9)
    setCharEnded((charEnded) => ended)
  }


  const itemsRef = useRef([])

  const focusOnItem = (id) => {
    itemsRef.current.forEach(item => item.classList.remove('char__item__selected'))
    itemsRef.current[id].classList.add('char__item__selected')
    itemsRef.current[id].focus()
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' }
      if ( item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'unset' }
      }

      return (
        <li
          className="char__item"
          key={item.id}
          tabIndex={0}
          ref={el => (itemsRef.current[i] = el)}
          onClick={() => {
            props.onCharSelected(item.id)
            focusOnItem(i)
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(item.id)
              focusOnItem(i)
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    })
    return <ul className="char__grid">{items}</ul>
  }

  const items = renderItems(charList)

  const errorMessage = error ? <Error /> : null
  const spinner = loading && !newItemLoading ? <Spinner /> : null


  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: propTypes.func.isRequired,
}

export default CharList
