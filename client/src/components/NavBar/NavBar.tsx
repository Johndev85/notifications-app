//styles
import styles from "./navBar.module.css"

//libraries
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"

interface NavBarProps {
  socket: Socket | null
}

interface Notification {
  senderName: string
  type: number
}

const NavBar: React.FC<NavBarProps> = ({ socket }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data])
    })
  }, [socket])

  console.log(notifications)

  const displayNotifications = ({ senderName, type }: Notification) => {
    let action

    if (type === 1) {
      action = "liked"
    } else if (type === 2) {
      action = "commented"
    } else {
      action = "shared"
    }
    return (
      <span
        className={styles.notification}
      >{`${senderName} ${action} your post`}</span>
    )
  }

  const handleRead = () => {
    setNotifications([])
    setOpen(false)
  }

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>Chat App</span>
      <div className={styles.icons}>
        <div className={styles.icon} onClick={() => setOpen(!open)}>
          <Icon icon="iconamoon:notification-fill" />
          {notifications.length > 0 && (
            <div className={styles.counter}>{notifications.length}</div>
          )}
        </div>
        <div className={styles.icon} onClick={() => setOpen(!open)}>
          <Icon icon="ooui:message" />
        </div>
        <div className={styles.icon} onClick={() => setOpen(!open)}>
          <Icon icon="ic:round-settings" />
        </div>
      </div>
      {open && (
        <div className={styles.notifications}>
          {notifications.map((n, index) => (
            <div key={index}>{displayNotifications(n)}</div>
          ))}
          <button className={styles.nBtn} onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  )
}

export default NavBar
