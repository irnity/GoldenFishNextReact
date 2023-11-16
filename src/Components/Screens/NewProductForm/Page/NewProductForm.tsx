import classes from './NewProductForm.module.css'
import React from 'react'

import useAddProductHook from '../hook/useAddProductHook'
import CustomInput from '@/components/elements/customInput/CustomInput'
import CustomButton from '@/components/elements/customButton/CustomButton'

const NewProductForm = () => {
  const {
    categoryHandler,
    titleHandler,
    producerHandler,
    imageHandler,
    descriptionHandler,
    priceHandler,
    inStockHandler,

    params,
    paramNameHandler,
    paramValueHandler,

    error,
    routerBackHandler,

    addParamHandler,
    removeLastParamHandler,

    pushProductToFirebaseHandler,
  } = useAddProductHook()

  return (
    <form
      className={classes.form}
      onSubmit={(event) => {
        void pushProductToFirebaseHandler(event)
      }}
    >
      {/* Product */}
      <CustomInput
        type="text"
        name="Категорія"
        required={true}
        placeholder="fishingrod"
        onChange={categoryHandler}
      />
      <CustomInput
        type="text"
        name="Назва"
        required={true}
        placeholder="Спінінгове вудлище"
        onChange={titleHandler}
      />
      <CustomInput
        type="text"
        name="Виробник"
        required={true}
        placeholder="Flagman"
        onChange={producerHandler}
      />
      <CustomInput
        type="file"
        name="Фото"
        required={false}
        placeholder="Фото"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file != null) {
            imageHandler(file)
          }
        }}
      />

      <CustomInput
        type="text"
        name="Опис"
        required={true}
        placeholder="Опис"
        onChange={descriptionHandler}
      />
      <div className={classes.row}>
        <CustomInput
          type="number"
          name="Ціна"
          required={true}
          placeholder="0"
          onChange={priceHandler}
        />
        <CustomInput
          type="number"
          name="Кількість"
          required={true}
          placeholder="0"
          onChange={inStockHandler}
        />
      </div>

      {/* Params */}
      <div className={classes.paramsContainer}>
        <h1>Параметри</h1>
        {params.map((param, index) => (
          <div className={classes.row} key={index}>
            <CustomInput
              type="text"
              name="Параметр"
              required={true}
              placeholder="Довжина"
              value={param.name}
              onChange={(event) => {
                paramNameHandler(event, index)
              }}
            />
            <CustomInput
              type="text"
              name="Значення"
              required={true}
              placeholder="0.5 метри"
              value={param.value}
              onChange={(event) => {
                paramValueHandler(event, index)
              }}
            />
          </div>
        ))}
        <CustomButton
          handler={addParamHandler}
          text={'Додати параметр'}
          type="button"
        />
        <CustomButton
          handler={removeLastParamHandler}
          text={'Видали параметр'}
          type="button"
        />
      </div>

      {/* Error */}
      <h1 className={classes.error}>{error}</h1>

      {/* Navigation */}
      <div className={classes.row}>
        <CustomButton
          text={'Back'}
          color={'tomato'}
          handler={routerBackHandler}
          type="button"
        />
        <CustomButton text={'Submit'} color={'green'} type="submit" />
      </div>
    </form>
  )
}

export default NewProductForm
