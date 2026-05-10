import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

const options: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 },
    },
  },
  particles: {
    color: { value: '#ffffff' },
    links: {
      color: '#7c3aed',
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      outModes: { default: 'bounce' },
    },
    number: { value: 60 },
    opacity: { value: { min: 0.3, max: 0.6 } },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true,
}

export function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  if (!engineReady) return null

  return (
    <Particles
      id="tsparticles"
      options={options}
      particlesLoaded={particlesLoaded}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
