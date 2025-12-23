function showTab(tabId) {
    // 1. Hide all package containers
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => container.classList.remove('active'));

    // 2. Show the selected container
    const activeContainer = document.getElementById(tabId);
    if(activeContainer) activeContainer.classList.add('active');

    // Reset sort selection whenever a new tab is shown
    document.getElementById('price-sort').value = 'default';
    sortPackages(activeContainer);

    // 3. Deactivate all tab buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 4. Activate the clicked button
    const activeButton = document.querySelector(`.tabs button[onclick*="${tabId}"]`);
    if(activeButton) activeButton.classList.add('active');
}

// New Feature: Price Sorting
function sortPackages(container = null) {
    // Get the currently active container if one wasn't passed (e.g., from the dropdown change)
    if (!container) {
        container = document.querySelector('.container.active');
    }
    
    if (!container) return; // Exit if no active container

    const sortValue = document.getElementById('price-sort').value;
    const cards = Array.from(container.querySelectorAll('.card'));

    // Sorting logic
    cards.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));

        if (sortValue === 'low-to-high') {
            return priceA - priceB;
        } else if (sortValue === 'high-to-low') {
            return priceB - priceA;
        }
        // If default, maintain original order (though DOM manipulation might reset it)
        return 0; 
    });

    // Re-append sorted cards to the container
    cards.forEach(card => container.appendChild(card));
}


// New Feature: Order Handler with Confirmation Feedback
function handleOrder(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const packageName = button.getAttribute('data-package-name');
    const telegramUsername = 'kido1222'; 
    
    // 1. Button Confirmation Feedback
    const originalText = button.innerHTML;
    button.innerHTML = 'ትዕዛዝ ተልኳል! ✅';
    button.classList.add('confirmed');

    // Reset button text after a short delay (for visual feedback)
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('confirmed');
    }, 2000); // 2 seconds

    // 2. Telegram Logic
    const amharicPhrase = "ዌብሳይታችሁ ላይ ካየሁት ፓኬጅ ውስጥ ይሄንን ማዘዝ እፈልጋለው";
    const callToAction = "አመሰግናለው";

    // Construct the full message
    const message = `ሰላም @${telegramUsername}፣\n\n${amharicPhrase}:\n\n*${packageName}*\n\n${callToAction}`;
    
    const encodedMessage = encodeURIComponent(message);

    // Construct the Telegram URL
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;

    // Redirect the user directly to the Telegram app/web in a new tab
    window.open(telegramUrl, '_blank');
}

// Set the default tab on page load and attach Telegram functionality
document.addEventListener('DOMContentLoaded', () => {
    // Set default tab
    showTab('beal'); 
    
    // Attach the click handler to all 'Order Now' buttons
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', handleOrder);
    });
});