// ================================
// PORTFÓLIO - JAVASCRIPT PRINCIPAL
// ================================

'use strict';

// ================================
// VARIÁVEIS GLOBAIS
// ================================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
// const contactForm = document.getElementById('contactForm'); // Removido - contato apenas por WhatsApp

// ================================
// NAVEGAÇÃO E MENU MOBILE
// ================================

/**
 * Toggle do menu mobile
 */
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Previne scroll quando menu está aberto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

/**
 * Fecha menu ao clicar em um link
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/**
 * Fecha menu ao clicar fora dele
 */
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ================================
// NAVEGAÇÃO POR SCROLL
// ================================

/**
 * Adiciona sombra na navbar ao fazer scroll
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    // Mostra/esconde botão voltar ao topo
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

/**
 * Destaca o link da seção ativa na navegação
 */
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

/**
 * Scroll suave para seções
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// BOTÃO VOLTAR AO TOPO
// ================================

/**
 * Volta ao topo da página
 */
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// ANIMAÇÕES DE SCROLL
// ================================

/**
 * Observa elementos e adiciona animação quando aparecem na tela
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adiciona classe fade-in aos elementos que devem ter animação
const animatedElements = document.querySelectorAll('.skill-card, .project-card, .stat-card, .whatsapp-card, .about-text, .hero-text, .hero-image');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ================================
// BARRAS DE PROGRESSO DAS HABILIDADES (DESATIVADO)
// ================================

// Função removida - skill cards agora não têm barras de progresso

/* 
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    
    const skillsOffsetTop = skillsSection.offsetTop;
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if (scrollY + windowHeight > skillsOffsetTop + 200) {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 100);
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);
*/

// ================================
// FORMULÁRIO DE CONTATO (DESATIVADO)
// ================================

// Formulário removido - contato apenas via WhatsApp

/*
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    if (!validateForm(formData)) {
        showNotification('Por favor, preencha todos os campos corretamente.', 'error');
        return;
    }
    
    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    
    contactForm.reset();
    
    console.log('Formulário enviado:', formData);
});
*/

/**
 * Valida os campos do formulário
 */
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim() || data.name.trim().length < 3) {
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    if (!data.subject.trim() || data.subject.trim().length < 3) {
        return false;
    }
    
    if (!data.message.trim() || data.message.trim().length < 10) {
        return false;
    }
    
    return true;
}

/**
 * Exibe notificações para o usuário
 */
function showNotification(message, type = 'info') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adiciona estilos inline (ou você pode adicionar ao CSS)
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Adiciona animações de notificação ao CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0.25rem;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @media screen and (max-width: 768px) {
        .notification {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ================================
// VALIDAÇÃO EM TEMPO REAL DOS INPUTS
// ================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
            validateInput(input);
        }
    });
});

/**
 * Valida input individual
 */
function validateInput(input) {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;
    
    if (input.type === 'email') {
        isValid = emailRegex.test(value);
    } else if (input.type === 'text') {
        isValid = value.length >= 3;
    } else if (input.tagName === 'TEXTAREA') {
        isValid = value.length >= 10;
    }
    
    if (!isValid) {
        input.classList.add('invalid');
        input.style.borderColor = '#ef4444';
    } else {
        input.classList.remove('invalid');
        input.style.borderColor = '#10b981';
    }
}

// ================================
// EFEITOS ADICIONAIS
// ================================

/**
 * Adiciona efeito de parallax suave no hero
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/**
 * Contador animado para estatísticas
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Ativa contador quando seção de estatísticas é visível
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ================================
// PREVENÇÃO DE COMPORTAMENTOS PADRÃO
// ================================

/**
 * Previne comportamento padrão de links vazios
 */
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

// ================================
// INICIALIZAÇÃO
// ================================

/**
 * Função executada quando o DOM estiver completamente carregado
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfólio carregado com sucesso!');
    
    // Destaca a navegação inicial
    highlightNavigation();
    
    // Adiciona classe loaded ao body para animações iniciais
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/**
 * Mensagem de desenvolvedor no console
 */
console.log('%c👨‍💻 Desenvolvido por Artur Camara', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c🚀 GitHub: https://github.com/Artur-Camara05', 'color: #8b5cf6; font-size: 14px;');
console.log('%c💼 LinkedIn: https://www.linkedin.com/in/artur-camara-914b752bb/', 'color: #ec4899; font-size: 14px;');
