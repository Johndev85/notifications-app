//styles
import styles from "./app.module.css"

//libraries
import { StrictMode, useEffect } from "react"
import { useState } from "react"
import { postData } from "../data"
import { io, Socket } from "socket.io-client"

//components
import NavBar from "../components/NavBar/NavBar"
import Card from "../components/Card/Card"

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [user, setUser] = useState<string>("")
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    setSocket(io("https://notification-socket.onrender.com/"))
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])

  const handleLogin = () => {
    setUser(username)
  }

  console.log(user)

  return (
    <StrictMode>
      <main className={styles.container}>
        {user ? (
          <>
            <NavBar socket={socket} />
            {postData.map((post) => (
              <Card key={post.id} post={post} socket={socket} user={user} />
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
