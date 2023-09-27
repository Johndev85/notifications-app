//styles
import styles from "./card.module.css"

//libraries
import { Icon } from "@iconify/react"

//types
import type { Post } from "../../../types"
import { useState } from "react"

interface CardProps {
  post: Post
}

const Card: React.FC<CardProps> = ({ post }) => {
  const [like, setLiked] = useState<boolean>(false)

  const handleNotification = () => {
    like ? setLiked(false) : setLiked(true)
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
          <Icon
            icon="mdi:heart"
            className={styles.cardIcon}
            onClick={handleNotification}
          />
        ) : (
          <Icon
            icon="ph:heart"
            className={styles.cardIcon}
            onClick={handleNotification}
          />
        )}

        <Icon icon="iconamoon:comment-light" className={styles.cardIcon} />
        <Icon icon="solar:share-outline" className={styles.cardIcon} />
        <Icon
          icon="material-symbols:info-outline"
          className={styles.infoIcon}
        />
      </div>
    </div>
  )
}

export default Card
