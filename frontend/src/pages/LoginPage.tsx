import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { motion, useAnimation } from 'framer-motion'
import { login } from '@/api/persons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ParticlesBackground } from '@/components/animations/ParticlesBackground'

export function LoginPage() {
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
      await controls.start({
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
        transition: { duration: 0.3 },
      })
      await new Promise((r) => setTimeout(r, 100))
      navigate('/persons')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Credenciais inválidas.')
      setErrorBorder(true)
      await controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
      })
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
      errorTimerRef.current = setTimeout(() => setErrorBorder(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <ParticlesBackground />

      <motion.div
        animate={controls}
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-sm relative z-10 glass-card p-8"
        style={{
          borderColor: errorBorder ? 'rgba(239,68,68,0.6)' : undefined,
          transition: 'border-color 0.3s ease',
        }}
      >
        <div className="mb-7 text-center">
          <h1 className="text-xl font-semibold text-foreground">Entrar</h1>
          <p className="text-sm text-muted-foreground mt-1">Continue no Gerenciador de Pessoas</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username" className="text-sm"
              style={{
                transform: focusedField === 'username' || username ? 'translateY(-2px)' : 'none',
                color: focusedField === 'username' ? 'rgba(124,58,237,0.9)' : undefined,
                transition: 'all 0.2s ease',
              }}
            >
              Usuário
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              autoComplete="username"
              placeholder="admin"
              className="h-9 text-sm"
              style={{
                borderColor: focusedField === 'username'
                  ? 'rgba(124,58,237,0.8)'
                  : 'rgba(255,255,255,0.1)',
                transition: 'border-color 0.2s ease',
                boxShadow: focusedField === 'username' ? '0 0 0 1px rgba(124,58,237,0.3)' : 'none',
              }}
            />
            {errors.username && <span className="text-xs text-destructive">{errors.username}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-sm"
              style={{
                transform: focusedField === 'password' || password ? 'translateY(-2px)' : 'none',
                color: focusedField === 'password' ? 'rgba(124,58,237,0.9)' : undefined,
                transition: 'all 0.2s ease',
              }}
            >
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              autoComplete="current-password"
              placeholder="••••••"
              className="h-9 text-sm"
              style={{
                borderColor: focusedField === 'password'
                  ? 'rgba(124,58,237,0.8)'
                  : 'rgba(255,255,255,0.1)',
                transition: 'border-color 0.2s ease',
                boxShadow: focusedField === 'password' ? '0 0 0 1px rgba(124,58,237,0.3)' : 'none',
              }}
            />
            {errors.password && <span className="text-xs text-destructive">{errors.password}</span>}
          </div>

          <Button type="submit" className="w-full mt-1" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Entrando...' : 'Continuar'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
