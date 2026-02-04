export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = { x: 0, y: 0 };
    this.isMouseDown = false;
    this.listeners = [];

    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.listeners.forEach(fn => fn('contextmenu', this.getMousePos(e)));
    });
  }

  getMousePos(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  onMouseMove(e) {
    this.mouse = this.getMousePos(e);
  }

  onMouseDown(e) {
    this.isMouseDown = true;
    this.mouse = this.getMousePos(e);
    // Notify listeners
    this.listeners.forEach(fn => fn('mousedown', this.mouse));
  }

  onMouseUp(e) {
    this.isMouseDown = false;
  }

  addListener(fn) {
    this.listeners.push(fn);
  }
}
