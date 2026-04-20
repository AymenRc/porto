/* ========================================
   Main JavaScript - Portfolio
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavbar();
    initMobileMenu();
    initTypewriter();
    initParticles();
    initCountUp();
    initScrollReveal();
    initActiveNav();
});

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ========================================
   Mobile Navigation
   ======================================== */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ========================================
   Typewriter Effect
   ======================================== */
function initTypewriter() {
    const element = document.getElementById('typewriter');

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function getPhrases() {
        const lang = document.documentElement.lang || 'en';
        return translations[lang]?.typewriter || translations.en.typewriter;
    }

    function type() {
        const phrases = getPhrases();
        const currentPhrase = phrases[phraseIndex % phrases.length];

        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 60;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ========================================
   Floating Particles
   ======================================== */
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';

        // Randomize color between accent and accent-secondary
        if (Math.random() > 0.5) {
            particle.style.background = '#818cf8';
        }

        container.appendChild(particle);
    }
}

/* ========================================
   Count-Up Animation
   ======================================== */
function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCountUp() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCount() {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            }

            updateCount();
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCountUp();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* ========================================
   Scroll Reveal Animation
   ======================================== */
function initScrollReveal() {
    // Add reveal class to elements
    const revealSelectors = [
        '.skill-category',
        '.timeline-item',
        '.education-card',
        '.cert-card',
        '.contact-card',
        '.about-text',
        '.about-terminal'
    ];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = (index * 0.1) + 's';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/* ========================================
   Active Navigation Link
   ======================================== */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-72px 0px -50% 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ========================================
   Translations
   ======================================== */
const translations = {
    en: {
        typewriter: [
            'Lead DevOps Engineer',
            'Platform Engineering',
            'CI/CD Architecture',
            'Kubernetes & Containers',
            'Cloud Infrastructure',
            'Security Automation',
            'Infrastructure as Code',
            'Observability & Monitoring'
        ],
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.experience': 'Experience',
        'nav.education': 'Education',
        'nav.certifications': 'Certifications',
        'nav.contact': "Let's Talk",
        'hero.badge': 'Available for opportunities',
        'hero.greeting': "Hi, I'm",
        'hero.description': 'Lead DevOps Engineer crafting <strong>resilient infrastructure</strong>, automating <strong>everything</strong>, and building platforms that scale. Turning complex systems into elegant, reliable solutions.',
        'hero.stat.years': 'Years Experience',
        'hero.stat.deployment': 'Deployment Time Reduced',
        'hero.stat.projects': 'Projects Delivered',
        'hero.cta.work': 'View My Work',
        'hero.cta.contact': 'Get in Touch',
        'hero.scroll': 'Scroll down',
        'about.title': 'About Me',
        'about.intro': 'I\'m a <strong>Lead DevOps Engineer</strong> based in Paris with 7+ years of experience building and operating production-grade cloud infrastructure across industries including <strong>telecom</strong>, <strong>fintech</strong>, <strong>IoT</strong>, and <strong>SaaS</strong>.',
        'about.p1': 'My expertise lies at the intersection of <strong>infrastructure automation</strong>, <strong>platform engineering</strong>, and <strong>security hardening</strong>. I design and implement end-to-end CI/CD pipelines, orchestrate containerized workloads at scale, and build observability stacks that give teams full visibility into their systems.',
        'about.p2': 'At <strong>Orange France</strong>, I work within a cross-functional team of 18 engineers on network security automation projects, reducing deployment timelines by <strong>70%</strong> while enforcing strict security policies across Kubernetes environments. I\'m passionate about <strong>mentoring peers</strong>, standardizing engineering practices, and bridging the gap between development and operations.',
        'about.p3': 'I hold an <strong>Engineering degree in Software Engineering</strong> and a <strong>Master\'s in International Business & Technology</strong> from IÉSEG School of Management, giving me a unique blend of technical depth and business acumen.',
        'about.location': 'Paris, France',
        'about.languages': 'French · English · Arabic',
        'about.availability': 'Open to remote & hybrid',
        'skills.title': 'Technical Arsenal',
        'experience.title': 'Professional Journey',
        'education.title': 'Education',
        'certifications.title': 'Certifications',
        'contact.title': "Let's Connect",
        'contact.text': 'Whether you\'re looking for a <strong>DevOps lead</strong> to architect your cloud platform, need help <strong>scaling your infrastructure</strong>, or want to discuss <strong>engineering best practices</strong> — I\'d love to hear from you.',
        'contact.email': 'Email',
        'contact.location': 'Location',
        'contact.locationValue': 'Paris, France',
        'footer.text': 'Designed & built by Aymen Rachid &middot; &copy; 2026',
        // Terminal
        'about.terminal': `<pre>
<span class="yaml-key">name:</span> Aymen Rachid
<span class="yaml-key">role:</span> Lead DevOps Engineer
<span class="yaml-key">location:</span> Paris, France
<span class="yaml-key">experience:</span> 7+ years
<span class="yaml-key">focus:</span>
  - Platform Engineering
  - CI/CD Architecture
  - Cloud Infrastructure
  - Security Automation
  - Kubernetes & Containers
<span class="yaml-key">philosophy:</span> >
  Automate everything.
  Monitor everything.
  Document everything.
  Ship with confidence.
</pre>`,
        // Skills
        'skills.cicd.title': 'CI/CD & Automation',
        'skills.cicd.desc': 'Designing and maintaining production-grade delivery pipelines that ship code reliably and fast.',
        'skills.cloud.title': 'Cloud & Infrastructure',
        'skills.cloud.desc': 'Architecting scalable, cost-efficient cloud environments with Infrastructure as Code.',
        'skills.dev.title': 'Development & Scripting',
        'skills.dev.desc': 'Building internal tools, APIs, and automation scripts that power DevOps workflows.',
        'skills.obs.title': 'Observability & Monitoring',
        'skills.obs.desc': 'Full-stack observability with metrics, logs, and traces for proactive incident management.',
        'skills.sec.title': 'Security & Compliance',
        'skills.sec.desc': 'Embedding security into every layer — from network firewalls to Kubernetes admission policies.',
        'skills.data.title': 'Data & Systems',
        'skills.data.desc': 'Managing databases, Linux systems, and cross-functional collaboration at scale.',
        // Experience - Orange
        'exp.current': 'Current',
        'exp.orange.date': 'June 2022 — Present',
        'exp.orange.title': 'Lead DevOps Engineer',
        'exp.orange.project': 'Network Security Automation (Service Flux)',
        'exp.orange.details': '<li>Architected and deployed end-to-end <strong>CI/CD pipelines</strong> automating the provisioning and configuration of network security appliances, cutting deployment time by <strong>70%</strong>.</li><li>Collaborated within a cross-functional team of <strong>18 engineers</strong> on projects spanning network automation, security enforcement, and platform standardization.</li><li>Developed secure <strong>REST APIs</strong> (Python/FastAPI) to streamline client-to-service interactions and automate firewall rule management across enterprise-grade appliances.</li><li>Automated deployment of <strong>MongoDB replica sets</strong> and <strong>Kubernetes clusters</strong> using Kubespray, Helm, and custom Ansible playbooks.</li><li>Enforced security posture through <strong>HashiCorp Vault</strong> for secrets management, <strong>Kyverno</strong> for Kubernetes policy enforcement, and rigorous access control mechanisms.</li><li>Built a comprehensive <strong>observability stack</strong> using Prometheus, Grafana, Elasticsearch, and OpenTelemetry — enabling proactive monitoring, centralized logging, and distributed tracing.</li><li>Created a shared <strong>component library</strong> to standardize deployment patterns, improve code reusability, and ensure consistency across services.</li><li>Mentored junior engineers, conducted technical onboarding, and championed DevOps best practices through workshops and documentation.</li>',
        // Experience - Mind-Lift
        'exp.mindlift.date': 'July 2021 — June 2022',
        'exp.mindlift.title': 'DevOps Engineer',
        'exp.mindlift.project': 'Business Simulation Platform',
        'exp.mindlift.details': '<li>Administered and optimized <strong>AWS infrastructure</strong> — VPC networking, IAM policies, ELB configuration, S3 storage, Auto Scaling groups, and Security Groups.</li><li>Implemented <strong>Cloudflare</strong> security layer with custom WAF rules, SSL certificate management, and DDoS protection for production workloads.</li><li>Executed a full <strong>server migration</strong> with zero downtime, improving availability and infrastructure resilience.</li><li>Managed <strong>PostgreSQL databases</strong> with automated backup strategies, point-in-time recovery, and performance tuning.</li><li>Built end-to-end <strong>CI/CD pipelines</strong> to standardize, accelerate, and secure application deployments across environments.</li><li>Authored <strong>Ansible roles</strong> for configuration management, server hardening, and reproducible environment provisioning.</li><li>Deployed <strong>IDS/IPS solutions</strong> and implemented network-level security controls to protect production infrastructure.</li><li>Contributed to the development of a <strong>cloud-based business simulation platform</strong> used by enterprise clients.</li>',
        // Experience - Machinestalk
        'exp.machinestalk.date': 'January 2021 — July 2021',
        'exp.machinestalk.title': 'Full Stack Engineer',
        'exp.machinestalk.location': 'Tunis, Tunisia',
        'exp.machinestalk.project': 'SaaS IoT Platform (B2B / B2C)',
        'exp.machinestalk.details': '<li>Developed <strong>usage control mechanisms</strong> to enforce security policies and optimize resource consumption across IoT platforms.</li><li>Integrated an open-source <strong>subscription and billing platform</strong> to automate secure payment processing for SaaS customers.</li><li>Deployed and managed application environments on <strong>Azure (AKS)</strong>, contributing to cloud infrastructure design and operational excellence.</li><li>Established <strong>CI/CD workflows</strong> to streamline delivery cycles and reduce manual deployment overhead.</li><li>Contributed to product engineering with a focus on <strong>SaaS scalability</strong>, automation, and long-term maintainability.</li>',
        // Experience - SMU
        'exp.smu.date': 'October 2018 — June 2020',
        'exp.smu.title': 'Software / DevOps Engineer (Apprenticeship)',
        'exp.smu.location': 'Tunis, Tunisia',
        'exp.smu.project': 'ThinkSchool E-Learning Platform',
        'exp.smu.details': '<li>Contributed to the design, development, and continuous improvement of an <strong>internal management system</strong> supporting educational workflows.</li><li>Deployed and customized <strong>Alfresco</strong> and <strong>Odoo</strong> platforms tailored to specific client requirements and business processes.</li><li>Managed <strong>web content integration</strong>, platform updates, and stakeholder communication for project delivery.</li><li>Worked in an <strong>Agile (Scrum)</strong> environment, actively contributing to sprint planning, retrospectives, and cross-team coordination.</li><li>Gained hands-on experience across <strong>development, deployment, and functional support</strong> — building a strong foundation in full lifecycle engineering.</li>',
        // Education
        'edu.ieseg.degree': "Master's in International Business & Technology",
        'edu.ieseg.desc': "Combined technology and business strategy at one of France's top business schools, gaining expertise in digital transformation, project management, and international business operations.",
        'edu.smu.degree': 'Engineering Degree in Software Engineering',
        'edu.smu.school': 'South Mediterranean University (SMU)',
        'edu.smu.location': 'Tunis, Tunisia',
        'edu.smu.desc': 'Comprehensive five-year engineering program covering software architecture, systems programming, algorithms, databases, and cloud computing with hands-on industry experience.',
        // Certifications
        'cert.aws.name': 'AWS Certified Cloud Practitioner',
        'cert.aws.date': 'September 2020',
        'cert.iot.name': 'IoT Cloud Developer',
        'cert.iot.date': 'January 2021',
        'cert.trainer.name': 'Train the Trainer',
        'cert.trainer.date': 'April 2016'
    },
    fr: {
        typewriter: [
            'Lead Ingénieur DevOps',
            'Platform Engineering',
            'Architecture CI/CD',
            'Kubernetes & Conteneurs',
            'Infrastructure Cloud',
            'Automatisation Sécurité',
            'Infrastructure as Code',
            'Observabilité & Monitoring'
        ],
        'nav.about': 'À propos',
        'nav.skills': 'Compétences',
        'nav.experience': 'Expérience',
        'nav.education': 'Formation',
        'nav.certifications': 'Certifications',
        'nav.contact': 'Contact',
        'hero.badge': 'Disponible pour de nouvelles opportunités',
        'hero.greeting': 'Bonjour, je suis',
        'hero.description': 'Lead Ingénieur DevOps, je conçois des <strong>infrastructures résilientes</strong>, j\'automatise <strong>tout</strong> et je construis des plateformes à grande échelle. Transformer des systèmes complexes en solutions élégantes et fiables.',
        'hero.stat.years': 'Années d\'expérience',
        'hero.stat.deployment': 'Temps de déploiement réduit',
        'hero.stat.projects': 'Projets livrés',
        'hero.cta.work': 'Voir mon travail',
        'hero.cta.contact': 'Me contacter',
        'hero.scroll': 'Défiler vers le bas',
        'about.title': 'À propos',
        'about.intro': 'Je suis un <strong>Lead Ingénieur DevOps</strong> basé à Paris avec plus de 7 ans d\'expérience dans la construction et l\'exploitation d\'infrastructures cloud de production dans les secteurs des <strong>télécoms</strong>, de la <strong>fintech</strong>, de l\'<strong>IoT</strong> et du <strong>SaaS</strong>.',
        'about.p1': 'Mon expertise se situe à l\'intersection de l\'<strong>automatisation d\'infrastructure</strong>, du <strong>platform engineering</strong> et du <strong>renforcement de la sécurité</strong>. Je conçois et implémente des pipelines CI/CD de bout en bout, orchestre des workloads conteneurisés à grande échelle et construis des stacks d\'observabilité offrant une visibilité complète sur les systèmes.',
        'about.p2': 'Chez <strong>Orange France</strong>, je travaille au sein d\'une équipe pluridisciplinaire de 18 ingénieurs sur des projets d\'automatisation de la sécurité réseau, réduisant les délais de déploiement de <strong>70%</strong> tout en appliquant des politiques de sécurité strictes sur les environnements Kubernetes. Je suis passionné par le <strong>mentorat</strong>, la standardisation des pratiques d\'ingénierie et le rapprochement entre le développement et les opérations.',
        'about.p3': 'Je suis titulaire d\'un <strong>diplôme d\'ingénieur en génie logiciel</strong> et d\'un <strong>Master en Business International & Technologie</strong> de l\'IÉSEG School of Management, me conférant une combinaison unique de profondeur technique et de sens des affaires.',
        'about.location': 'Paris, France',
        'about.languages': 'Français · Anglais · Arabe',
        'about.availability': 'Ouvert au télétravail & hybride',
        'skills.title': 'Arsenal Technique',
        'experience.title': 'Parcours Professionnel',
        'education.title': 'Formation',
        'certifications.title': 'Certifications',
        'contact.title': 'Restons en contact',
        'contact.text': 'Que vous cherchiez un <strong>lead DevOps</strong> pour architecturer votre plateforme cloud, que vous ayez besoin d\'aide pour <strong>scaler votre infrastructure</strong>, ou que vous souhaitiez discuter des <strong>meilleures pratiques d\'ingénierie</strong> — je serais ravi d\'échanger avec vous.',
        'contact.email': 'Email',
        'contact.location': 'Localisation',
        'contact.locationValue': 'Paris, France',
        'footer.text': 'Conçu & développé par Aymen Rachid &middot; &copy; 2026',
        // Terminal
        'about.terminal': `<pre>
<span class="yaml-key">nom:</span> Aymen Rachid
<span class="yaml-key">poste:</span> Lead Ingénieur DevOps
<span class="yaml-key">localisation:</span> Paris, France
<span class="yaml-key">expérience:</span> 7+ ans
<span class="yaml-key">domaines:</span>
  - Platform Engineering
  - Architecture CI/CD
  - Infrastructure Cloud
  - Automatisation Sécurité
  - Kubernetes & Conteneurs
<span class="yaml-key">philosophie:</span> >
  Tout automatiser.
  Tout surveiller.
  Tout documenter.
  Livrer avec confiance.
</pre>`,
        // Skills
        'skills.cicd.title': 'CI/CD & Automatisation',
        'skills.cicd.desc': 'Conception et maintenance de pipelines de livraison en production qui déploient du code de manière fiable et rapide.',
        'skills.cloud.title': 'Cloud & Infrastructure',
        'skills.cloud.desc': 'Architecture d\'environnements cloud scalables et rentables avec l\'Infrastructure as Code.',
        'skills.dev.title': 'Développement & Scripting',
        'skills.dev.desc': 'Développement d\'outils internes, d\'APIs et de scripts d\'automatisation au service des workflows DevOps.',
        'skills.obs.title': 'Observabilité & Monitoring',
        'skills.obs.desc': 'Observabilité full-stack avec métriques, logs et traces pour une gestion proactive des incidents.',
        'skills.sec.title': 'Sécurité & Conformité',
        'skills.sec.desc': 'Intégration de la sécurité à chaque couche — des pare-feu réseau aux politiques d\'admission Kubernetes.',
        'skills.data.title': 'Données & Systèmes',
        'skills.data.desc': 'Gestion de bases de données, systèmes Linux et collaboration transversale à grande échelle.',
        // Experience - Orange
        'exp.current': 'Actuel',
        'exp.orange.date': 'Juin 2022 — Présent',
        'exp.orange.title': 'Lead Ingénieur DevOps',
        'exp.orange.project': 'Automatisation Sécurité Réseau (Service Flux)',
        'exp.orange.details': '<li>Conception et déploiement de <strong>pipelines CI/CD</strong> de bout en bout automatisant le provisionnement et la configuration d\'appliances de sécurité réseau, réduisant le temps de déploiement de <strong>70%</strong>.</li><li>Collaboration au sein d\'une équipe pluridisciplinaire de <strong>18 ingénieurs</strong> sur des projets d\'automatisation réseau, de renforcement de la sécurité et de standardisation de plateforme.</li><li>Développement d\'<strong>APIs REST</strong> sécurisées (Python/FastAPI) pour fluidifier les interactions client-service et automatiser la gestion des règles de pare-feu.</li><li>Automatisation du déploiement de <strong>replica sets MongoDB</strong> et de <strong>clusters Kubernetes</strong> via Kubespray, Helm et des playbooks Ansible personnalisés.</li><li>Renforcement de la posture de sécurité via <strong>HashiCorp Vault</strong> pour la gestion des secrets, <strong>Kyverno</strong> pour l\'application des politiques Kubernetes et des mécanismes de contrôle d\'accès rigoureux.</li><li>Mise en place d\'une <strong>stack d\'observabilité</strong> complète avec Prometheus, Grafana, Elasticsearch et OpenTelemetry — monitoring proactif, logs centralisés et tracing distribué.</li><li>Création d\'une <strong>bibliothèque de composants</strong> partagée pour standardiser les patterns de déploiement, améliorer la réutilisabilité du code et assurer la cohérence entre les services.</li><li>Mentorat d\'ingénieurs juniors, onboarding technique et promotion des bonnes pratiques DevOps via des ateliers et de la documentation.</li>',
        // Experience - Mind-Lift
        'exp.mindlift.date': 'Juillet 2021 — Juin 2022',
        'exp.mindlift.title': 'Ingénieur DevOps',
        'exp.mindlift.project': 'Plateforme de Simulation d\'Entreprise',
        'exp.mindlift.details': '<li>Administration et optimisation de l\'<strong>infrastructure AWS</strong> — réseau VPC, politiques IAM, configuration ELB, stockage S3, groupes Auto Scaling et Security Groups.</li><li>Mise en place d\'une couche de sécurité <strong>Cloudflare</strong> avec règles WAF personnalisées, gestion des certificats SSL et protection DDoS pour les workloads de production.</li><li>Exécution d\'une <strong>migration de serveur</strong> complète sans interruption de service, améliorant la disponibilité et la résilience de l\'infrastructure.</li><li>Gestion de <strong>bases de données PostgreSQL</strong> avec stratégies de sauvegarde automatisées, récupération point-in-time et optimisation des performances.</li><li>Construction de <strong>pipelines CI/CD</strong> de bout en bout pour standardiser, accélérer et sécuriser les déploiements applicatifs.</li><li>Rédaction de <strong>rôles Ansible</strong> pour la gestion de configuration, le durcissement des serveurs et le provisionnement reproductible des environnements.</li><li>Déploiement de <strong>solutions IDS/IPS</strong> et implémentation de contrôles de sécurité réseau pour protéger l\'infrastructure de production.</li><li>Contribution au développement d\'une <strong>plateforme de simulation d\'entreprise cloud</strong> utilisée par des clients entreprise.</li>',
        // Experience - Machinestalk
        'exp.machinestalk.date': 'Janvier 2021 — Juillet 2021',
        'exp.machinestalk.title': 'Ingénieur Full Stack',
        'exp.machinestalk.location': 'Tunis, Tunisie',
        'exp.machinestalk.project': 'Plateforme IoT SaaS (B2B / B2C)',
        'exp.machinestalk.details': '<li>Développement de <strong>mécanismes de contrôle d\'usage</strong> pour appliquer les politiques de sécurité et optimiser la consommation de ressources sur les plateformes IoT.</li><li>Intégration d\'une <strong>plateforme open-source d\'abonnement et de facturation</strong> pour automatiser le traitement sécurisé des paiements pour les clients SaaS.</li><li>Déploiement et gestion d\'environnements applicatifs sur <strong>Azure (AKS)</strong>, contribuant à la conception d\'infrastructure cloud et à l\'excellence opérationnelle.</li><li>Mise en place de <strong>workflows CI/CD</strong> pour fluidifier les cycles de livraison et réduire les déploiements manuels.</li><li>Contribution à l\'ingénierie produit avec un focus sur la <strong>scalabilité SaaS</strong>, l\'automatisation et la maintenabilité à long terme.</li>',
        // Experience - SMU
        'exp.smu.date': 'Octobre 2018 — Juin 2020',
        'exp.smu.title': 'Ingénieur Logiciel / DevOps (Alternance)',
        'exp.smu.location': 'Tunis, Tunisie',
        'exp.smu.project': 'Plateforme E-Learning ThinkSchool',
        'exp.smu.details': '<li>Contribution à la conception, au développement et à l\'amélioration continue d\'un <strong>système de gestion interne</strong> supportant les workflows éducatifs.</li><li>Déploiement et personnalisation des plateformes <strong>Alfresco</strong> et <strong>Odoo</strong> adaptées aux besoins spécifiques des clients et processus métier.</li><li>Gestion de l\'<strong>intégration de contenu web</strong>, des mises à jour de plateforme et de la communication avec les parties prenantes.</li><li>Travail dans un environnement <strong>Agile (Scrum)</strong>, contribution active à la planification des sprints, aux rétrospectives et à la coordination inter-équipes.</li><li>Expérience pratique en <strong>développement, déploiement et support fonctionnel</strong> — construction d\'une base solide en ingénierie du cycle de vie complet.</li>',
        // Education
        'edu.ieseg.degree': 'Master en Business International & Technologie',
        'edu.ieseg.desc': 'Alliance de technologie et de stratégie business dans l\'une des meilleures écoles de commerce de France, avec une expertise en transformation digitale, gestion de projet et opérations internationales.',
        'edu.smu.degree': 'Diplôme d\'Ingénieur en Génie Logiciel',
        'edu.smu.school': 'South Mediterranean University (SMU)',
        'edu.smu.location': 'Tunis, Tunisie',
        'edu.smu.desc': 'Programme d\'ingénierie de cinq ans couvrant l\'architecture logicielle, la programmation système, les algorithmes, les bases de données et le cloud computing avec une expérience industrielle pratique.',
        // Certifications
        'cert.aws.name': 'AWS Certified Cloud Practitioner',
        'cert.aws.date': 'Septembre 2020',
        'cert.iot.name': 'IoT Cloud Developer',
        'cert.iot.date': 'Janvier 2021',
        'cert.trainer.name': 'Formation de Formateurs',
        'cert.trainer.date': 'Avril 2016'
    }
};

/* ========================================
   Theme Management
   ======================================== */
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const stored = localStorage.getItem('theme');

    // Auto-detect: use stored preference, or system preference, fallback to dark
    if (stored) {
        setTheme(stored);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

/* ========================================
   Language / i18n Management
   ======================================== */
function initLanguage() {
    const toggle = document.getElementById('langToggle');
    const stored = localStorage.getItem('lang');

    // Auto-detect: use stored preference, or browser language, fallback to en
    if (stored) {
        setLanguage(stored);
    } else {
        const browserLang = (navigator.language || navigator.userLanguage || 'en').substring(0, 2);
        setLanguage(translations[browserLang] ? browserLang : 'en');
    }

    toggle.addEventListener('click', () => {
        const current = document.documentElement.lang;
        const next = current === 'en' ? 'fr' : 'en';
        setLanguage(next);
        localStorage.setItem('lang', next);
    });
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    const t = translations[lang] || translations.en;

    // Update toggle button text
    const toggle = document.getElementById('langToggle');
    toggle.textContent = lang.toUpperCase();

    // Update elements with data-i18n (text content)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    // Update elements with data-i18n-html (innerHTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });
}
