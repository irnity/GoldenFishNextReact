import { useState } from "react"

const useApi = () => {
  const addFavoriteProduct = async (id: string, email: string) => {
    try {
      const responce = await fetch("/api/favoriteproduct", {
        method: "POST",
        body: JSON.stringify({
          id,
          email,
        }),
      })
      console.log(responce)
    } catch (error) {
      console.log(error)
    }
  }

  return { addFavoriteProduct }
}

export default useApi
