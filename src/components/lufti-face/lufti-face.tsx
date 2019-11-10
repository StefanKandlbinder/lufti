import { Component, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'lufti-face',
  styleUrl: 'lufti-face.css',
  shadow: true
})

export class LuftiFace {
  raf = null;
  duration: number = 500;

  @State() mouth: number = 260;
  @State() eyeLeft: number = 30;
  @State() eyeRight: number = 30;
  @State() eyeBallLeft: number = 105;
  @State() eyeBrowLeft: number = 0;
  @State() eyeBrowRight: number = 0;

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
        this.animateEyeBrowLeft(progress, from, to)
        this.animateEyeBrowRight(progress, from, to)
			}
			else {
				window.cancelAnimationFrame(this.raf);
			}
		}

		this.raf = window.requestAnimationFrame(step);
  }

  animateMouth(progress, from, to) {
    const _from = (from > 50) ? 190 : this.mapTo(from, 0, 50, 260, 190);
    const _to = (to > 50) ? 190 : this.mapTo(to, 0, 50, 260, 190);
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
    const _from = (from > 100) ? 120 : this.mapTo(from, 0, 100, 105, 120);
    const _to = (to > 100) ? 120 : this.mapTo(to, 0, 100, 105, 120);
    const goTo = Math.abs(_from - _to);

    if (_to > _from && this.eyeLeft) {
      this.eyeBallLeft = Math.round((progress * goTo) + _from);
    }
    else {
      this.eyeBallLeft = _from - Math.round((progress * goTo));
    }
  }

  animateEyeBrowLeft(progress, from, to) {
    const _from = (from > 100) ? -20 : this.mapTo(from, 0, 100, 10, -20);
    const _to = (to > 100) ? -20 : this.mapTo(to, 0, 100, 10, -20);
    const goTo = Math.abs(_from - _to);

    if (_to > _from && this.eyeBrowLeft) {
      this.eyeBrowLeft = Math.round((progress * goTo) + _from);
    }
    else {
      this.eyeBrowLeft = _from - Math.round((progress * goTo));
    }
  }

  animateEyeBrowRight(progress, from, to) {
    const _from = (from > 100) ? 40 : this.mapTo(from, 0, 100, 20, 40);
    const _to = (to > 100) ? 40 : this.mapTo(to, 0, 100, 20, 40);
    const goTo = Math.abs(_from - _to);

    if (_to > _from && this.eyeBrowLeft) {
      this.eyeBrowRight = Math.round((progress * goTo) + _from);
    }
    else {
      this.eyeBrowRight = _from - Math.round((progress * goTo));
    }
  }

  mapTo(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  render() {
    let mouth = `M40 200 Q70 240, 140 ${this.mouth} T 260 240`;
    let eyeBrowLeft = `M50 20 Q 95 ${this.eyeBrowLeft} 130 20`;
    let eyeBrowRight = `M150 20 Q 195 ${this.eyeBrowRight} 230 20`;
    let eyeLeft = <g>
        <path id="lufti-face__eye-brow-left" d={eyeBrowLeft} stroke="white" fill="transparent"/>
        <ellipse cx="90" cy="85" rx="30" ry={this.eyeLeft} fill="rgba(255, 255, 255, 0.9)" stroke="white"/>
        <circle cx="90" cy={this.eyeBallLeft} r="10" fill="rgba(0, 0, 0, 0.9)" stroke="white"></circle>
      </g>
    let eyeRight = <g>
        <path id="lufti-face__eye-brow-right" d={eyeBrowRight} stroke="white" fill="transparent"/>
        <ellipse cx="190" cy="85" rx="30" ry={this.eyeRight} fill="rgba(255, 255, 255, 0.9)" stroke="white"/>
        <circle cx="190" cy="105" r="10" fill="rgba(0, 0, 0, 0.9)" stroke="white"></circle>
      </g>

    return (
      <svg id="lufti-face" viewBox="0 -10 300 300">
        <path id="lufti-face__mouth" d={mouth} stroke="white" fill="transparent"/>
        {eyeLeft}
        {eyeRight}
      </svg>
    )
  }
}
