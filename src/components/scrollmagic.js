"use-strict"
const ScrollMagic = function({ trigger, hook = 0.5 }) {
  this.windowHeight = window.innerHeight

  if (hook <= 1 && hook >= 0) {
    this.hook = hook * 100
    this.hook = (this.windowHeight * this.hook) / 100
  } else {
    console.warn(`Hook expects value to be 0 to 1, ${hook} given`)
  }

  if (typeof trigger === "object") {
    this.trigger = trigger
  } else {
    console.warn(
      `Trigger expects value to be HTMLElement object, ${typeof trigger} given`
    )
  }
}

ScrollMagic.prototype.init = function() {
  if (this.trigger.getBoundingClientRect().y <= this.hook) {
    this.inCallback()
  }

  if (this.trigger.getBoundingClientRect().y > this.hook) {
    if (this.outCallback) {
      this.outCallback()
    }
  }
}

ScrollMagic.prototype.on = function(inCallback, outCallback = null) {
  const that = this
  this.inCallback = inCallback
  this.outCallback = outCallback
  this.init(this.trigger.getBoundingClientRect().y)

  window.addEventListener("scroll", function() {
    that.init(that.trigger.getBoundingClientRect().y)
  })
}

export default ScrollMagic
