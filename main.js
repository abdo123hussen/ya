// ملف script.js - الوظائف التفاعلية لموقع HD راغب أغا

document.addEventListener('DOMContentLoaded', function() {
    // ============== القائمة المتنقلة ==============
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // تغيير لون الهيدر عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.fixed-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // ============== شريط التمرير الرئيسي ==============
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // إنشاء نقاط التمرير
    function createDots() {
        slides.forEach((_, index) => {
            dotsContainer.insertAdjacentHTML('beforeend', 
                `<button class="dot" data-slide="${index}"></button>`);
        });
    }

    // تفعيل النقطة الحالية
    function activateDot(slide) {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });
        
        document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('active');
    }

    // عرض الشريحة المحددة
    function goToSlide(slide) {
        slides.forEach((s, i) => {
            s.style.opacity = i === slide ? '1' : '0';
            s.style.zIndex = i === slide ? '1' : '0';
        });
        currentSlide = slide;
        activateDot(slide);
    }

    // الشريحة التالية
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    // الشريحة السابقة
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    // بدء التمرير التلقائي
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // التهيئة
    function initSlider() {
        createDots();
        goToSlide(0);
        startSlider();
    }

    // الأحداث
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        startSlider();
    });

    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        startSlider();
    });

    dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            clearInterval(slideInterval);
            const slide = parseInt(e.target.getAttribute('data-slide'));
            goToSlide(slide);
            startSlider();
        }
    });

    // بدء التشغيل
    initSlider();

    // ============== تبويبات الخدمات ==============
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار والمحتويات
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // تفعيل الزر والمحتوى المحدد
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ============== تصفية المشاريع ==============
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // تفعيل الزر المحدد
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // تصفية المشاريع
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ============== نموذج الاتصال ==============
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // هنا يمكنك إضافة كود إرسال النموذج إلى الخادم
            console.log('تم إرسال النموذج:', formData);
            
            // عرض رسالة نجاح
            alert(`شكراً ${formData.name}، تم استلام رسالتك وسنتواصل معك قريباً.`);
            
            // إعادة تعيين النموذج
            contactForm.reset();
        });
    }

    // ============== زر العودة للأعلى ==============
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============== التمرير السلس للروابط ==============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============== تفعيل Fancybox للمعرض ==============
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // خيارات Fancybox هنا
        });
    }

    // ============== تأثيرات الظهور عند التمرير ==============
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .service-card, .project-card, .info-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيلها مرة عند التحميل
});

// ============== تأثيرات إضافية ==============
// يمكنك إضافة المزيد من التأثيرات هنا حسب الحاجة

// تأثيرات الحركة عند التحميل
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // تأخير تحميل الصور غير الضرورية
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    lazyImages.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });
});