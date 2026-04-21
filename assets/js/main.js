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

sr.reveal('.home__terminal', { origin: 'top', delay: 300 })
sr.reveal('.home__title, .home__subtitle, .home__description', { interval: 100, delay: 600 })
sr.reveal('.home__buttons', { delay: 900 })
sr.reveal('.home__social', { delay: 1100 })
sr.reveal('.about__data', {})
sr.reveal('.about__info-item', { interval: 150 })
sr.reveal('.skills__group', { interval: 200 })
sr.reveal('.skills__data', { interval: 100 })
sr.reveal('.skills__cert-tag', { interval: 80 })
sr.reveal('.experience__item', { interval: 150 })
sr.reveal('.cases__item', { interval: 200 })
sr.reveal('.expertise__item', { interval: 150 })
sr.reveal('.contact__info-item', { interval: 150 })
sr.reveal('.contact__form', { origin: 'right' })
