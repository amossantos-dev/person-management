import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ParticlesBackground } from '@/components/animations/ParticlesBackground'
import { useLoginForm } from '@/hooks/useLoginForm'

function inputStyle(focused: boolean) {
  return {
    borderColor: focused ? 'rgba(124,58,237,0.8)' : 'rgba(255,255,255,0.1)',
    transition: 'border-color 0.2s ease',
    boxShadow: focused ? '0 0 0 1px rgba(124,58,237,0.3)' : 'none',
  }
}

function labelStyle(focused: boolean, hasValue: boolean) {
  return {
    transform: focused || hasValue ? 'translateY(-2px)' : 'none',
    color: focused ? 'rgba(124,58,237,0.9)' : undefined,
    transition: 'all 0.2s ease',
  }
}

export function LoginPage() {
  const { username, setUsername, password, setPassword, errors, loading, errorBorder, focusedField, setFocusedField, controls, handleSubmit } = useLoginForm()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <ParticlesBackground />
      <motion.div
        animate={controls}
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-sm relative z-10 glass-card p-8"
        style={{ borderColor: errorBorder ? 'rgba(239,68,68,0.6)' : undefined, transition: 'border-color 0.3s ease' }}
      >
        <div className="mb-7 text-center">
          <h1 className="text-xl font-semibold text-foreground">Entrar</h1>
          <p className="text-sm text-muted-foreground mt-1">Continue no Gerenciador de Pessoas</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username" className="text-sm" style={labelStyle(focusedField === 'username', !!username)}>
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
              style={inputStyle(focusedField === 'username')}
            />
            {errors.username && <span className="text-xs text-destructive">{errors.username}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-sm" style={labelStyle(focusedField === 'password', !!password)}>
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
              style={inputStyle(focusedField === 'password')}
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
