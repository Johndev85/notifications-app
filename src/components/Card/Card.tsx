//styles
import styles from "./card.module.css"

//libraries
import { Icon } from "@iconify/react"

//types
import type { Post } from "../../../types"
import { useState } from "react"
import type { Socket } from "socket.io-client"

interface CardProps {
  post: Post
  socket: Socket | null
  user: string
}

const Card: React.FC<CardProps> = ({ post, socket, user }) => {
  const [like, setLiked] = useState<boolean>(false)

  const handleNotification = (type: number) => {
    type === 1 && setLiked(true)
    socket?.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <img
          className={styles.userImg}
          src={post.userImg}
          loading="lazy"
          alt={post.username}
        />
        <span className={styles.fullname}>{post.fullname}</span>
      </div>
      <img
        className={styles.postImg}
        src={post.postImg}
        loading="lazy"
        alt="post image"
      />
      <div className={styles.interaction}>
        {like ? (
          <Icon icon="mdi:heart" className={styles.cardIcon} />
        ) : (
          <Icon
            icon="ph:heart"
            className={styles.cardIcon}
            onClick={() => handleNotification(1)}
          />
        )}

        <Icon icon="iconamoon:comment-light" className={styles.cardIcon} />
        <Icon
          icon="solar:share-outline"
          className={styles.cardIcon}
          onClick={() => handleNotification(3)}
        />
        <Icon
          icon="material-symbols:info-outline"
          className={styles.infoIcon}
        />
      </div>
    </div>
  )
}

export default Card
