import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAnimation } from 'framer-motion'
import { login } from '@/api/persons'

export function useLoginForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)
  const [errorBorder, setErrorBorder] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const controls = useAnimation()
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1, filter: 'blur(0px)' })
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    }
  }, [controls])

  function validate() {
    const e: typeof errors = {}
    if (!username.trim()) e.username = 'Usuário é obrigatório'
    if (!password.trim()) e.password = 'Senha é obrigatória'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await login({ username, password })
      localStorage.setItem('token', res.data!.token)
      await controls.start({ opacity: 0, scale: 1.05, filter: 'blur(8px)', transition: { duration: 0.3 } })
      await new Promise((r) => setTimeout(r, 100))
      navigate('/persons')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Credenciais inválidas.')
      setErrorBorder(true)
      await controls.start({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } })
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
      errorTimerRef.current = setTimeout(() => setErrorBorder(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  return { username, setUsername, password, setPassword, errors, loading, errorBorder, focusedField, setFocusedField, controls, handleSubmit }
}
