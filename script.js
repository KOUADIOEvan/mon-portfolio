// Gestion du menu mobile (Responsive Hamburger Menu)
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('header nav');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Changement d'icône (fa-bars <=> fa-times)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Gestion de l'activation des liens de navigation lors du défilement (Scrollspy alternative)
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('header nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // Offset pour anticipation de l'activation

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                if (section.tagName.toLowerCase() === 'footer') {
                    currentSectionId = ''; // footer n'est pas lié à une section de navigation
                } else {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Fermeture automatique du menu mobile lors du clic sur un lien de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Gestion de la Modale des Compétences
    const modal = document.getElementById('skills-modal');
    const skillBtns = document.querySelectorAll('.btn-skill');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const skillData = {
        backend: {
            title: "Back-end",
            content: `
                <ul class="modal-skill-list">
                    <li><i class="fab fa-php" style="color:var(--accent-color)"></i> PHP</li>
                    <li><i class="fab fa-java" style="color:var(--accent-color)"></i> Java</li>
                    <li><i class="fab fa-python" style="color:var(--accent-color)"></i> Python</li>
                    <li><i class="fas fa-hashtag" style="color:var(--accent-color)"></i> C#</li>
                    <li><i class="fas fa-database" style="color:var(--accent-color)"></i> PostgreSQL</li>
                </ul>`
        },
        frontend: {
            title: "Front-end",
            content: `
                <ul class="modal-skill-list">
                    <li><i class="fab fa-html5" style="color:var(--accent-color)"></i> HTML</li>
                    <li><i class="fab fa-css3-alt" style="color:var(--accent-color)"></i> CSS</li>
                    <li><i class="fab fa-js" style="color:var(--accent-color)"></i> JS</li>
                </ul>`
        },
        Outils: {
            title: "Outils & Environnements",
            content: `
                <ul class="modal-skill-list">
                    <li>CATIA</li>
                    <li>SolidWorks</li>
                    <li>Eclipse</li>
                    <li>VS Code</li>
                    <li>Word</li>
                    <li>LibreOffice</li>
                    <li>Acces</li>
                    <li>InteliJ</li>
                    <li>PHPMYADMIN</li>
                    <li>VS Entreprise</li>
                    <li>Cisco Packet Tracer</li>
                    <li>My SQL</li>
                    <li>VirtualBox</li>
                    <li>Excel</li>
                </ul>`
        },
        
    };

    skillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const skill = btn.getAttribute('data-skill');
            modalTitle.innerText = skillData[skill].title;
            modalBody.innerHTML = skillData[skill].content;
            modal.style.display = 'flex';
        });
    });

    closeModal?.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });
});