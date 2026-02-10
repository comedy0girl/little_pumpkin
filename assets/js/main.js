document.addEventListener('DOMContentLoaded', () => {

    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('#site-navigation');
    if (!toggle || !nav) return;

    const navLinks = Array.from(nav.querySelectorAll('a'));

    const toggleMenu = (forceState) => {
        const isCurrentlyActive = nav.classList.contains('is-active');
        const shouldOpen = (typeof forceState === 'boolean') ? forceState : !isCurrentlyActive;
        
        nav.classList.toggle('is-active', shouldOpen);
        toggle.classList.toggle('menu-open', shouldOpen);
    
        if (shouldOpen) {
            document.body.classList.add('has-menu-open');
        } else {
            if (!document.querySelector('#halloween-lightbox.is-active')) {
                document.body.classList.remove('has-menu-open');
            }
        }
        
        toggle.setAttribute('aria-expanded', shouldOpen);
    };

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    const lightbox = document.createElement('div');
    lightbox.id = 'halloween-lightbox';
    
    const closeBtn = document.createElement('div');
    closeBtn.id = 'lightbox-close';
    closeBtn.innerHTML = '✖';
    lightbox.appendChild(closeBtn);
    
    document.body.appendChild(lightbox);

    document.querySelectorAll('.wp-block-gallery img').forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('is-active');
            const img = document.createElement('img');
            img.src = image.src;
            
            // Clear previous and add new
            const currentImg = lightbox.querySelector('img');
            if (currentImg) currentImg.remove();
            
            lightbox.appendChild(img);
            document.body.classList.add('has-menu-open');
        });
    });

    // Close logic for Lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'halloween-lightbox' || e.target.id === 'lightbox-close') {
            lightbox.classList.remove('is-active');
            if (!nav.classList.contains('is-active')) {
                document.body.classList.remove('has-menu-open');
            }
        }
    });

    // Global Escape Key to close everything
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleMenu(false);
            lightbox.classList.remove('is-active');
            document.body.classList.remove('has-menu-open');
        }
    });
});