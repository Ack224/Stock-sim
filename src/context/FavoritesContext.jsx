import React, { createContext, useState, useEffect, useContext } from 'react'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('myFavorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('myFavorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (coin) => {
    const exists = favorites.find((fav) => fav.id === coin.id)
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== coin.id))
    } else {
      setFavorites([...favorites, coin])
    }
  }

  const isFavorite = (coinId) => {
    return favorites.some((fav) => fav.id === coinId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)