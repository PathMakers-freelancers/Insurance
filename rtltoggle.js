(function () {
    function initRTLToggle() {
        const rtlToggleBtn = document.getElementById('rtl-toggle');
        const htmlElement = document.documentElement;

        // Check saved preference
        const savedDir = localStorage.getItem('dir') || 'ltr';
        htmlElement.setAttribute('dir', savedDir);
        updateRtlIcon(savedDir);

        if (rtlToggleBtn) {
            // Remove any existing listeners to avoid duplicates
            rtlToggleBtn.onclick = function () {
                const currentDir = htmlElement.getAttribute('dir');
                const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

                htmlElement.setAttribute('dir', newDir);
                localStorage.setItem('dir', newDir);
                updateRtlIcon(newDir);

                console.log('RTL Toggle: Direction changed to ' + newDir);
            };
            console.log('RTL Toggle: Initialized successfully');
        } else {
            console.error('RTL Toggle: Button with id="rtl-toggle" not found');
        }

        function updateRtlIcon(dir) {
            if (!rtlToggleBtn) return;
            // Optional: Toggle icon styling if needed
            rtlToggleBtn.classList.toggle('active', dir === 'rtl');
        }
    }

    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRTLToggle);
    } else {
        initRTLToggle();
    }
})();
