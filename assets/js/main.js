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
        const sectionTop = current.offsetTop - 50
        const sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

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
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
})

sr.reveal('.home__data, .about__subtitle, .about__text', {})
sr.reveal('.home__social, .about__info', { delay: 400 })
sr.reveal('.home__social-icon', { interval: 200 })
sr.reveal('.skills__data, .experience__item, .contact__info-item, .contact__input', { interval: 200 })
sr.reveal('.skills__cert-tag', { interval: 100 })
sr.reveal('.cases__item', { interval: 200 })
sr.reveal('.blog__item', { interval: 200 })
