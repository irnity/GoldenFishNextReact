import { FunctionComponent, useRef, useState } from "react"
import classes from "./Comments.module.css"
import { IProduct } from "@/redux/model"
import { useSelector } from "react-redux"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/services/firebase/firebase"
import LinkProductButton from "@/components/linkProductButton/LinkProductButton"
import { useRouter } from "next/router"

interface CommentsProps {
  data: any
}

const Comments: FunctionComponent<CommentsProps> = ({ data }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const [rate, setRate] = useState(0)
  const positiveRef = useRef<HTMLTextAreaElement>(null)
  const negativeRef = useRef<HTMLTextAreaElement>(null)
  const commentRef = useRef<HTMLTextAreaElement>(null)

  const rateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(+event.target.value)
  }
  const router = useRouter()
  const { categoryId, itemId } = router.query

  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: { isLogedIn: boolean; isAdmin: boolean; userInfo: string }
    }) => state.auth
  )

  const postCommentHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = {
      name: nameRef.current?.value,
      email: auth.currentUser?.email,
      rate: rate,
      positive: positiveRef.current?.value,
      negative: negativeRef.current?.value,
      comment: commentRef.current?.value,
      categoryId,
      itemId,
    }

    const responce = await fetch("/api/newcomment", {
      method: "POST",
      body: JSON.stringify(data),
    })

    const result = await responce.json()

    router.reload()
  }

  const [toggleWriteComment, setToggleWriteComment] = useState(false)

  const toggleWriteCommentHandler = () => {
    if (isLogedIn === false) {
      router.push("/login")
    } else {
      setToggleWriteComment((prevState) => !prevState)
    }
  }
  const deleteCommentHandler = async (id: string) => {
    const data = {
      id: id,
      categoryId: categoryId,
      itemId: itemId,
    }
    const responce = await fetch("/api/newcomment", {
      method: "PUT",
      body: JSON.stringify(data),
    })

    console.log(await responce.json())

    router.reload()
  }
  console.log(auth.currentUser?.email)

  return (
    <div className={classes.cart}>
      {data.some(
        (comment: any) => comment.email === auth.currentUser?.email
      ) === false ? (
        <div className={classes.toggle}>
          <LinkProductButton
            button={toggleWriteCommentHandler}
            text="Залишити Відгук"
          />
        </div>
      ) : null}
      <form onSubmit={postCommentHandler} className={classes.box}>
        {toggleWriteComment &&
          data.some(
            (comment: any) => comment.email === auth.currentUser?.email
          ) === false && (
            <div className={classes.create_comment}>
              <div>
                <label htmlFor="name">Ваше ім&apos;я та прізвище</label>
                <input type="text" id="name" ref={nameRef} />
              </div>

              <div>
                <label htmlFor="rate">Оцінка {rate}/5</label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={rate}
                  onChange={rateHandler}
                  step={1}
                  id="rate"
                  name="rate"
                />
              </div>
              <div>
                <label htmlFor="positive">Переваги</label>
                <textarea id="positive" rows={3} ref={positiveRef} />
              </div>
              <div>
                <label htmlFor="negative">Недоліки</label>
                <textarea id="negative" rows={3} ref={negativeRef} />
              </div>
              <div>
                <label htmlFor="comment">Коментар</label>
                <textarea id="comment" rows={8} ref={commentRef} />
              </div>
              <button type="submit">Залишити Відгук</button>
            </div>
          )}
      </form>
      <div className={classes.comments}>
        {data.map((comment: any) => (
          <div key={comment.id} className={classes.comment}>
            <div className={classes.comment_name}>
              <h3>{comment.name}</h3>
              <span>Вігук від покупця</span>
            </div>
            <div className={classes.comment_info}>
              <div>Оцінка: {comment.rate}/5</div>
              <p>{comment.description}</p>
            </div>
            {comment.positive && (
              <>
                <div className={classes.comment_info}>
                  <h3>Переваги</h3>
                  <p>{comment.positive}</p>
                </div>
              </>
            )}
            {comment.negative && (
              <>
                <div className={classes.comment_info}>
                  <h3>Недоліки</h3>
                  <p>{comment.negative}</p>
                </div>
              </>
            )}

            {((isLogedIn && comment.email == auth.currentUser?.email) ||
              isAdmin) && (
              <div className={classes.comment_info}>
                <button onClick={() => deleteCommentHandler(comment.id)}>
                  Видалити
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
