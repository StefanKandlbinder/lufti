import { Component, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'lufti-face',
  styleUrl: 'lufti-face.css',
  shadow: true
})

export class LuftiFace {
  raf = null;
  duration: number = 500;

  @State() mouth: number = 270;
  @State() eyeLeft: number = 30;
  @State() eyeRight: number = 30;
  @State() eyeBallLeft: number = 85;

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
      elapsed: 0
    }

		let step = now => {
			time.elapsed = now - time.start;
			const progress = time.elapsed / time.total;

			if (progress <= 1.1) {
        this.raf = window.requestAnimationFrame(step);
        this.animateMouth(progress, from, to)
        this.animateEyeLeft(progress, from, to)
        this.animateEyeBallLeft(progress, from, to)
			}
			else {
				window.cancelAnimationFrame(this.raf);
			}
		}

		this.raf = window.requestAnimationFrame(step);
  }

  animateMouth(progress, from, to) {
    const _from = (from > 100) ? 170 : (220 - from) + 50;
    const _to = (to > 100) ? 170 : (220 - to) + 50;
    const goTo = Math.abs(_from - _to);

    if (_to > _from && this.mouth) {
      this.mouth = Math.round((progress * goTo) + _from);
    }
    else {
      this.mouth = _from - Math.round((progress * goTo));
    }
  }

  animateEyeLeft(progress, from, to) {
    const _from = (from > 100) ? 60 : this.mapTo(from, 0, 100, 30, 60);
    const _to = (to > 100) ? 60 : this.mapTo(to, 0, 100, 30, 60);
    const goTo = Math.abs(_from - _to);

    if (_to > _from && this.eyeLeft) {
      this.eyeLeft = Math.round((progress * goTo) + _from);
    }
    else {
      this.eyeLeft = _from - Math.round((progress * goTo));
    }
  }

  animateEyeBallLeft(progress, from, to) {
    const _from = (from > 100) ? 100 : this.mapTo(from, 0, 100, 85, 100);
    const _to = (to > 100) ? 100 : this.mapTo(to, 0, 100, 85, 100);
    const goTo = Math.abs(_from - _to);

    if (_to > _from && this.eyeLeft) {
      this.eyeBallLeft = Math.round((progress * goTo) + _from);
    }
    else {
      this.eyeBallLeft = _from - Math.round((progress * goTo));
    }
  }

  mapTo(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  render() {
    let mouth = `M40 180 Q70 220, 140 ${this.mouth} T 260 220`
    let eyeLeft = <g>
        <ellipse cx="90" cy="65" rx="30" ry={this.eyeLeft} fill="rgba(255, 255, 255, 0.9)" stroke="white"/>
        <circle cx="90" cy={this.eyeBallLeft} r="10" fill="rgba(0, 0, 0, 0.9)" stroke="white"></circle>
      </g>
    let eyeRight = <g>
        <ellipse cx="190" cy="65" rx="30" ry={this.eyeRight} fill="rgba(255, 255, 255, 0.9)" stroke="white"/>
        <circle cx="190" cy="85" r="10" fill="rgba(0, 0, 0, 0.9)" stroke="white"></circle>
      </g>

    return (
      <svg id="lufti-face" viewBox="0 0 300 300">
        <path id="lufti-face__mouth" d={mouth} stroke="white" fill="transparent"/>
        {eyeLeft}
        {eyeRight}
      </svg>
    )
  }
}
