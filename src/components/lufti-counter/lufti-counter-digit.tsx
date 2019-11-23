import { Component, h, Prop, Watch, Host } from '@stencil/core';

@Component({
  tag: 'lufti-counter-digit',
  styleUrl: 'lufti-counter-digit.css',
  shadow: true
})

export class LuftiCounterDigit {
  raf = null;
  duration: number = 300;
  digitElement: HTMLSpanElement;
  thisElement: HTMLElement;

  @Prop({ mutable: true }) height: number = 0;
  @Prop({ mutable: true, reflect:true }) digit: number = 0;
  @Watch('digit')
  watchHandler(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.animate();
    }
  }

  componentDidLoad() {
    this.thisElement.style.height = this.height.toString() + "px";
    this.animate();
  }

  inOutQuad(n) {
      n *= 2;
      if (n < 1) return 0.5 * n * n;
      return - 0.5 * (--n * (n - 2) - 1);
  }

  easeInOutCubic (t) {
    return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
  }

  easeInOutQuint (t) {
    return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
  }

  animate() {
		window.cancelAnimationFrame(this.raf);

		const time = {
			start: performance.now(),
      total: this.duration,
      elapsed: 0
    }

		let step = now => {
			time.elapsed = now - time.start;
			let progress = time.elapsed / time.total;

			if (progress <= 1) {
        progress = this.easeInOutQuint(progress);

        this.raf = window.requestAnimationFrame(step);
        this.digitElement.style.transform = `translateY(${-Math.round(progress * this.digit * 10)}%)`
			}
			else {
				window.cancelAnimationFrame(this.raf);
			}
		}

		this.raf = window.requestAnimationFrame(step);
  }

  render() {
    return (
      <Host ref={el => this.thisElement = el}>
        <span
          ref={el => this.digitElement = el}
          class="lufti-counter-digit">
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
        </span>
      </Host>
    )
  }
}
