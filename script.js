document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initTimeDisplay();
    initGreeting();
    initTypewriter();
    initSearch();
    initStats();
    initFAQ();
    initLoginModal();
    initButtons();
});

function initParticles() {
    var container = document.getElementById('particles');
    var particleCount = 20;
    
    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

function initTimeDisplay() {
    var timeDisplay = document.getElementById('timeDisplay');
    
    function updateTime() {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        timeDisplay.textContent = hours + ':' + minutes + ':' + seconds;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

function initGreeting() {
    var greetingText = document.getElementById('greetingText');
    var now = new Date();
    var hour = now.getHours();
    
    var greeting;
    if (hour < 6) {
        greeting = 'Good night, rest well';
    } else if (hour < 9) {
        greeting = 'Good morning, new day begins';
    } else if (hour < 12) {
        greeting = 'Good morning, have a nice day';
    } else if (hour < 14) {
        greeting = 'Good noon, take a break';
    } else if (hour < 18) {
        greeting = 'Good afternoon, keep going';
    } else if (hour < 22) {
        greeting = 'Good evening, nice day';
    } else {
        greeting = 'Good night, sweet dreams';
    }
    
    greetingText.textContent = greeting;
}

function initTypewriter() {
    var typewriterText = document.getElementById('typewriterText');
    var cursor = document.getElementById('cursor');
    var messages = [
        'Your intelligent assistant is ready',
        'Ask me anything you want to know',
        'I am here to help you 24/7',
        'Let is start our conversation'
    ];
    var messageIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 100;
    
    function type() {
        var currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

function initSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchBtn = document.getElementById('searchBtn');
    
    function performSearch() {
        var query = searchInput.value.trim();
        if (query) {
            showNotification('Searching: ' + query);
            searchInput.value = '';
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function initStats() {
    var serviceCount = document.getElementById('serviceCount');
    var userCount = document.getElementById('userCount');
    var accuracy = document.getElementById('accuracy');
    
    animateNumber(serviceCount, 12847);
    animateNumber(userCount, 856);
    animateNumber(accuracy, 99);
}

function animateNumber(element, targetCount) {
    var count = 0;
    var duration = 2000;
    var startTime = Date.now();
    
    function update() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        count = Math.floor(targetCount * easeOut);
        element.textContent = count.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function initFAQ() {
    var faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            var answer = this.nextElementSibling;
            this.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
}

function initLoginModal() {
    var loginBtn = document.getElementById('loginBtn');
    var closeBtn = document.getElementById('closeModal');
    var modal = document.getElementById('loginModal');
    var loginForm = document.getElementById('loginForm');
    
    loginBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var username = document.getElementById('username').value;
        showNotification('Welcome back, ' + username + '!');
        modal.style.display = 'none';
        loginForm.reset();
    });
}

function initButtons() {
    var getStartedBtn = document.getElementById('getStarted');
    var learnMoreBtn = document.getElementById('learnMore');
    
    getStartedBtn.addEventListener('click', function() {
        showNotification('Ready! Starting service...');
    });
    
    learnMoreBtn.addEventListener('click', function() {
        showNotification('More features coming soon...');
    });
}

function showNotification(message) {
    var notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '16px 24px';
    notification.style.borderRadius = '12px';
    notification.style.fontSize = '16px';
    notification.style.zIndex = '1000';
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        notification.style.transition = 'all 0.3s ease-out';
        
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 2000);
}