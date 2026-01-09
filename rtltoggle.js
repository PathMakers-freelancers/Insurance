document.addEventListener('DOMContentLoaded', () => {
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const htmlElement = document.documentElement;
    
    // Check saved preference
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);
    updateRtlIcon(savedDir);

    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRtlIcon(newDir);
        });
    }

    function updateRtlIcon(dir) {
        if (!rtlToggleBtn) return;
        // You can change icon inside the button if you want
        rtlToggleBtn.innerHTML = dir === 'ltr' ? 'RTL' : 'LTR';
    }
});
