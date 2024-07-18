/* eslint-disable react-hooks/exhaustive-deps */
'use client'


import { useEffect, useState } from "react"
type Props = {}

const AuthCallbackPage = (props: Props) => {
  // Receive something or not from localstorage
  const [configId, setConfigId] = useState<string | null>(null)
  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId')
    if (configurationId) setConfigId(configId)
  }, [])

  return (
    <div>page</div>
  )
}

export default AuthCallbackPage