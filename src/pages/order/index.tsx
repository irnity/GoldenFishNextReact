import { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import Order from "../../components/order/Order"
import { BasketSliceProps } from "../../store/model"
import classes from "./orderPage.module.css"

interface OrderPageProps {}

const OrderPage: FunctionComponent<OrderPageProps> = () => {
  const basket = useSelector(
    (state: { basket: BasketSliceProps }) => state.basket.basket
  )

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form className={classes.form} onSubmit={formHandler}>
      <h1>Оформлення замовлення</h1>

      <div className={classes.box}>
        <div className={classes.inputBox}>
          <div className={classes.input}>
            <label htmlFor="phone">Мобільний телефон:</label>
            <input type="number" name="phone" id="phone" />
          </div>

          <div className={classes.input}>
            <label htmlFor="name">Прізвище Ім'я</label>
            <input type="text" name="name" id="name" />
          </div>

          <fieldset className={classes.fieldset}>
            <legend>Доставка:</legend>
            {/* name should be same for radio */}
            <div>
              <input
                type="radio"
                id="novaPoshta"
                name="radio_one"
                value="novaPoshta"
              />
              <label htmlFor="novaPoshta">Нова Пошта</label>
            </div>

            <div>
              <input
                type="radio"
                id="ounCare"
                name="radio_one"
                value="ounCare"
              />
              <label htmlFor="ounCare">Самовивіз</label>
            </div>

            <div>
              <input
                type="radio"
                id="courier"
                name="radio_one"
                value="courier"
              />
              <label htmlFor="courier">Кур`єром по Києву</label>
            </div>
          </fieldset>

          <div className={classes.input}>
            <label htmlFor="region">Напишіть Область:</label>
            <input type="text" name="region" id="region" />
          </div>

          <div className={classes.input}>
            <label htmlFor="town">Напишіть місто:</label>
            <input type="text" name="town" id="town" />
          </div>

          <div className={classes.input}>
            <label htmlFor="address">Напишіть адресу достаки:</label>
            <input type="text" name="radio_two" id="address" />
          </div>

          <fieldset className={classes.fieldset}>
            <legend>Спосіб оплати:</legend>
            {/* name should be same for radio */}
            <div>
              <input type="radio" id="cash" name="radio_two" value="cash" />
              <label htmlFor="cash">Оплатиа при отриманні</label>
            </div>

            <div>
              <input type="radio" id="card" name="radio_two" value="card" />
              <label htmlFor="card">Оплата карткою</label>
            </div>

            <div>
              <input
                type="radio"
                id="sertificat"
                name="radio_two"
                value="sertificat"
              />
              <label htmlFor="sertificat">Оплата сертифіктом</label>
            </div>
          </fieldset>

          <div>
            <label>Вам зателефонувати?</label>
            <select value="none">
              <option value="" disabled selected hidden>
                Обрати
              </option>
              <option value="yes">Так</option>
              <option value="no">Ні</option>
            </select>
          </div>
          <div>
            <button type="submit">ЗАМОВЛЕННЯ ПІДТВЕРДЖУЮ</button>
          </div>
        </div>
        <div className={classes.orderBox}>
          <Order basket={basket} />
        </div>
      </div>
    </form>
  )
}

export default OrderPage
