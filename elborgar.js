
        // تأثيرات بصرية تفاعلية
        const sections = document.querySelectorAll('.section');
        
        // تأثير ظهور تدريجي للأقسام
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
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease';
            observer.observe(section);
        });

        // تأثير نابض للإحصائيات
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.animation = 'pulse 2s infinite';
            }, index * 200);
        });

        // إضافة تأثير للخطوات عند التحويم
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                step.style.background = '#f8fafe';
                step.querySelector('h3').style.color = '#0984e3';
            });
            
            step.addEventListener('mouseleave', () => {
                step.style.background = 'white';
                step.querySelector('h3').style.color = '#0984e3';
            });
        });

        // تأثير للنصائح المحترفة
        const tipCards = document.querySelectorAll('.tip-card');
        tipCards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'translateX(10px) scale(1.02)';
                }, 150);
            });
        });

        // إضافة كلاسات CSS ديناميكية
        const ingredientItems = document.querySelectorAll('.ingredient-item');
        ingredientItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                item.style.textDecoration = item.style.textDecoration === 'line-through' ? 'none' : 'line-through';
                item.style.opacity = item.style.opacity === '0.5' ? '1' : '0.5';
            });
        });

        // تأثير متقدم للنجوم
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                for (let i = 0; i <= index; i++) {
                    stars[i].style.color = '#fff';
                    stars[i].style.transform = 'scale(1.2) rotate(72deg)';
                }
            });
            
            star.addEventListener('mouseleave', () => {
                stars.forEach(s => {
                    s.style.color = '#ffeaa7';
                    s.style.transform = 'scale(1) rotate(0deg)';
                });
            });
        });

        // تأثير تحريك الخلفية عند التمرير
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        });

        // إضافة تأثير للأرقام المتحركة
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // تشغيل تأثير الأرقام عند ظهور التقييم
        const ratingNumber = document.querySelector('.rating-number');
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(ratingNumber, 0, 4.9, 2000);
                    ratingObserver.unobserve(entry.target);
                }
            });
        });
        ratingObserver.observe(ratingNumber);

        // تأثير الكتابة التدريجية للعنوان الفرعي
        const subtitle = document.querySelector('.header p');
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                subtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 2000);

        // إضافة تأثير موجي للحدود
        const sections2 = document.querySelectorAll('.section');
        sections2.forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.borderImage = 'linear-gradient(45deg, #ff6b6b, #ee5a24, #feca57, #48dbfb) 1';
                section.style.borderImageSlice = '1';
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.borderImage = 'none';
            });
        });

        // تأثير الجسيمات المتحركة للخلفية
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 107, 107, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: float-particle 6s linear infinite;
            `;
            
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 6000);
        }

        // إنشاء جسيمات كل ثانيتين
        setInterval(createParticle, 2000);

        // إضافة الكلاسات CSS للجسيمات
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
        `;
        document.head.appendChild(style);
