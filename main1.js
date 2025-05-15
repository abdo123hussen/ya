// كود JavaScript الخاص بصفحة الاتصال
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من نموذج الاتصال
    const contactPageForm = document.getElementById('contactPageForm');
    
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };
            
            // هنا يمكنك إضافة كود إرسال النموذج إلى الخادم
            console.log('تم إرسال نموذج الاتصال:', formData);
            
            // عرض رسالة نجاح
            alert(`شكراً ${formData.name}، تم استلام رسالتك وسنتواصل معك قريباً.`);
            
            // إعادة تعيين النموذج
            contactPageForm.reset();
        });
    }
    
    // تحسين تجربة الخريطة
    const mapIframe = document.querySelector('.map-container iframe');
    
    if (mapIframe) {
        // إضافة مؤشر تحميل للخريطة
        mapIframe.style.opacity = '0';
        mapIframe.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
        
        // يمكنك إضافة المزيد من التفاعلات مع الخريطة هنا
    }
});