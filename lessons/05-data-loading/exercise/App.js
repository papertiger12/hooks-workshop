import React, { useState, useEffect } from "react"

import { onAuthStateChanged } from "app/utils"
import LoggedIn from "app/LoggedIn"
import LoggedOut from "app/LoggedOut"
import { create } from "domain"

const usePromise = (createPromise, deps) => {
  useEffect(() => {
    const promise = createPromise()
  }, [createPromise])
}

const useAuth = () => {
  const [authAttempted, setAuthAttempted] = useState(false)
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(login => {
      setAuthAttempted(true)
      setAuth(login)
    })
    return unsubAuth
  }, [])

  return { authAttempted, auth }
}

export default function App() {
  const { authAttempted, auth } = useAuth()

  if (!authAttempted) {
    return <p>Authenticating...</p>
  }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
