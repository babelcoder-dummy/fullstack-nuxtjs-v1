declare global {
  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }
}

export {}
