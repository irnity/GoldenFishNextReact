import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { warningActions } from '@/Redux/warningSlice'
import { auth } from '@/services/firebase/firebase'

const useApi = (id: string) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [productInFavorite, setProductInFavorite] = useState(false)
  const [email, setEmail] = useState<string | null | undefined>('')

  useEffect(() => {
    const email = auth.currentUser?.email
    setEmail(email)
  }, [])

  useEffect(() => {
    const checkProductInFavorite = async () => {
      if (id === '' || email === '') {
        return
      }

      try {
        const responce = await fetch('/api/favoriteproduct', {
          method: 'POST',
          body: JSON.stringify({
            id,
            email,
            action: 'Check',
          }),
        })
        const data = await responce.json()

        // dispatch(warningActions.setWarning({message: data.message, code: data.color}))
        setProductInFavorite(data.exist)
      } catch (error) {
        console.log(error)
      }
    }

    void checkProductInFavorite()
  }, [id, email, dispatch])

  const addFavoriteProduct = async () => {
    try {
      const responce = await fetch('/api/favoriteproduct', {
        method: 'POST',
        body: JSON.stringify({
          id,
          email,
          action: 'Add',
        }),
      })
      const data = await responce.json()

      dispatch(
        warningActions.setWarning({ message: data.message, code: data.status })
      )
      setProductInFavorite(data.exist)
    } catch (error: any) {
      dispatch(warningActions.setWarning(error))
    }
  }

  const removeFavoriteProduct = async () => {
    try {
      const responce = await fetch('/api/favoriteproduct', {
        method: 'POST',
        body: JSON.stringify({
          id,
          email,
          action: 'Remove',
        }),
      })
      // get response
      const data = await responce.json()

      dispatch(
        warningActions.setWarning({ message: data.message, code: data.status })
      )
      setProductInFavorite(data.exist)
    } catch (error: any) {
      dispatch(warningActions.setWarning({ message: error, code: 400 }))
    }
  }

  const productHandler = () => {
    if (email === undefined) {
      void router.push('/login')
      return
    }
    if (productInFavorite) {
      void removeFavoriteProduct()
    } else {
      void addFavoriteProduct()
    }
  }

  return { productInFavorite, productHandler }
}

export default useApi
