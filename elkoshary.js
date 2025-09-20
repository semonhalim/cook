
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
            const currentRating = localStorage.getItem('recipeRating') || 0;
            highlightStars(currentRating);
        });

        function highlightStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.style.color = '#fbbf24';
                    star.style.textShadow = '0 0 10px rgba(251, 191, 36, 0.5)';
                } else {
                    star.style.color = '#d1d5db';
                    star.style.textShadow = 'none';
                }
            });
        }

        function updateRating(rating) {
            localStorage.setItem('recipeRating', rating);
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
            const savedRating = localStorage.getItem('recipeRating');
            if (savedRating) {
                updateRating(savedRating);
            }
        });

        // حفظ الوصفة
        function saveRecipe() {
            localStorage.setItem('savedRecipe', 'koshari');
            showNotification('تم حفظ الوصفة بنجاح! 💾');
        }

        // مشاركة الوصفة  
        function shareRecipe() {
            if (navigator.share) {
                navigator.share({
                    title: 'وصفة الكشري المصري الأصيل',
                    text: 'اكتشف طريقة عمل أطعم كشري مصري!',
                    url: window.location.href
                });
            } else {
                // نسخ الرابط للحافظة
                navigator.clipboard.writeText(window.location.href);
                showNotification('تم نسخ رابط الوصفة! 📋');
            }
        }

        // طباعة الوصفة
        function printRecipe() {
            window.print();
        }

        // رسالة الفيديو
        function showVideoMessage() {
            showNotification('قريباً سيتم إضافة فيديو توضيحي! 🎥');
        }

        // إظهار الإشعارات
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, #4caf50, #81c784);
                color: white;
                padding: 15px 25px;
                border-radius: 25px;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
                animation: slideDown 0.5s ease;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // تأثير الكونفيتي للتقييمات العالية
        function createConfetti() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: 10px;
                        height: 10px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        left: ${Math.random() * 100}%;
                        top: -10px;
                        z-index: 10000;
                        border-radius: 50%;
                        animation: fall 3s linear forwards;
                    `;
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 3000);
                }, i * 50);
            }
        }

        // إضافة CSS للأنيميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); }
                to { transform: translateX(-50%) translateY(0); }
            }
            
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // تأثيرات تفاعلية إضافية
        document.addEventListener('DOMContentLoaded', function() {
            // إضافة تأثير hover للخطوات
            const steps = document.querySelectorAll('.step');
            steps.forEach(step => {
                step.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(-10px) scale(1.02)';
                });
                
                step.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(-10px) scale(1)';
                });
            });

            // تأثير النبض للشيف العائم
            const floatingChef = document.querySelector('.floating-chef');
            setInterval(() => {
                floatingChef.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    floatingChef.style.transform = 'scale(1)';
                }, 200);
            }, 5000);
        });
    