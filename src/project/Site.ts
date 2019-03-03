import LayoutBuilder from './components/LayoutBuilder'
// import Settings from './Settings';

import './Site.scss'

let instance: Site | null = null
export default class Site {
  layoutBuilder: LayoutBuilder

  constructor() {
    if (!instance) {
      instance = this
    }

    // Add your stuff here
    this.layoutBuilder = new LayoutBuilder()
  }

  public static getInstance(): Site {
    if (instance === null) {
      instance = new Site()
    }

    return instance
  }
}
