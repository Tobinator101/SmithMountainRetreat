 let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        const sideBrand = document.querySelector('.side-brand');
        const scrollThreshold = 10;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll === 0) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
                sideBrand.classList.remove('visible');
            } else if (currentScroll > lastScroll && currentScroll > navbar.offsetHeight) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
                sideBrand.classList.add('visible');
            }
            
            lastScroll = currentScroll;
        });