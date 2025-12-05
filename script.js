// Function to update a single unit (Hours, Minutes, or Seconds)
function updateUnit(unitName, newValue) {
    // Select the card for the given unit
    const card = document.querySelector(`.flip-unit[data-unit="${unitName}"] .flip-card`);
    
    // Get the current fixed value from the top half
    const currentVal = card.querySelector('.top-half').textContent;

    // Only proceed with flip if the value has changed
    if (currentVal !== newValue) {
        
        // 1. Get the current and next digit elements
        const topHalf = card.querySelector('.top-half');
        const bottomHalf = card.querySelector('.bottom-half');
        const flipTop = card.querySelector('.flip-top');
        const flipBottom = card.querySelector('.flip-bottom');

        // 2. Setup the flipping pieces
        // The top piece that flips down shows the OLD value
        flipTop.setAttribute('data-old', currentVal);
        // The bottom piece that flips up shows the NEW value
        flipBottom.setAttribute('data-new', newValue);

        // 3. Set the fixed elements to the OLD value initially
        topHalf.textContent = currentVal;
        bottomHalf.textContent = currentVal;

        // 4. Trigger the animation by adding the class
        card.classList.add('do-flip');

        // 5. After the animation completes (1 second total), update fixed values and reset
        setTimeout(() => {
            // Update the fixed halves to the NEW value
            topHalf.textContent = newValue;
            bottomHalf.textContent = newValue;
            
            // Remove the class to prepare for the next flip
            card.classList.remove('do-flip');
            
            // Reset data attributes just in case
            flipTop.setAttribute('data-old', newValue);
            flipBottom.setAttribute('data-new', newValue);

        }, 1000); // Wait for the 1s animation to finish
    }
}

// Main function to get the time and update all units
function updateClock() {
    const now = new Date();
    
    // Get 24-hour clock (or use modulo for 12-hour: (now.getHours() % 12) || 12)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Update each unit
    updateUnit('hours', hours);
    updateUnit('minutes', minutes);
    updateUnit('seconds', seconds);
}

// Initialize the clock
updateClock(); 

// Set an interval to update the clock every second (1000ms)
setInterval(updateClock, 1000);