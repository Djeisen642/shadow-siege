export class Input {
  canvas: HTMLCanvasElement;
  mouse: { x: number; y: number };
  isMouseDown: boolean;
  listeners: Function[];

  constructor(canvas: HTMLCanvasElement) {
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

  getMousePos(evt: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  onMouseMove(e: MouseEvent) {
    this.mouse = this.getMousePos(e);
  }

  onMouseDown(e: MouseEvent) {
    this.isMouseDown = true;
    this.mouse = this.getMousePos(e);
    // Notify listeners
    this.listeners.forEach(fn => fn('mousedown', this.mouse));
  }

  onMouseUp(_e: MouseEvent) {
    this.isMouseDown = false;
  }

  addListener(fn: (type: string, data: any) => void) {
    this.listeners.push(fn);
  }
}
