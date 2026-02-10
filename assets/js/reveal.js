(function() {
    const init = () => {
        const cards = document.querySelectorAll('.reveal-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // If the card is in view
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');s
                    observer.unobserve(entry.target); 
                }
            });
        }, { 
            threshold: 0.15
        });

        cards.forEach((card) => observer.observe(card));
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();