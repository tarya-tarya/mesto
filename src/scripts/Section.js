export default class Section {
  constructor({items, renderer}, elementsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._elementsContainer = elementsContainer; 
  };

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(element) {
    this._elementsContainer.prepend(element);
  }
};