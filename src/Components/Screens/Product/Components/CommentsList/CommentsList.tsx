import React from 'react'
import classes from './CommentsList.module.css'
import { Rating } from '@mui/material'
import { useSelector } from 'react-redux'
import { type IAuth } from '@/Redux/model'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { useRouter } from 'next/router'
import useProduct from '../../Hook/useProduct'
import colors from '@/Assets/Styles/colors'

interface Props {
  data: any
}

const CommentsList = ({ data }: Props) => {
  const router = useRouter()

  const { categoryId, itemId } = router.query

  const { deleteCommentHandler } = useProduct({
    productCode: itemId as string,
    productCategory: categoryId as string,
  })

  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)
  return (
    <div className={classes.comments}>
      {data.map((comment: any) => {
        const inputDate = new Date(comment.date)

        const day = inputDate.getUTCDate()
        const month = inputDate.toLocaleString('default', { month: 'long' })
        const year = inputDate.getUTCFullYear()

        const formattedDate = `${day} ${month} ${year}`
        return (
          <div key={comment.id} className={classes.comment}>
            <div className={classes.comment_name}>
              <div>
                <h1>{comment.name}</h1>
                <span>{formattedDate ?? ''}</span>
              </div>
              <span>Вігук від покупця</span>
            </div>
            <div className={classes.comment_info}>
              <Rating
                readOnly
                precision={0.5}
                value={comment.rate}
                size="medium"
              />
              <p>{comment.description}</p>
            </div>
            {comment.comment !== undefined && (
              <div className={classes.comment_info}>
                <span>{comment.comment}</span>
              </div>
            )}
            {comment.positive !== undefined && (
              <div className={classes.comment_info}>
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Переваги:{' '}
                </span>
                <span>{comment.positive}</span>
              </div>
            )}
            {comment.negative !== undefined && (
              <div className={classes.comment_info}>
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Недоліки:
                </span>
                <span>{comment.negative}</span>
              </div>
            )}

            {((authReduxState.isLogedIn &&
              comment.email === authReduxState.email) ||
              authReduxState.isAdmin) && (
              <div
                style={{
                  padding: '10px',
                }}
              >
                <CustomButton
                  type="button"
                  handler={() => {
                    void deleteCommentHandler({
                      code: comment.code,
                      category: comment.category,
                      rate: comment.rate,
                    })
                  }}
                  text="Видалити"
                  color={colors.Cancel_Red_Color}
                  backGroundColor={colors.Main_White_Color}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CommentsList
