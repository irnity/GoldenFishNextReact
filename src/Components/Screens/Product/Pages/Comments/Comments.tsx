import React, { type FunctionComponent, useEffect, useState } from 'react'
import classes from './Comments.module.css'
import { type IAuth } from '@/Redux/model'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import useProduct from '../../Hook/useProduct'

import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import CommentsForm from '../../Components/CommentsForm/CommentsForm'
import CommentsList from '../../Components/CommentsList/CommentsList'
import colors from '@/Assets/Styles/colors'

interface CommentsProps {
  data: any
}

const Comments: FunctionComponent<CommentsProps> = ({ data }) => {
  const router = useRouter()
  const { categoryId, itemId } = router.query

  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const {
    toggleWriteComment,

    toggleWriteCommentHandler,
  } = useProduct({
    productCode: itemId as string,
    productCategory: categoryId as string,
  })

  const [commentExist, setCommentExist] = useState(false)

  useEffect(() => {
    if (authReduxState.email !== undefined) {
      const comments = data.filter(
        (item: any) => item.email === authReduxState.email
      )
      if (comments.length === 0) {
        setCommentExist(true)
      }
    }
  }, [authReduxState.email, data])

  return (
    <div className={classes.cart}>
      {commentExist && (
        <CustomButton
          type="button"
          handler={toggleWriteCommentHandler}
          text="Написати відгук"
          backGroundColor={colors.Main_Blue_Color}
          color={colors.Main_White_Color}
        />
      )}
      {toggleWriteComment && <CommentsForm />}
      <CommentsList data={data} />
    </div>
  )
}

export default Comments
