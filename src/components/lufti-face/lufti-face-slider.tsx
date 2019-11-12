import { Component, h, State, Host } from '@stencil/core';

@Component({
  tag: 'lufti-face-slider',
  styleUrl: 'lufti-face-slider.css',
  shadow: true
})

export class LuftiFaceSlider {
  mood: HTMLInputElement;
  hankMoody = null;

  @State() _mood: number;

  componentDidLoad() {
    this.hankMoody = document.getElementsByTagName("lufti-main")[0].shadowRoot.getElementById("hankMoody");
    this.mood.value = this.hankMoody.getAttribute("mood");
    this._mood = parseFloat(this.mood.value);
  }

  onChange = (event: Event) => {
    let mood = parseFloat((event.target as HTMLInputElement).value);
    this._mood = mood;
    this.hankMoody.setAttribute("mood", this._mood);
  }

  render() {
    return (
      <Host>
        <input type="range"
          id="faceSlider"
          name="face-slider"
          min="0" max="100"
          step="1.0"
          ref={el => this.mood = el}
          onInput={this.onChange} />
        {this._mood}
      </Host>
    )
  }
}
