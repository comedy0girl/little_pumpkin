document.addEventListener('DOMContentLoaded', () => {

    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('#site-navigation');
    if (!toggle || !nav) return;

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

    // --- Main Hamburger Toggle Logic ---
    const toggleMenu = (forceState) => {
        const isCurrentlyActive = nav.classList.contains('is-active');
        const shouldOpen = (typeof forceState === 'boolean') ? forceState : !isCurrentlyActive;
        
        nav.classList.toggle('is-active', shouldOpen);
        toggle.classList.toggle('menu-open', shouldOpen);
    
        if (shouldOpen) {
            document.body.classList.add('has-menu-open');
        } else {
            // Close all sub-menus when closing the main menu
            nav.querySelectorAll('.is-open').forEach(el => el.classList.remove('is-open'));
            
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

    // --- Lightbox Logic ---
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
            toggleMenu(false);
            if (lightbox) lightbox.classList.remove('is-active');
            document.body.classList.remove('has-menu-open');
        }
    });
});