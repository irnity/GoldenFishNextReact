import CustomInput from '@/Components/Elements/CustomInput/CustomInput'
import CustomTextArea from '@/Components/Elements/CustomTextArea/CustomTextArea'
import React from 'react'
import classes from './CommentsForm.module.css'

import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { Rating } from '@mui/material'
import useProduct from '../../Hook/useProduct'
import { useRouter } from 'next/router'

const labels: Record<string, string> = {
  1: 'Погано',
  2: 'Так собі',
  3: 'Нормально',
  4: 'Добре',
  5: 'Чудово',
}

const CommentsForm = () => {
  const router = useRouter()

  const { categoryId, itemId } = router.query

  const {
    comment,
    setComment,

    postCommentHandler,
  } = useProduct({
    productCode: itemId as string,
    productCategory: categoryId as string,
  })

  return (
    <form
      onSubmit={(e) => {
        void postCommentHandler(e)
      }}
      className={classes.box}
    >
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
          sx={{ fontSize: '40px' }}
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
          onChange={(event) => {
            setComment({ ...comment, positive: event.target.value })
          }}
        />
        <CustomInput
          type="text"
          name="Недоліки"
          placeholder=""
          required={false}
          onChange={(event) => {
            setComment({ ...comment, negative: event.target.value })
          }}
        />
        <CustomTextArea
          name="Коментар"
          required={true}
          onChange={(event) => {
            setComment({ ...comment, description: event.target.value })
          }}
        />
      </div>
      <div className={classes.name_email}>
        <CustomInput
          type="text"
          name="Ваше ім'я та прізвище"
          placeholder=""
          required
          onChange={(event) => {
            setComment({ ...comment, name: event.target.value })
          }}
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
  )
}

export default CommentsForm
