//styles
import styles from "./navBar.module.css"

//libraries
import { Icon } from "@iconify/react"

const NavBar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>Chat App</span>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <Icon icon="iconamoon:notification-fill" />
          <div className={styles.counter}>2</div>
        </div>
        <div className={styles.icon}>
          <Icon icon="ooui:message" />
          <div className={styles.counter}>2</div>
        </div>
        <div className={styles.icon}>
          <Icon icon="ic:round-settings" />
          <div className={styles.counter}>2</div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
