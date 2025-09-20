
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
            const currentRating = localStorage.getItem('pizzaRating') || 0;
            highlightStars(currentRating);
        });

        function highlightStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.style.color = '#ffd700';
                    star.style.textShadow = '0 0 20px rgba(255, 215, 0, 1)';
                    star.style.transform = 'scale(1.2)';
                } else {
                    star.style.color = '#d1d5db';
                    star.style.textShadow = 'none';
                    star.style.transform = 'scale(1)';
                }
            });
        }

        function updateRating(rating) {
            localStorage.setItem('pizzaRating', rating);
            highlightStars(rating);
            
            const messages = {
                '1': 'يحتاج تحسين 😔',
                '2': 'مقبول 🙂', 
                '3': 'جيد 😊',
                '4': 'ممتاز 😍',
                '5': 'Fantastico! 🤩🍕'
            };
            
            ratingText.textContent = `تقييمك: ${messages[rating]}`;
            
            // تأثير احتفالي للتقييم العالي
            if (rating >= 4) {
                createPizzaConfetti();
            }
        }

        // تحميل التقييم المحفوظ
        window.addEventListener('load', function() {
            const savedRating = localStorage.getItem('pizzaRating');
            if (savedRating) {
                updateRating(savedRating);
            }
        });

        // حفظ الوصفة
        function saveRecipe() {
            localStorage.setItem('savedPizzaRecipe', 'italian-pizza');
            showNotification('تم حفظ وصفة البيتزا بنجاح! 🍕💾');
        }

        // مشاركة الوصفة  
        function shareRecipe() {
            if (navigator.share) {
                navigator.share({
                    title: 'وصفة البيتزا الإيطالية الأصلية',
                    text: 'اكتشفي أسرار البيتزا الإيطالية الحقيقية!',
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

        // تأثير كونفيتي بشكل بيتزا للتقييمات العالية
        function createPizzaConfetti() {
            const emojis = ['🍕', '🧀', '🍅', '🌿', '⭐', '❤️'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    confetti.style.cssText = `
                        position: fixed;
                        font-size: ${Math.random() * 20 + 15}px;
                        left: ${Math.random() * 100}%;
                        top: -50px;
                        z-index: 10000;
                        animation: pizza-confetti-fall 4s linear forwards;
                        pointer-events: none;
                    `;
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 4000);
                }, i * 100);
            }
        }

        // إضافة CSS للأنيميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pizza-confetti-fall {
                to {
                    transform: translateY(110vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // تأثيرات تفاعلية عند التحميل
        document.addEventListener('DOMContentLoaded', function() {
            // تأثير النبض للبيتزا العائمة
            const floatingPizza = document.querySelector('.floating-pizza');
            let pulseInterval = setInterval(() => {
                floatingPizza.style.transform = 'scale(1.4)';
                setTimeout(() => {
                    floatingPizza.style.transform = 'scale(1)';
                }, 400);
            }, 7000);

            // إضافة تأثيرات hover للخطوات
            const steps = document.querySelectorAll('.step');
            steps.forEach(step => {
                step.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(-20px) scale(1.02)';
                });
                
                step.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(-20px)';
                });
            });

            // تأثير تمايل للمكونات
            const ingredients = document.querySelectorAll('.ingredient-item');
            ingredients.forEach((ingredient, index) => {
                setTimeout(() => {
                    ingredient.style.animation = 'none';
                    ingredient.style.transform = 'translateX(-5px)';
                    setTimeout(() => {
                        ingredient.style.transform = 'translateX(0)';
                    }, 200);
                }, index * 50);
            });
        });

        // رسائل تحفيزية عشوائية
        const motivationalMessages = [
            "Mamma mia! البيتزا رائعة! 🍕",
            "Bravissimo! أنت شيف بيتزا حقيقي! 👨‍🍳",
            "Perfetto! البيتزا إيطالية أصلية! 🇮🇹",
            "Delizioso! طعم لا يُقاوم! 😋"
        ];

        // عرض رسالة تحفيزية عند الانتهاء من التمرير
        let scrollEndTimer;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(() => {
                if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - 100) {
                    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
                    showNotification(randomMessage);
                }
            }, 1000);
        });