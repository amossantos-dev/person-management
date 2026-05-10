import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { login } from '@/api/persons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

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
      navigate('/persons')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Credenciais inválidas.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm">
        <div className="mb-7 text-center">
          <h1 className="text-xl font-semibold text-foreground">Entrar</h1>
          <p className="text-sm text-muted-foreground mt-1">Continue no Gerenciador de Pessoas</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username" className="text-sm">Usuário</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="admin"
              className="h-9 text-sm"
            />
            {errors.username && <span className="text-xs text-destructive">{errors.username}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-sm">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••"
              className="h-9 text-sm"
            />
            {errors.password && <span className="text-xs text-destructive">{errors.password}</span>}
          </div>

          <Button type="submit" className="w-full mt-1" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Entrando...' : 'Continuar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
