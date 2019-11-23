class Rippler {
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
          width: 1px;
          height: 1px;
          outline: none;
          border: 0;
          color: transparent;
          -webkit-tap-highlight-color: transparent;
          line-height: 0;
          background: var(--lufti-color-primary);
          opacity: 0
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          will-change: box-shadow;
          animation: pulse 1000ms;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 var(--lufti-color-primary);
            opacity: 1;
          }
          100% {
            box-shadow: 0 0 0 70px rgba(255, 255, 255, 0);
          }
        }
    `;

    ripple.appendChild(style);
    ripple.classList.add("lufti-ripple");
    ripple.setAttribute("style", `left: ${x}px; top: ${y}px`);
    caller.appendChild(ripple);

    this.rippleTimeout = setTimeout(() => {
      caller.removeChild(ripple);
    }, 1000);
  }
}

export const Ripple = new Rippler();

