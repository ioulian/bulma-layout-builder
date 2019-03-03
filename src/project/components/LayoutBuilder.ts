const TEMPLATE_SELECTOR = '#template'
const BLOCKS_SELECTOR = '#blocks'
const CLASSES_SELECTOR = '#classes'
const DRAGGABLE_SELECTOR = '[draggable]'

const delegate = (selector: string, func: any, obj: LayoutBuilder) => (e: Event) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.matches(selector)) {
      func.apply(obj, [e])
    }
  }
}

export default class LayoutBuilder {
  elTemplate: HTMLElement
  elBlocks: HTMLElement
  elClasses: HTMLElement
  htmlToInsert: string = ''
  originalElement: HTMLElement | null = null
  removeOriginal: boolean = false
  positionModifierPressed: boolean = false
  currentHoverElement: HTMLElement | null = null
  currentClickedElement: HTMLElement | null = null

  constructor() {
    this.elTemplate = document.getElementById(TEMPLATE_SELECTOR.substr(1))
    this.elBlocks = document.getElementById(BLOCKS_SELECTOR.substr(1))
    this.elClasses = document.getElementById(CLASSES_SELECTOR.substr(1))

    this.attachEvents()
  }

  attachEvents(): void {
    this.elTemplate.addEventListener('dragstart', delegate(DRAGGABLE_SELECTOR, this.handleDragStart, this), false)
    this.elBlocks.addEventListener('dragstart', delegate(DRAGGABLE_SELECTOR, this.handleDragStart, this), false)
    this.elTemplate.addEventListener('dragend', delegate(DRAGGABLE_SELECTOR, this.handleDragEnd, this), false)
    this.elBlocks.addEventListener('dragend', delegate(DRAGGABLE_SELECTOR, this.handleDragEnd, this), false)
    this.elTemplate.addEventListener('drag', delegate(DRAGGABLE_SELECTOR, this.handleDrag, this), false)
    this.elBlocks.addEventListener('drag', delegate(DRAGGABLE_SELECTOR, this.handleDrag, this), false)

    this.elTemplate.addEventListener('dragenter', delegate(DRAGGABLE_SELECTOR, this.handleDragEnter, this), false)
    this.elTemplate.addEventListener('dragover', delegate(DRAGGABLE_SELECTOR, this.handleDragOver, this), false)
    this.elTemplate.addEventListener('dragleave', delegate(DRAGGABLE_SELECTOR, this.handleDragLeave, this), false)
    this.elTemplate.addEventListener('drop', delegate(DRAGGABLE_SELECTOR, this.handleDrop, this), false)

    this.elTemplate.addEventListener('click', this.handleTemplateClick.bind(this), false)
    this.elClasses.addEventListener('change', this.handleClassesChange.bind(this), false)

    document.addEventListener('keydown', this.handleKeyPress.bind(this), false)
  }

  handleClassesChange(e: Event) {
    if (this.elClasses instanceof HTMLSelectElement) {
      if (this.currentClickedElement !== null) {
        ;[...this.elClasses.options].forEach(option => {
          this.currentClickedElement.classList.toggle(option.value, option.selected)
        })
      }
    }
  }

  handleTemplateClick(e: MouseEvent): void {
    if (e.target instanceof HTMLElement) {
      this.currentClickedElement = e.target.getAttribute('id') === 'template' ? null : e.target

      this.elTemplate.querySelectorAll('.selected').forEach((el: HTMLElement) => el.classList.remove('selected'))

      if (this.currentClickedElement !== null) {
        this.currentClickedElement.classList.add('selected')
        if (this.elClasses instanceof HTMLSelectElement) {
          ;[...this.elClasses.options].forEach(
            option => (option.selected = this.currentClickedElement.classList.contains(option.value))
          )
        }
      }
    }
  }

  handleKeyPress(e: KeyboardEvent): void {
    if (e.keyCode === 8 && this.currentClickedElement !== null) {
      // Backspace
      this.currentClickedElement.outerHTML = ''
      this.currentClickedElement = null
    }
  }

  handleDrag(e: DragEvent): void {
    this.positionModifierPressed = e.shiftKey
  }

  handleDragEnter(e: DragEvent): void {
    if (e.target instanceof HTMLElement) {
      e.target.classList.add('hover')

      if (this.positionModifierPressed) {
        e.target.classList.add('modifier')
      }

      this.currentHoverElement = e.target
    }
  }

  handleDragStart(e: DragEvent): void {
    e.stopPropagation()

    if (e.target instanceof HTMLElement) {
      this.htmlToInsert = e.target.outerHTML
      this.originalElement = e.target

      if (e.target.closest(TEMPLATE_SELECTOR) !== null) {
        this.removeOriginal = true
      }

      e.dataTransfer.effectAllowed = 'all'
    }
  }

  handleDragOver(e: DragEvent): boolean {
    e.preventDefault()

    if (e.target instanceof HTMLElement) {
      if (e.target.closest(TEMPLATE_SELECTOR) !== null) {
        const rect = e.target.getBoundingClientRect()

        this.cleanTemplate()

        e.target.classList.add(e.clientX - rect.left < rect.width / 2 ? 'pos-left' : 'pos-right')
        e.target.classList.toggle('modifier', this.positionModifierPressed)
      }
    }

    return false
  }

  handleDragLeave(e: DragEvent): void {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('hover')
      this.cleanTemplate()
    }
  }

  handleDrop(e: DragEvent): boolean {
    e.stopPropagation()

    if (e.target instanceof HTMLElement) {
      if (this.positionModifierPressed) {
        if (e.target.classList.contains('pos-left')) {
          e.target.outerHTML = this.htmlToInsert + e.target.outerHTML
        } else {
          e.target.outerHTML = e.target.outerHTML + this.htmlToInsert
        }
      } else {
        if (e.target.classList.contains('pos-left')) {
          e.target.innerHTML = this.htmlToInsert + e.target.innerHTML
        } else {
          e.target.innerHTML = e.target.innerHTML + this.htmlToInsert
        }
      }
    }

    if (this.removeOriginal) {
      this.originalElement.outerHTML = ''
    }

    this.cleanTemplate()
    this.htmlToInsert = ''
    this.originalElement = null
    this.removeOriginal = false

    return false
  }

  handleDragEnd(e: DragEvent): void {
    if (e.target instanceof HTMLElement) {
      this.cleanTemplate()
      this.currentHoverElement = e.target
    }
  }

  cleanTemplate(): void {
    ;[...this.elTemplate.querySelectorAll('.pos-left, .pos-right, .hover')].forEach((el: HTMLElement) => {
      el.classList.remove('pos-left', 'pos-right', 'hover', '.modifier')
    })
  }
}
