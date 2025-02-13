// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');

// Facebook Pixel
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'XXXXXXXXXX');
fbq('track', 'PageView');

// Track scroll depth
let scrollDepthTracked = new Set();

window.addEventListener('scroll', function() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    
    [25, 50, 75, 90].forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthTracked.has(milestone)) {
            scrollDepthTracked.add(milestone);
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': `${milestone}%`
            });
        }
    });
});

// Track CTA button clicks
document.querySelectorAll('a[href="#apply"]').forEach(button => {
    button.addEventListener('click', function() {
        gtag('event', 'cta_click', {
            'event_category': 'Engagement',
            'event_label': 'Apply Now Button'
        });
        fbq('track', 'InitiateCheckout');
    });
});
