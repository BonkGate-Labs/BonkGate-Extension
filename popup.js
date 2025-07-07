// BonkGate Popup Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('BonkGate Extension loaded');
    
    // Check if extension is active on current tab
    checkActiveStatus();
    
    // Add event listeners to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            openFeatureInNewTab(item);
        });
    });
    
    // Add listeners for footer links
    document.querySelectorAll('.footer a').forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
    
    // Premium button
    const premiumButton = document.querySelector('.premium-prompt a');
    if (premiumButton) {
        premiumButton.addEventListener('click', (e) => {
            e.preventDefault();
            openTabWithUrl('https://www.bonkgate.fun/');
        });
    }
});

// Check if extension is active on current tab
function checkActiveStatus() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        const url = currentTab.url;
        
        const statusBadge = document.querySelector('.status-badge');
        
        if (url.includes('twitter.com') || url.includes('x.com')) {
            statusBadge.textContent = 'Active on X/Twitter';
            statusBadge.classList.add('bg-green-500', 'bg-opacity-20', 'text-green-400');
            statusBadge.classList.remove('bg-red-500', 'bg-opacity-20', 'text-red-400');
        } else {
            statusBadge.textContent = 'Not active on this page';
            statusBadge.classList.add('bg-red-500', 'bg-opacity-20', 'text-red-400');
            statusBadge.classList.remove('bg-green-500', 'bg-opacity-20', 'text-green-400');
        }
    });
}

// Open feature in documentation
function openFeatureInNewTab(featureElement) {
    const featureName = featureElement.textContent.trim();
    let url = 'https://www.bonkgate.fun/';
    
    switch (featureName) {
        case 'Deleted Tweets':
            url += '#deleted-tweets';
            break;
        case 'CA Tracking':
            url += '#ca-tracking';
            break;
        case 'First Followers':
            url += '#first-followers';
            break;
        case 'Profile Changes':
            url += '#profile-changes';
            break;
        case 'Key Followers':
            url += '#key-followers';
            break;
        case 'Real-time Alerts':
            url += '#real-time-alerts';
            break;
        default:
            url += '#features';
    }
    
    openTabWithUrl(url);
}

// Handle link clicks
function handleLinkClick(e) {
    e.preventDefault();
    const linkText = e.target.textContent;
    let url;
    
    switch (linkText) {
        case 'Website':
            url = 'https://www.bonkgate.fun/';
            break;
        case 'Twitter/X':
            url = 'https://x.com/bonkgate';
            break;
        default:
            url = 'https://www.bonkgate.fun/';
    }
    
    openTabWithUrl(url);
}

// Helper to open a new tab with URL
function openTabWithUrl(url) {
    chrome.tabs.create({ url });
} 