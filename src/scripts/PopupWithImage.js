import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._settings.imageSelector = '.img-popup__pic';
    this._settings.titleSelector = '.img-popup__text';
    this._image = this._popupSelector.querySelector(this._settings.imageSelector);
    this._title = this._popupSelector.querySelector(this._settings.titleSelector);
  }

  open({link, name}) {
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;

    super.open();
  };
}