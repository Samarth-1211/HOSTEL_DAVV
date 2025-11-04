// Particle Animation
class ParticleAnimation {
  constructor() {
    this.canvas = document.getElementById("particlesCanvas")
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.mouseX = window.innerWidth / 2
    this.mouseY = window.innerHeight / 2

    this.resizeCanvas()
    this.createParticles()
    this.animate()

    window.addEventListener("resize", () => this.resizeCanvas())
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    })
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    const particleCount = Math.min(100, Math.max(50, (window.innerWidth * window.innerHeight) / 15000))
    this.particles = []

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = "rgba(0, 188, 212, 0.8)"

    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1
      }

      const dx = particle.x - this.mouseX
      const dy = particle.y - this.mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        particle.opacity = Math.min(particle.opacity + 0.05, 1)
      } else {
        particle.opacity = Math.max(particle.opacity - 0.02, 0.2)
      }

      this.ctx.globalAlpha = particle.opacity
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      this.ctx.fill()

      if (distance < 150) {
        this.ctx.strokeStyle = `rgba(0, 188, 212, ${0.3 * (1 - distance / 150)})`
        this.ctx.lineWidth = 0.5
        this.ctx.beginPath()
        this.ctx.moveTo(particle.x, particle.y)
        this.ctx.lineTo(this.mouseX, this.mouseY)
        this.ctx.stroke()
      }
    })

    this.ctx.globalAlpha = 1
    requestAnimationFrame(() => this.animate())
  }
}

// Initialize particles
window.addEventListener("load", () => {
  new ParticleAnimation()
})

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scroll-animate")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Apply observer to feature cards, testimonials, and other elements
document.querySelectorAll(".feature-card, .testimonial-card, .contact-form").forEach((el) => {
  observer.observe(el)
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })
})

// Form handling
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for reaching out! We will get back to you soon.")
    contactForm.reset()
  })
}

// Add animation delay to elements on load
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".feature-card, .testimonial-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })
})
