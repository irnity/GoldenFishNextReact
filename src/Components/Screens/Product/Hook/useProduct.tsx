import { auth } from '@/services/firebase/firebase'
import { useRouter } from 'next/router'
import type React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface IProductReference {
  itemId: string
  categoryId: string
}

const useProduct = ({ itemId, categoryId }: IProductReference) => {
  const router = useRouter()

  const { isLogedIn } = useSelector(
    (state: { auth: { isLogedIn: boolean } }) => state.auth
  )

  const [toggleWriteComment, setToggleWriteComment] = useState(false)

  const [comment, setComment] = useState({
    rate: 3,
    positive: '',
    negative: '',
    description: '',
    name: '',
  })

  const deleteProductHandler = async () => {
    const procced = window.confirm('Are you sure?')
    if (procced) {
      const data = {
        itemId,
        categoryId,
      }

      const responce = await fetch('/api/newproduct', {
        method: 'PUT',
        body: JSON.stringify(data),
      })

      console.log(responce)
      router.back()
    }
  }

  const toggleWriteCommentHandler = () => {
    if (!isLogedIn) {
      void router.push('/login')
    } else {
      setToggleWriteComment((prevState) => !prevState)
    }
  }

  const postCommentHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = {
      name: comment.name,
      email: auth.currentUser?.email,
      rate: comment.rate,
      positive: comment.positive,
      negative: comment.negative,
      comment: comment.description,
      itemId,
    }

    const responce = await fetch('/api/newcomment', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    await responce.json()

    router.reload()
  }

  const deleteCommentHandler = async (id: string, rate: number) => {
    const data = {
      id,
      categoryId,
      itemId,
      email: auth.currentUser?.email,
      rate,
    }
    const responce = await fetch('/api/newcomment', {
      method: 'PUT',
      body: JSON.stringify(data),
    })

    console.log(await responce.json())

    router.reload()
  }
  return {
    toggleWriteComment,
    comment,
    setComment,
    postCommentHandler,

    deleteProductHandler,
    toggleWriteCommentHandler,
    deleteCommentHandler,
  }
}

export default useProduct
