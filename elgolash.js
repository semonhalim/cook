
        // تحديث شريط التقدم أثناء التمرير
        window.addEventListener('scroll', function() {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        });

        // العودة للأعلى
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // تقييم الوصفة
        const stars = document.querySelectorAll('.star');
        const ratingText = document.getElementById('ratingText');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                updateRating(rating);
            });
            
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                highlightStars(rating);
            });
        });

        document.getElementById('ratingStars').addEventListener('mouseleave', function() {
            const currentRating = localStorage.getItem('goulashRating') || 0;
            highlightStars(currentRating);
        });

        function highlightStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.style.color = '#ffd700';
                    star.style.textShadow = '0 0 15px rgba(255, 215, 0, 0.8)';
                } else {
                    star.style.color = '#d1d5db';
                    star.style.textShadow = 'none';
                }
            });
        }

        function updateRating(rating) {
            localStorage.setItem('goulashRating', rating);
            highlightStars(rating);
            
            const messages = {
                '1': 'يحتاج تحسين 😔',
                '2': 'مقبول 🙂', 
                '3': 'جيد 😊',
                '4': 'ممتاز 😍',
                '5': 'رائع جداً! 🤩'
            };
            
            ratingText.textContent = `تقييمك: ${messages[rating]}`;
            
            // تأثير احتفالي للتقييم العالي
            if (rating >= 4) {
                createConfetti();
            }
        }

        // تحميل التقييم المحفوظ
        window.addEventListener('load', function() {
            const savedRating = localStorage.getItem('goulashRating');
            if (savedRating) {
                updateRating(savedRating);
            }
        });

        // حفظ الوصفة
        function saveRecipe() {
            localStorage.setItem('savedGoulashRecipe', 'goulash-meat');
            showNotification('تم حفظ وصفة الجلاش بنجاح! 💾');
        }

        // مشاركة الوصفة  
        function shareRecipe() {
            if (navigator.share) {
                navigator.share({
                    title: 'وصفة الجلاش بالحمة المفرومة',
                    text: 'اكتشفي طريقة عمل أطعم جلاش بالحمة المفرومة!',
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                showNotification('تم نسخ رابط الوصفة! 📋');
            }
        }

        // طباعة الوصفة
        function printRecipe() {
            window.print();
        }

        // إظهار الإشعارات
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 4000);
        }

        // تأثير الكونفيتي للتقييمات العالية
        function createConfetti() {
            const colors = ['#d4af37', '#ffd700', '#ff6b6b', '#4169e1', '#ff8c00'];
            
            for (let i = 0; i < 60; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: 12px;
                        height: 12px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        left: ${Math.random() * 100}%;
                        top: -15px;
                        z-index: 10000;
                        border-radius: 50%;
                        animation: confetti-fall 4s linear forwards;
                    `;
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 4000);
                }, i * 80);
            }
        }

        // إضافة CSS للأنيميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(110vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // تأثيرات تفاعلية عند التحميل
        document.addEventListener('DOMContentLoaded', function() {
            // تأثير النبض للشيف العائم
            const floatingChef = document.querySelector('.floating-chef');
            let pulseInterval = setInterval(() => {
                floatingChef.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    floatingChef.style.transform = 'scale(1)';
                }, 300);
            }, 6000);

            // إضافة تأثيرات hover للخطوات
            const steps = document.querySelectorAll('.step');
            steps.forEach(step => {
                step.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(-15px) scale(1.02)';
                });
                
                step.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(-15px)';
                });
            });
        });
    