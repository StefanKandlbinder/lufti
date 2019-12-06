class Rippler {
  rippleTimeout = null;

  showRipple(event) {
    const caller = event.currentTarget;
    const boundaries = caller.getBoundingClientRect();

    let x = (event.pageX - boundaries.left);
    let y = (event.pageY - boundaries.top);

    const ripple = document.createElement('div');
    const style = document.createElement('style');

    style.innerHTML = `
        .lufti-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          border-radius: 50%;
          width: 70px;
          height: 70px;
          outline: none;
          border: 0;
          color: transparent;
          -webkit-tap-highlight-color: transparent;
          line-height: 0;
          background: var(--lufti-color-primary);
          opacity: 0;
          transform: scale(0);
          will-change: transform, opacity;
          animation: pulse 700ms;
        }

        @keyframes pulse {
          0% {
            opacity: 0;
            transform: scale(0.2);
          }
          20% {
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
    `;

    ripple.appendChild(style);
    ripple.classList.add("lufti-ripple");
    ripple.setAttribute("style", `left: ${x -35}px; top: ${y - 35}px`);
    caller.appendChild(ripple);

    this.rippleTimeout = setTimeout(() => {
      caller.removeChild(ripple);
    }, 10000);
  }
}

export const Ripple = new Rippler();

