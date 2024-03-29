export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
   }

  addItem(element) { //добавляем элемент на страницу
    this._container.append(element);
  }

  clear() { //очищаем содержимое элемента
    this._container.innerHTML = '';
  }

  renderItems() { //отрисовка всех элементов
    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
