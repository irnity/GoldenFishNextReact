import classes from "./Footer.module.css"

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_top}>
        <div className={classes.footer_top_block}>
          <div className={classes.footer_top_block_text}>ІНФОРМАЦІЯ</div>
          <div className={classes.footer_top_block_text}>
            <span>Акції</span>
            <span>Знижки</span>
            <span>Новинки</span>
            <span>Новини</span>
            <span>Магазин</span>
            <span>Статті та огляд</span>
            <span>Допомога</span>
            <span>Гарантія</span>
          </div>
        </div>

        <div className={classes.footer_top_block}>
          <div className={classes.footer_top_block_text}>ПРО НАС</div>
          <div className={classes.footer_top_block_text}>
            <span>Про компанію</span>
            <span>Оплата та доставка</span>
            <span>Контакти</span>
          </div>
        </div>

        <div className={classes.footer_top_block}>
          <div className={classes.footer_top_block_text}>КОНТАКТИ</div>
          <div className={classes.footer_top_block_text}>
            <span>Пн. — Пт.: с 8:00 до 17:00</span>
            <span>Сб.: с 9:00 до 17:00</span>
            <span>098800553535</span>
            <span>Безкоштовно по Україні</span>
          </div>
        </div>

        <div className={classes.footer_top_block}>
          <div className={classes.footer_top_block_text}>МИ В СОЦ.МЕРЕЖАХ</div>
          <div className={classes.footer_top_block_text}>
            <span>Viber</span>
          </div>
        </div>
      </div>

      <div className={classes.footer_bottom}>
        <span>© 2023, Інтернет-магазин «Golden Fish»</span>
      </div>
    </footer>
  )
}

export default Footer
