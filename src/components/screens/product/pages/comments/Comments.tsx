import { FunctionComponent, useEffect, useRef, useState } from "react"
import classes from "./Comments.module.css"
import { IAuth, IProduct } from "@/redux/model"
import { useSelector } from "react-redux"
import { Timestamp, doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/services/firebase/firebase"
import { useRouter } from "next/router"
import useProduct from "../../hooks/useProduct"
import CustomInput from "@/components/elements/customInput/CustomInput"
import CustomButton from "@/components/elements/customButton/CustomButton"
import CustomTextArea from "@/components/elements/customTextArea/CustomTextArea"
import { Box, Rating } from "@mui/material"

interface CommentsProps {
  data: any
}

const labels: { [index: string]: string } = {
  1: "Погано",
  2: "Так собі",
  3: "Нормально",
  4: "Добре",
  5: "Чудово",
}

const Comments: FunctionComponent<CommentsProps> = ({ data }) => {
  const router = useRouter()
  const { categoryId, itemId } = router.query

  const { isLogedIn, isAdmin, email } = useSelector(
    (state: { auth: IAuth }) => state.auth
  )

  const {
    toggleWriteComment,

    comment,
    setComment,

    toggleWriteCommentHandler,

    postCommentHandler,
    deleteCommentHandler,
  } = useProduct({
    itemId: itemId as string,
    categoryId: categoryId as string,
  })

  const [commentExist, setCommentExist] = useState(false)

  useEffect(() => {
    console.log()
    if (email) {
      const comments = data.filter((item: any) => item.email === email)
      if (comments.length === 0) {
        setCommentExist(true)
      }
    }
  }, [email, data])

  return (
    <div className={classes.cart}>
      {commentExist && (
        <CustomButton
          type="button"
          handler={toggleWriteCommentHandler}
          text="Написати відгук"
          backGroundColor="#1e88e5"
          color="white"
        />
      )}
      {toggleWriteComment && (
        <form onSubmit={postCommentHandler} className={classes.box}>
          <div className={classes.title}>
            <h1>Написати відгук</h1>
          </div>
          <div className={classes.padding}>
            <h1>Оцініть товар</h1>
          </div>
          <div className={classes.rate}>
            <Rating
              name="simple-controlled"
              value={comment.rate}
              sx={{ fontSize: "40px" }}
              onChange={(event, newValue) => {
                if (newValue === null) return
                console.log(newValue)
                setComment({ ...comment, rate: newValue })
              }}
            />
            <h1>{labels[comment.rate]}</h1>
          </div>

          <div className={classes.padding}>
            <CustomInput
              type="text"
              name="Переваги"
              placeholder=""
              required={false}
              onChange={(event) =>
                setComment({ ...comment, positive: event.target.value })
              }
            />
            <CustomInput
              type="text"
              name="Недоліки"
              placeholder=""
              required={false}
              onChange={(event) =>
                setComment({ ...comment, negative: event.target.value })
              }
            />
            <CustomTextArea
              name="Коментар"
              required={true}
              onChange={(event) =>
                setComment({ ...comment, description: event.target.value })
              }
            />
          </div>
          <div className={classes.name_email}>
            <CustomInput
              type="text"
              name="Ваше ім'я та прізвище"
              placeholder=""
              required
              onChange={(event) =>
                setComment({ ...comment, name: event.target.value })
              }
            />
          </div>
          <div className={classes.button}>
            <CustomButton
              type="submit"
              text="Залишити відгук"
              backGroundColor="#1e88e5"
              color="white"
            />
          </div>
        </form>
      )}
      <div className={classes.comments}>
        {data.map((comment: any) => {
          console.log(comment)
          const inputDate = new Date(comment.date)

          const day = inputDate.getUTCDate()
          const month = inputDate.toLocaleString("default", { month: "long" })
          const year = inputDate.getUTCFullYear()

          const formattedDate = `${day} ${month} ${year}`
          return (
            <div key={comment.id} className={classes.comment}>
              <div className={classes.comment_name}>
                <div>
                  <h1>{comment.name}</h1>
                  <span>{formattedDate || ""}</span>
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
              {comment.comment && (
                <div className={classes.comment_info}>
                  <span>{comment.comment}</span>
                </div>
              )}
              {comment.positive && (
                <div className={classes.comment_info}>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Переваги:{" "}
                  </span>
                  <span>{comment.positive}</span>
                </div>
              )}
              {comment.negative && (
                <div className={classes.comment_info}>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Недоліки:
                  </span>
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
                    handler={() =>
                      deleteCommentHandler(comment.id, comment.rate)
                    }
                    text="Видалити"
                    color="red"
                    backGroundColor="white"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Comments
