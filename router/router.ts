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
      const path = location.pathname.replace(/\/$/, ''); // Remove the trailing slash
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

class _Index {
  Set(root: HTMLElement | null, ComponentPage: React.ReactNode) {
    if (window.location.pathname == '/') {
      if (React.isValidElement(ComponentPage)) {
        ReactDOM.render(ComponentPage, root);
      } else {
        console.error('Invalid route value:', ComponentPage);
      }
    }
  }
}

const Router = new _Router();
const Index = new _Index();

export { Router, Index };
