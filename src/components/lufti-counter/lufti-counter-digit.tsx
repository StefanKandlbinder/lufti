import { Component, h, Prop, Watch, Host, State } from '@stencil/core';

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

  @State() digitTransform: number = 0;
  @Prop({ mutable: true }) height: number = 0;
  @Prop({ mutable: true, reflect:true }) digit: number = 0;
  @Watch('digit')
  watchHandler(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.animate(oldValue * 10, newValue * 10);
    }
  }

  componentDidLoad() {
    this.thisElement.style.height = this.height.toString() + "px";
    // this.animate();
  }

  /* https://gist.github.com/gre/1650294 */
  easeInOutQuint (t) {
    return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
  }

  mapTo(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  animate(from, to) {
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
        this.animateDigit(progress, from, to);
			}
			else {
				window.cancelAnimationFrame(this.raf);
			}
		}

		this.raf = window.requestAnimationFrame(step);
  }

  animateDigit(progress, from, to) {
    const goTo = Math.abs(from - to);
    // const goTo = this.mapTo(to, from, to, 0, 100);

    // console.info(from, to, _from, _to, goTo);

    if (to > from) {
      // this.digitElement.style.transform = `translateY(${-Math.round(goTo)}%)`
      this.digitTransform = Math.round((progress * goTo) + from);
    }
    else {
      this.digitTransform = from - Math.round((progress * goTo));
    }
  }

  render() {
    let transform = (this.digitTransform).toString();

    return (
      <Host ref={el => this.thisElement = el}>
        <span
          style={{transform: `translateY(-${transform}%)`}}
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
