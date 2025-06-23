// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 슬라이더 기능
    const slides = document.querySelectorAll('.slide');
    const navBtns = document.querySelectorAll('.nav-btn');
    let currentSlide = 0;
    
    // 슬라이드 변경 함수
    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        navBtns[currentSlide].classList.remove('active');
        
        currentSlide = n;
        
        slides[currentSlide].classList.add('active');
        navBtns[currentSlide].classList.add('active');
    }
    
    // 네비게이션 버튼 클릭 이벤트
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => showSlide(index));
    });
    
    // 자동 슬라이드 (5초마다)
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 폼 제출 처리
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 성공 메시지 표시
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.textContent = '신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.';
                
                // 폼 초기화
                this.reset();
                
                // 3초 후 메시지 숨김
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                alert('신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
                this.reset();
            }
        });
    });
    
    // 공지사항 토글 기능
    const noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.querySelector('.notice-content');
            if (content) {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
    
    // 스크롤 애니메이션
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
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.card, .feature-item, .course-card, .instructor-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 부드러운 스크롤
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 헤더 스크롤 효과
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 아래로 스크롤
            header.style.transform = 'translateY(-100%)';
        } else {
            // 위로 스크롤
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 로딩 애니메이션
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// 유틸리티 함수들
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9-+\s()]+$/;
    return re.test(phone);
}

// 폼 유효성 검사
function validateForm(form) {
    const emailInputs = form.querySelectorAll('input[type="email"]');
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    const requiredInputs = form.querySelectorAll('[required]');
    
    let isValid = true;
    
    // 필수 입력 체크
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, '이 필드는 필수입니다.');
            isValid = false;
        } else {
            hideError(input);
        }
    });
    
    // 이메일 유효성 체크
    emailInputs.forEach(input => {
        if (input.value && !validateEmail(input.value)) {
            showError(input, '올바른 이메일 형식을 입력해주세요.');
            isValid = false;
        }
    });
    
    // 전화번호 유효성 체크
    phoneInputs.forEach(input => {
        if (input.value && !validatePhone(input.value)) {
            showError(input, '올바른 전화번호 형식을 입력해주세요.');
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(input, message) {
    hideError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#dc3545';
}

function hideError(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.style.borderColor = '#e1e5e9';
}

// 페이지 이동 시 부드러운 전환 효과
function smoothPageTransition(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// 스크롤 위치 저장 및 복원
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
}); 