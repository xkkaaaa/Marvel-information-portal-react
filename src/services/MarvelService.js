class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=400c99960a81a06c505cc34cbcdf002e'

  getResource = async (url) => {
    let response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`)
    }
    return await response.json()
  }

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=215&${this._apiKey}`)
  }
  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
  }
}

export default MarvelService
