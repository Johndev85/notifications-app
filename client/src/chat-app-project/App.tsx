//styles
import styles from "./app.module.css"
import { StrictMode } from "react"

//libraries
import { useState } from "react"
import { postData } from "../data"

//components
import NavBar from "../components/NavBar/NavBar"
import Card from "../components/Card/Card"

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [user, setUser] = useState<string>("")

  const handleLogin = () => {
    setUser(username)
  }

  console.log(user)

  return (
    <StrictMode>
      <main className={styles.container}>
        {user ? (
          <>
            <NavBar />
            {postData.map((post) => (
              <Card key={post.id} post={post} />
            ))}
            <span className={styles.username}>{user}</span>
          </>
        ) : (
          <div className={styles.login}>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </main>
    </StrictMode>
  )
}

export default App
