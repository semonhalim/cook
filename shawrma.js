
        // تأثير متحرك للنجوم عند التحويم
        const stars = document.querySelectorAll('.star.filled');
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                star.style.transform = 'scale(1.3) rotate(72deg)';
                star.style.transition = 'all 0.3s ease';
            });
            
            star.addEventListener('mouseleave', () => {
                star.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // تأثير تدريجي لظهور العناصر عند التحميل
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });

        // تأثير النبضات للأرقام
        const timeValues = document.querySelectorAll('.time-value');
        timeValues.forEach(value => {
            setInterval(() => {
                value.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    value.style.transform = 'scale(1)';
                }, 150);
            }, 3000);
        });
