
        // تفعيل تقييم النجوم
        const starInputs = document.querySelectorAll('.star-input');
        let selectedRating = 0;

        starInputs.forEach((star, index) => {
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                updateStars();
            });

            star.addEventListener('mouseenter', () => {
                highlightStars(index + 1);
            });
        });

        function updateStars() {
            starInputs.forEach((star, index) => {
                if (index < selectedRating) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
        }

        function highlightStars(rating) {
            starInputs.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('hover');
                } else {
                    star.classList.remove('hover');
                }
            });
        }

        // إضافة تعليق جديد
        const submitBtn = document.querySelector('.submit-comment');
        const textarea = document.querySelector('textarea');

        submitBtn.addEventListener('click', () => {
            if (textarea.value.trim() && selectedRating > 0) {
                alert('شكراً لك! تم إضافة تعليقك بنجاح 😊');
                textarea.value = '';
                selectedRating = 0;
                updateStars();
            } else {
                alert('الرجاء كتابة تعليق واختيار تقييم');
            }
        });

        // تفعيل أزرار الإعجاب
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const currentText = this.textContent;
                const currentCount = parseInt(currentText.match(/\d+/)[0]);
                this.textContent = `👍 مفيد (${currentCount + 1})`;
                this.style.background = '#e8f5e8';
                this.disabled = true;
            });
        });
    