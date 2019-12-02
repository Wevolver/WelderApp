export class heapEvent {
  static track(name, event) {
    if(window.heap && window.heap.loaded && window.heap.track) {
      window.heap.track(name, event);
    }
  }
  static identify(event) {
    if(window.heap && window.heap.loaded && window.heap.identify) {
      window.heap.identify(event);
    }
  }
}