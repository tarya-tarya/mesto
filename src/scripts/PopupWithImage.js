import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.img-popup__pic');
    this._title = this._popupSelector.querySelector('.img-popup__text');
  }

  open({
    link,
    name
  }) {
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;

    super.open();
  };
}