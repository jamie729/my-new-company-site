// Fix page scroll position on refresh - ensure page starts at top
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Also fix on page load
window.addEventListener('load', function() {
    if (window.performance && window.performance.navigation.type === 1) {
        window.scrollTo(0, 0);
    }
});

// Fix scroll position after map initialization
window.addEventListener('load', function() {
    // Force scroll to top after a short delay to ensure all scripts have loaded
    setTimeout(function() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 100);
    
    // Additional fix after a longer delay to catch any async operations
    setTimeout(function() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 500);
});

// Prevent any scroll attempts from other scripts
var scrollBlocker = {
    originalScrollTo: window.scrollTo,
    originalScrollBy: window.scrollBy,
    blocked: false,
    
    init: function() {
        var self = this;
        
        // Block scrollTo for the first 1 second after page load
        window.scrollTo = function(x, y) {
            if (!self.blocked && Date.now() - window.performance.timing.navigationStart < 1000) {
                self.blocked = true;
                return;
            }
            self.originalScrollTo.call(window, x, y);
        };
        
        // Block scrollBy for the first 1 second after page load
        window.scrollBy = function(x, y) {
            if (!self.blocked && Date.now() - window.performance.timing.navigationStart < 1000) {
                self.blocked = true;
                return;
            }
            self.originalScrollBy.call(window, x, y);
        };
    }
};

scrollBlocker.init();

// Fix hero background position and size
window.addEventListener('load', function() {
    setTimeout(function() {
        var heroSection = document.querySelector('section.hero');
        if (heroSection) {
            // Force background position to bottom
            heroSection.style.backgroundPosition = 'center bottom';
            
            // Calculate appropriate background size
            var heroHeight = heroSection.offsetHeight;
            var heroWidth = heroSection.offsetWidth;
            var aspectRatio = heroWidth / heroHeight;
            
            // Set background size to fit within the viewport
            heroSection.style.backgroundSize = 'contain';
        }
    }, 100);
});
