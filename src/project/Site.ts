// import Settings from './Settings';

declare global {
  interface Window {
    Drupal: any
  }
}

let instance: Site | null = null
export default class Site {
  constructor() {
    if (!instance) {
      instance = this
    }

    // Add your stuff here
  }

  public static getInstance(): Site {
    if (instance === null) {
      instance = new Site()
    }

    return instance
  }
}
