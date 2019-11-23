import { Component, h, Prop, Watch, State, Host } from '@stencil/core';

@Component({
  tag: 'lufti-counter',
  styleUrl: 'lufti-counter.css',
  shadow: true
})

export class LuftiCounter {
  raf = null;
  duration: number = 300;
  counterElement: HTMLElement;

  @State() tenth: number = 0;
  @State() hundreds: number = 0;
  @State() one: number = 0;
  @State() ten: number = 0;
  @State() hundred: number = 0;
  @State() thousand: number = 0;
  @Prop() height: number = 0;
  @Prop({ mutable: true, reflect:true }) mood: number = 0;
  @Watch('mood')
  watchHandler(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.setCounter(newValue);
    }
  }

  setCounter(mood) {
    const temp = mood.toString().split(".");
    const left = temp[0];
    const right = temp[1];

    switch (left.length) {
      case 1:
        this.one = left[0]
        this.ten = -1
        this.hundred = -1
        this.thousand = -1
        break;
      case 2:
        this.one = left[1]
        this.ten = left[0]
        this.hundred = -1
        this.thousand = -1
        break;
      case 3:
        this.one = left[2]
        this.ten = left[1]
        this.hundred = left[0]
        this.thousand = -1
        break;
      case 4:
        this.one = left[3]
        this.ten = left[2]
        this.hundred = left[1]
        this.thousand = left[0]
        break;
    }

    switch (right.length) {
      case 1:
        this.tenth = right[0]
        this.hundreds = 0
      case 2:
        this.tenth = right[0]
        this.hundreds = right[1]
    }
  }

  render() {
    let thousand = null;
    let hundred = null;
    let ten = null;
    let one = null;

    if (this.thousand !== -1) {
      thousand = <lufti-counter-digit class="thousand" height={this.height} digit={this.thousand} />
    }

    if (this.hundred !== -1) {
      hundred = <lufti-counter-digit class="hundred" height={this.height} digit={this.hundred} />
    }

    if (this.ten !== -1) {
      ten = <lufti-counter-digit class="ten" height={this.height} digit={this.ten} />
    }

    if (this.one !== -1) {
      one = <lufti-counter-digit class="one" height={this.height} digit={this.one} />
    }

    return (
      <Host ref={el => this.counterElement = el}>
        {thousand}
        {hundred}
        {ten}
        {one}
        <span class="lufti-counter-decimal">.</span>
        <lufti-counter-digit class="tenth" height={this.height} digit={this.tenth}/>
        <lufti-counter-digit class="hundreds" height={this.height} digit={this.hundreds}/>
      </Host>
    )
  }
}
