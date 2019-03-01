/**
 * V: 0.1.0
 */

export default class ResponsiveNavbar {
  public static init(selector: string = '.navbar-burger'): void {
    ;[...document.querySelectorAll(selector)].forEach((el: Element) => {
      el.addEventListener('click', () => {
        const elTarget = document.getElementById((el as HTMLElement).dataset.target)

        el.classList.toggle('is-active')
        elTarget.classList.toggle('is-active')
      })
    })
  }
}
