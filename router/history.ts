// history.ts
class BrowserHistory {
    private listeners: any[];
    private location: any;
  
    constructor() {
      this.listeners = [];
      this.location = window.location;
    }
  
    listen(callback: any) {
      this.listeners.push(callback);
    }
  
    push(path: string) {
      window.history.pushState({}, '', path);
      this.listeners.forEach((callback) => callback(this.location));
    }
  }
  
  function createBrowserHistory() {
    return new BrowserHistory();
  }
  
  export { createBrowserHistory };
