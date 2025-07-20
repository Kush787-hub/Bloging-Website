// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const cardholders = document.querySelectorAll('.cardholder');
const shareBtns = document.querySelectorAll('.share-btn');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

// Search Functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.cardholder');
    
    cards.forEach(card => {
        const title = card.querySelector('.card_heading').textContent.toLowerCase();
        const description = card.querySelector('.card_description').textContent.toLowerCase();
        const author = card.querySelector('.author_name').textContent.toLowerCase();
        const category = card.querySelector('.card_tag a').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       author.includes(searchTerm) || 
                       category.includes(searchTerm);
        
        if (matches || searchTerm === '') {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide load more button based on visible cards
    const visibleCards = document.querySelectorAll('.cardholder[style*="block"], .cardholder:not([style*="none"])');
    loadMoreBtn.style.display = visibleCards.length > 0 ? 'block' : 'none';
}

// Category Filtering
function filterByCategory(category) {
    const cards = document.querySelectorAll('.cardholder');
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide load more button
    const visibleCards = document.querySelectorAll('.cardholder[style*="block"]');
    loadMoreBtn.style.display = visibleCards.length > 0 ? 'block' : 'none';
}

// Load More Functionality
function loadMoreArticles() {
    // Simulate loading more articles
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        // Create new article cards (you can replace this with actual data)
        const mainContainer = document.querySelector('.main_container');
        const newArticles = [
            {
                category: 'technology',
                image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop',
                title: 'The Rise of Edge Computing in 2024',
                description: 'Discover how edge computing is revolutionizing data processing and reducing latency.',
                author: 'Alex Thompson',
                date: 'Dec 9, 2024',
                readingTime: '6 min read'
            },
            {
                category: 'lifestyle',
                image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop',
                title: 'Mindful Living: A Complete Guide',
                description: 'Learn practical techniques for incorporating mindfulness into your daily routine.',
                author: 'Maria Rodriguez',
                date: 'Dec 8, 2024',
                readingTime: '8 min read'
            }
        ];
        
        newArticles.forEach(article => {
            const newCard = createArticleCard(article);
            mainContainer.appendChild(newCard);
            newCard.classList.add('fade-in');
        });
        
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
        
        // Hide load more button if no more articles
        if (newArticles.length < 2) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

// Create Article Card
function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'cardholder';
    card.setAttribute('data-category', article.category);
    
    card.innerHTML = `
        <a href="#" class="card_image_container">
            <img src="${article.image}" alt="${article.title}" class="card_image">
            <div class="card-overlay">
                <span class="reading-time"><i class="fas fa-clock"></i> ${article.readingTime}</span>
            </div>
        </a>

        <div class="card_text">
            <a href="#" class="card_title_anchor">
                <h2 class="card_heading">${article.title}</h2>
                <p class="card_description">${article.description}</p>
            </a>
        </div>

        <div class="card_footer">
            <div class="author">
                <div class="avatar">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author}&size=64" class="author_avatar" alt="${article.author}">
                </div>
                <div class="author_info">
                    <span class="author_name">${article.author}</span>
                    <span class="author_date">${article.date}</span>
                </div>
            </div>
            <div class="card_tag">
                <a href="">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</a>
            </div>
        </div>

        <div class="share-buttons">
            <button class="share-btn" title="Share on Twitter">
                <i class="fab fa-twitter"></i>
            </button>
            <button class="share-btn" title="Share on Facebook">
                <i class="fab fa-facebook"></i>
            </button>
            <button class="share-btn" title="Share on LinkedIn">
                <i class="fab fa-linkedin"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Share Functionality
function shareArticle(platform, title, url) {
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
}

// Image Loading Error Handling
function handleImageError(img) {
    img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16">Image not available</text></svg>';
}

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('.card_image, .author_avatar');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('skeleton');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('skeleton');
        imageObserver.observe(img);
    });
}

// Smooth Scrolling for Navigation Links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
    // Search on Enter key
    if (e.key === 'Enter' && document.activeElement === searchInput) {
        performSearch();
    }
    
    // Theme toggle on Ctrl+T
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
}

// Performance Optimization: Debounce Search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedSearch = debounce(performSearch, 300);

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Add fade-in animation to existing cards
    cardholders.forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Lazy load images
    lazyLoadImages();
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Search functionality
    searchInput.addEventListener('input', debouncedSearch);
    searchBtn.addEventListener('click', performSearch);
    
    // Category filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    // Load more articles
    loadMoreBtn.addEventListener('click', loadMoreArticles);
    
    // Mobile navigation
    navToggle.addEventListener('click', toggleMobileNav);
    
    // Share buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.share-btn')) {
            const shareBtn = e.target.closest('.share-btn');
            const card = shareBtn.closest('.cardholder');
            const title = card.querySelector('.card_heading').textContent;
            const url = window.location.href;
            
            if (shareBtn.querySelector('.fa-twitter')) {
                shareArticle('twitter', title, url);
            } else if (shareBtn.querySelector('.fa-facebook')) {
                shareArticle('facebook', title, url);
            } else if (shareBtn.querySelector('.fa-linkedin')) {
                shareArticle('linkedin', title, url);
            }
        }
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target !== '#') {
                smoothScrollTo(target);
            }
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
    
    // Add loading states for better UX
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    cardholders.forEach(card => {
        observer.observe(card);
    });
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for potential external use
window.BlogApp = {
    toggleTheme,
    performSearch,
    filterByCategory,
    loadMoreArticles,
    shareArticle
}; 