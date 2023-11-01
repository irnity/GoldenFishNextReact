import { FunctionComponent, useEffect, useRef, useState } from "react"
import classes from "./Comments.module.css"
import { IProduct } from "@/redux/model"
import { useSelector } from "react-redux"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/services/firebase/firebase"
import { useRouter } from "next/router"
import useProduct from "../../hooks/useProduct"
import CustomInput from "@/components/elements/customInput/CustomInput"
import CustomButton from "@/components/elements/customButton/CustomButton"
import CustomTextArea from "@/components/elements/customTextArea/CustomTextArea"
import { Rating } from "@mui/material"

interface CommentsProps {
  data: any
}

const Comments: FunctionComponent<CommentsProps> = ({ data }) => {
  const router = useRouter()
  const { categoryId, itemId } = router.query

  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: {
        isLogedIn: boolean
        isAdmin: boolean
        userInfo: {
          email: string
        }
      }
    }) => state.auth
  )

  const {
    toggleWriteComment,

    rate,

    setRate,
    setPositive,
    setNegative,
    setComment,
    setName,

    toggleWriteCommentHandler,

    postCommentHandler,
    deleteCommentHandler,
  } = useProduct({
    itemId: itemId as string,
    categoryId: categoryId as string,
  })

  const [commentExist, setCommentExist] = useState(false)

  useEffect(() => {
    if (userInfo.email) {
      const comments = data.filter((item: any) => item.email === userInfo.email)
      if (comments.length === 0) {
        setCommentExist(true)
      }
    }
  }, [userInfo.email, data])

  return (
    <div className={classes.cart}>
      {commentExist && (
        <CustomButton
          type="button"
          handler={toggleWriteCommentHandler}
          text="Залишити Відгук"
          backGroundColor="#1e88e5"
          color="white"
        />
      )}
      {toggleWriteComment && (
        <form onSubmit={postCommentHandler} className={classes.box}>
          <CustomInput
            type="text"
            name="Ім'я"
            placeholder="Ваше ім'я"
            required
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="rate" className={classes.text}>
            Оцінка: {rate}/5
          </label>
          <input
            type="range"
            min={1}
            max={5}
            onChange={(event) => {
              setRate(+event.target.value)
            }}
            step={1}
            id="rate"
            name="rate"
          />

          <CustomInput
            type="text"
            name="Переваги"
            placeholder="Переваги"
            required={false}
            onChange={(event) => setPositive(event.target.value)}
          />

          <CustomInput
            type="text"
            name="Недоліки"
            placeholder="Недоліки"
            required={false}
            onChange={(event) => setNegative(event.target.value)}
          />

          <CustomTextArea
            name="Коментар"
            required={true}
            onChange={(event) => setComment(event.target.value)}
          />

          <CustomButton
            type="submit"
            text="Відправити"
            backGroundColor="#1e88e5"
            color="white"
          />
        </form>
      )}
      <div className={classes.comments}>
        {data.map((comment: any) => (
          <div key={comment.id} className={classes.comment}>
            <div className={classes.comment_name}>
              <h1>{comment.name}</h1>
              <span>Вігук від покупця</span>
            </div>
            <div className={classes.comment_info}>
              <Rating
                readOnly
                precision={0.5}
                value={comment.rate}
                size="small"
              />
              <p>{comment.description}</p>
            </div>
            {comment.comment && (
              <div className={classes.comment_info}>
                <span>{comment.comment}</span>
              </div>
            )}
            {comment.positive && (
              <div className={classes.comment_info}>
                <h1>Переваги</h1>
                <span>{comment.positive}</span>
              </div>
            )}
            {comment.negative && (
              <div className={classes.comment_info}>
                <h1>Недоліки</h1>
                <span>{comment.negative}</span>
              </div>
            )}

            {((isLogedIn && comment.email == auth.currentUser?.email) ||
              isAdmin) && (
              <div
                style={{
                  padding: "10px",
                }}
              >
                <CustomButton
                  type="button"
                  handler={() => deleteCommentHandler(comment.id, comment.rate)}
                  text="Видалити"
                  color="red"
                  backGroundColor="white"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
