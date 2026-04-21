/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58
        const sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL TOP ====================*/
function scrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top')
    if (window.scrollY >= 400) {
        scrollTopBtn.classList.add('scrolltop--show')
    } else {
        scrollTopBtn.classList.remove('scrolltop--show')
    }
}
window.addEventListener('scroll', scrollTop)

/*================ DARK LIGHT THEME ================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*================ INTERACTIVE PARTICLE NETWORK ================*/
;(function() {
    const canvas = document.getElementById('network-canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width, height, particles, mouse, animId

    mouse = { x: -9999, y: -9999 }

    function resize() {
        width = canvas.width = canvas.offsetWidth
        height = canvas.height = canvas.offsetHeight
    }

    function createParticles() {
        const count = Math.floor((width * height) / 12000)
        particles = []
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.5
            })
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height)

        const connectionDist = 120
        const mouseDist = 180

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]

            p.x += p.vx
            p.y += p.vy

            if (p.x < 0 || p.x > width) p.vx *= -1
            if (p.y < 0 || p.y > height) p.vy *= -1

            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < mouseDist) {
                const force = (mouseDist - dist) / mouseDist
                p.vx += dx * force * 0.002
                p.vy += dy * force * 0.002
            }

            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
            if (speed > 1.5) {
                p.vx *= 0.98
                p.vy *= 0.98
            }

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(77, 157, 224, 0.5)'
            ctx.fill()

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j]
                const ddx = p.x - p2.x
                const ddy = p.y - p2.y
                const d = Math.sqrt(ddx * ddx + ddy * ddy)

                if (d < connectionDist) {
                    const alpha = (1 - d / connectionDist) * 0.15
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(p2.x, p2.y)
                    ctx.strokeStyle = `rgba(77, 157, 224, ${alpha})`
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                }
            }
        }

        animId = requestAnimationFrame(draw)
    }

    function init() {
        resize()
        createParticles()
        draw()
    }

    const homeSection = document.getElementById('home')
    homeSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = e.clientX - rect.left
        mouse.y = e.clientY - rect.top
    })
    homeSection.addEventListener('mouseleave', () => {
        mouse.x = -9999
        mouse.y = -9999
    })

    let resizeTimeout
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
            cancelAnimationFrame(animId)
            init()
        }, 200)
    })

    init()
})()

/*================ TYPING EFFECT ================*/
const typedElement = document.getElementById('typed-text')
const commands = [
    'aws eks get-token --cluster production',
    'terraform apply -auto-approve',
    'kubectl get pods --all-namespaces',
    'docker build -t app:latest .',
    'gh workflow run deploy.yml',
    'ansible-playbook site.yml'
]

let commandIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
    const currentCommand = commands[commandIndex]

    if (!isDeleting) {
        typedElement.textContent = currentCommand.substring(0, charIndex + 1)
        charIndex++

        if (charIndex === currentCommand.length) {
            isDeleting = true
            setTimeout(typeEffect, 2000)
            return
        }
        setTimeout(typeEffect, 50 + Math.random() * 30)
    } else {
        typedElement.textContent = currentCommand.substring(0, charIndex - 1)
        charIndex--

        if (charIndex === 0) {
            isDeleting = false
            commandIndex = (commandIndex + 1) % commands.length
            setTimeout(typeEffect, 500)
            return
        }
        setTimeout(typeEffect, 25)
    }
}

setTimeout(typeEffect, 1000)

/*===== EMAILJS CONTACT FORM =====*/
emailjs.init('afBZWFNV6_OUuFbVh')

const contactForm = document.getElementById('contact-form')
const contactBtn = document.getElementById('contact-btn')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    contactBtn.textContent = 'Sending...'
    contactBtn.disabled = true

    const templateParams = {
        name: contactForm.from_name.value,
        email: contactForm.from_email.value,
        message: contactForm.message.value,
        time: new Date().toLocaleString()
    }

    emailjs.send('service_9w9o86s', 'template_083w1iu', templateParams)
        .then(() => {
            contactBtn.textContent = 'Sent!'
            contactForm.reset()
            setTimeout(() => {
                contactBtn.textContent = 'Send Message'
                contactBtn.disabled = false
            }, 3000)
        })
        .catch(() => {
            contactBtn.textContent = 'Error, try again'
            contactBtn.disabled = false
        })
})

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 1500,
    delay: 100,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
})

sr.reveal('.home__label', { origin: 'left', delay: 200, distance: '20px' })
sr.reveal('.home__description', { delay: 800 })
sr.reveal('.home__actions', { delay: 1000 })
sr.reveal('.home__aside', { origin: 'right', delay: 600, distance: '60px' })
sr.reveal('.about__data', {})
sr.reveal('.about__info-item', { interval: 150 })
sr.reveal('.skills__group', { interval: 200 })
sr.reveal('.skills__data', { interval: 100 })
sr.reveal('.skills__cert-tag', { interval: 80 })
sr.reveal('.timeline__item', { interval: 150 })
sr.reveal('.cases__item', { interval: 200 })
sr.reveal('.expertise__item', { interval: 150 })
sr.reveal('.contact__info-item', { interval: 150 })
sr.reveal('.contact__form', { origin: 'right' })
