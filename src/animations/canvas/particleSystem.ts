// animations/canvas/particleSystem.ts

export interface ParticleConfig {
  count: number
  color: string
  secondaryColor?: string
  minSize: number
  maxSize: number
  speed: number
  opacity: number
  type: "dust" | "spark" | "star" | "petal" | "heart"
  gravity?: number
  wind?: number
}

export const PARTICLE_PRESETS: Record<string, ParticleConfig> = {
  candleDust: {
    count: 40,
    color: "#FFD066",
    secondaryColor: "#C9A84C",
    minSize: 1,
    maxSize: 3,
    speed: 0.3,
    opacity: 0.6,
    type: "dust",
    gravity: -0.02,
    wind: 0.1,
  },
  starField: {
    count: 200,
    color: "#F8F4FF",
    secondaryColor: "#C8BBFF",
    minSize: 1,
    maxSize: 2,
    speed: 0,
    opacity: 0.8,
    type: "star",
    gravity: 0,
  },
  goldSparks: {
    count: 80,
    color: "#FFD700",
    minSize: 2,
    maxSize: 5,
    speed: 1.5,
    opacity: 0.9,
    type: "spark",
    gravity: 0.05,
  },
  petals: {
    count: 25,
    color: "#C4798A",
    secondaryColor: "#F5B8C4",
    minSize: 6,
    maxSize: 12,
    speed: 0.4,
    opacity: 0.7,
    type: "petal",
    gravity: 0.03,
    wind: 0.2,
  },
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
  angle: number
  angularVelocity: number
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private config: ParticleConfig
  private animFrame: number = 0
  private isRunning = false

  constructor(canvas: HTMLCanvasElement, config: ParticleConfig) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.config = config
    this.init()
  }

  private init(): void {
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(this.createParticle(true))
    }
  }

  private createParticle(randomY = false): Particle {
    const { color, secondaryColor, minSize, maxSize, speed, opacity } = this.config
    const useSecondary = secondaryColor && Math.random() > 0.5
    const maxLife = 120 + Math.random() * 180

    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : this.canvas.height + 10,
      vx: (Math.random() - 0.5) * speed + (this.config.wind ?? 0),
      vy: -Math.random() * speed - 0.2,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: opacity * (0.5 + Math.random() * 0.5),
      color: useSecondary ? secondaryColor! : color,
      life: randomY ? Math.random() * maxLife : 0,
      maxLife,
      angle: Math.random() * Math.PI * 2,
      angularVelocity: (Math.random() - 0.5) * 0.02,
    }
  }

  private drawParticle(p: Particle): void {
    const fadeIn = Math.min(1, p.life / 30)
    const fadeOut = Math.min(1, (p.maxLife - p.life) / 40)
    const alpha = p.opacity * fadeIn * fadeOut

    this.ctx.save()
    this.ctx.globalAlpha = alpha
    this.ctx.translate(p.x, p.y)
    this.ctx.rotate(p.angle)

    switch (this.config.type) {
      case "dust":
      case "star":
        this.ctx.fillStyle = p.color
        this.ctx.beginPath()
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2)
        this.ctx.fill()
        // Glow
        this.ctx.shadowColor = p.color
        this.ctx.shadowBlur = p.size * 3
        this.ctx.fill()
        break

      case "spark":
        this.ctx.strokeStyle = p.color
        this.ctx.lineWidth = p.size * 0.5
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(0, -p.size * 3)
        this.ctx.stroke()
        break

      case "petal":
        this.ctx.fillStyle = p.color
        this.ctx.beginPath()
        this.ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2)
        this.ctx.fill()
        break

      case "heart":
        this.drawHeart(p.size)
        break
    }

    this.ctx.restore()
  }

  private drawHeart(size: number): void {
    const s = size * 0.5
    this.ctx.beginPath()
    this.ctx.moveTo(0, s * 0.5)
    this.ctx.bezierCurveTo(0, -s * 0.5, s * 1.5, -s * 0.5, s * 1.5, s * 0.5)
    this.ctx.bezierCurveTo(s * 1.5, s * 1.5, 0, s * 2, 0, s * 2.5)
    this.ctx.bezierCurveTo(0, s * 2, -s * 1.5, s * 1.5, -s * 1.5, s * 0.5)
    this.ctx.bezierCurveTo(-s * 1.5, -s * 0.5, 0, -s * 0.5, 0, s * 0.5)
    this.ctx.fillStyle = this.config.color
    this.ctx.fill()
  }

  update(): void {
    const { gravity = 0 } = this.config
    this.particles = this.particles.map((p) => {
      const updated = {
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + gravity,
        life: p.life + 1,
        angle: p.angle + p.angularVelocity,
      }
      if (updated.life >= updated.maxLife) {
        return this.createParticle()
      }
      return updated
    })
  }

  render(): void {
    this.particles.forEach((p) => this.drawParticle(p))
  }

  start(): void {
    if (this.isRunning) return
    this.isRunning = true

    const loop = () => {
      if (!this.isRunning) return
      this.update()
      this.render()
      this.animFrame = requestAnimationFrame(loop)
    }

    loop()
  }

  stop(): void {
    this.isRunning = false
    cancelAnimationFrame(this.animFrame)
  }

  updateConfig(newConfig: Partial<ParticleConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  resize(width: number, height: number): void {
    this.canvas.width = width
    this.canvas.height = height
    this.init()
  }
}
