function handleLogout() {
    // Clear session storage / local storage
    localStorage.removeItem('user_session');
    // Redirect to home page
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Attach listener to any element with class 'logout-btn'
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    });
});
