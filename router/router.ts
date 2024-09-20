// router.ts
import ReactDOM from 'react-dom';
import { createBrowserHistory } from './history.ts';
import React from 'react';

interface RouteConfig {
  [path: string]: React.ReactNode;
}

class _Router {
  private history: any;
  private routes: RouteConfig;

  constructor() {
    this.history = createBrowserHistory();
    this.routes = {};
  }

  Routes(routes: RouteConfig) {
    return routes;
  }

  Render(root: HTMLElement | null,routes: RouteConfig) {
    this.routes = routes;
    this.history.listen((location: { pathname: any; }) => {
      const path = location.pathname;
      const route = this.routes[path];
      if (route) {
        if (root) {
          root.innerHTML = '';
          if (React.isValidElement(route)) {
            ReactDOM.render(route, root);
          } else {
            console.error('Invalid route value:', route);
          }
        }
      }
    });
    this.history.push(window.location.pathname);
  }
}

const Router = new _Router();

export { Router };
