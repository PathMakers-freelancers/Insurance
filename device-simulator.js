document.addEventListener('DOMContentLoaded', () => {
    // Create Simulator UI
    const simulatorDiv = document.createElement('div');
    simulatorDiv.className = 'device-simulator-controls';
    simulatorDiv.innerHTML = `
        <button class="device-btn active" data-view="desktop" title="Desktop View"><i class="fas fa-desktop"></i></button>
        <button class="device-btn" data-view="tablet" title="Tablet View"><i class="fas fa-tablet-alt"></i></button>
        <button class="device-btn" data-view="mobile" title="Mobile View"><i class="fas fa-mobile-alt"></i></button>
    `;
    document.body.appendChild(simulatorDiv);

    const body = document.body;
    const btns = simulatorDiv.querySelectorAll('.device-btn');

    // Wrapper for content if not exists to constrain width
    // We need to wrap everything except the simulator controls in a container if we want to simulate properly
    // But simplistic approach: use a specific class on body or html to constrain max-width of a wrapper

    // Better approach: Wrap all children of body (except simulator) in a div
    const wrapper = document.createElement('div');
    wrapper.id = 'device-wrapper';
    wrapper.style.width = '100%';
    wrapper.style.margin = '0 auto';
    wrapper.style.transition = 'max-width 0.3s ease, border 0.3s ease, box-shadow 0.3s ease';
    wrapper.style.minHeight = '100vh';
    wrapper.style.backgroundColor = 'var(--bg-body)'; // Ensure bg matches

    while (document.body.firstChild) {
        if (document.body.firstChild === simulatorDiv) {
            break; // Don't move the simulator
        }
        wrapper.appendChild(document.body.firstChild);
    }
    document.body.insertBefore(simulatorDiv, document.body.firstChild); // Ensure simulator is first or just absolute fixed
    document.body.appendChild(wrapper);

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view;
            if (view === 'desktop') {
                wrapper.style.maxWidth = '100%';
                wrapper.style.border = 'none';
            } else if (view === 'tablet') {
                wrapper.style.maxWidth = '768px';
                wrapper.style.borderLeft = '10px solid #333';
                wrapper.style.borderRight = '10px solid #333';
                wrapper.style.boxShadow = '0 0 50px rgba(0,0,0,0.5)';
            } else if (view === 'mobile') {
                wrapper.style.maxWidth = '375px';
                wrapper.style.borderLeft = '10px solid #333';
                wrapper.style.borderRight = '10px solid #333';
                wrapper.style.boxShadow = '0 0 50px rgba(0,0,0,0.5)';
            }
        });
    });
});
