import { Idiomorph } from "idiomorph"

const IdiomorphMixin = (superclass) => class extends superclass {
  constructor(args) {
    super(args)
    this.process = this.process.bind(this)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.process()
    }
  }

  process() {
    const tmp = this.render({
      html: this.html,
      state: this.state,
    })
    const updated = document.createElement("div")
    updated.innerHTML = tmp.trim()
    const root = this.shadowRoot
      ? this.shadowRoot
      : this
    Idiomorph.morph(
      root,
      updated,
      {
        morphStyle: "innerHTML"
      }
    )
  }
}

export default IdiomorphMixin
