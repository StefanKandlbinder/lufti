import { Component, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'lufti-face',
  styleUrl: 'lufti-face.css',
  shadow: true
})

export class LuftiFace {
  raf = null;
  duration: number = 500;

  @State() mouth: number = 150;
  @Prop({ mutable: true, reflect:true }) mood: number = 0;
  @Watch('mood')
  watchHandler(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.animate(oldValue, newValue);
    }
  }

  animate(from, to) {
		window.cancelAnimationFrame(this.raf);

		const time = {
			start: performance.now(),
      total: this.duration,
      elapsed: 0,
      from: (from > 100) ? 50 : (100 - from) + 50,
      to: (to > 100) ? 50 : (100 - to) + 50,
    }

    const goTo = Math.abs(time.from - time.to);

		let step = now => {
			time.elapsed = now - time.start;
			const progress = time.elapsed / time.total;

			if (progress <= 1.1) {
        this.raf = window.requestAnimationFrame(step);
        if (time.to > time.from && this.mouth) {
          this.mouth = Math.round((progress * goTo) + time.from);
        }
        else {
          this.mouth = time.from - Math.round((progress * goTo));
        }

        console.info(time.from, time.to, goTo, this.mouth);
			}
			else {
				window.cancelAnimationFrame(this.raf);
			}
		}

		this.raf = window.requestAnimationFrame(step);
  }

  render() {
    let mouth = `M 40 80 Q 70 120, 150 ${this.mouth} T 260 120`

    return (
      <svg id="lufti-face" viewBox="0 0 300 200">
        <path id="lufti-face__mouth" d={mouth} stroke="white" fill="transparent"/>
      </svg>
    )
  }
}
