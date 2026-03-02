import './bat-particles.js';
import './reveal.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- Safety Check for p5 ---
    // This prevents the "p5 is not defined" error from breaking the menu
    if (typeof p5 !== 'undefined') {
        p5.disableFriendlyErrors = true;
    } else {
        console.log("Halloween Mode Note: p5 library not loaded yet; skipping p5 config.");
    }

    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('#site-navigation');
    
    if (!toggle || !nav) {
        console.error("Halloween Mode Error: Could not find .mobile-menu-toggle or #site-navigation");
        return;
    }

    // --- Main Hamburger Toggle Logic ---
    const toggleMenu = (forceState) => {
        const isCurrentlyActive = nav.classList.contains('is-active');
        const shouldOpen = (typeof forceState === 'boolean') ? forceState : !isCurrentlyActive;
        
        nav.classList.toggle('is-active', shouldOpen);
        toggle.classList.toggle('menu-open', shouldOpen);
        
        const mainContent = document.querySelector('main');
        const footer = document.querySelector('footer');
    
        if (shouldOpen) {
            document.body.classList.add('has-menu-open');
            if(mainContent) mainContent.setAttribute('aria-hidden', 'true');
            if(footer) footer.setAttribute('aria-hidden', 'true');
            
            setTimeout(() => {
                const firstLink = nav.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 100);

        } else {
            if(mainContent) mainContent.removeAttribute('aria-hidden');
            if(footer) footer.removeAttribute('aria-hidden');
            
            nav.querySelectorAll('.is-open').forEach(el => el.classList.remove('is-open'));
            
            if (!document.querySelector('#halloween-lightbox.is-active')) {
                document.body.classList.remove('has-menu-open');
            }
            
            toggle.focus();
        }
        
        toggle.setAttribute('aria-expanded', shouldOpen);
    };

    // The single, corrected click listener
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        toggleMenu();
    });

    // --- Mobile Sub-menu (Candy) Logic ---
    const parentLinks = nav.querySelectorAll('.menu-item-has-children > a');

    parentLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                const parentLi = link.parentElement;
                if (!parentLi.classList.contains('is-open')) {
                    e.preventDefault();
                    parentLi.classList.add('is-open');
                } 
            }
        });
    });

    // --- Lightbox Logic ---
    let lightbox = document.getElementById('halloween-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'halloween-lightbox';
        const closeBtn = document.createElement('div');
        closeBtn.id = 'lightbox-close';
        closeBtn.innerHTML = '✖';
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
    }

    document.querySelectorAll('.wp-block-gallery img').forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('is-active');
            const img = document.createElement('img');
            img.src = image.src;
            const currentImg = lightbox.querySelector('img');
            if (currentImg) currentImg.remove();
            lightbox.appendChild(img);
            document.body.classList.add('has-menu-open');
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'halloween-lightbox' || e.target.id === 'lightbox-close') {
            lightbox.classList.remove('is-active');
            if (!nav.classList.contains('is-active')) {
                document.body.classList.remove('has-menu-open');
            }
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (nav.classList.contains('is-active')) toggleMenu(false);
            if (lightbox) lightbox.classList.remove('is-active');
            document.body.classList.remove('has-menu-open');
        }
    });
});