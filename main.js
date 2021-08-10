const items = [
  "Молоко",
  "Орехи",
  "Кофе",
  "Сахар",
  "Хлеб",
  "Йогурт",
  "Сок",
  "Бананы",
  "Мандарины",
  "Шоколад",
  "Печенье",
];

class Search {
  _value = "";
  constructor(selector, onInput) {
    this.$element = document.querySelector(selector);
    this.$element.addEventListener("input", ({ target }) => {
      this._value = target.value;
      onInput(this._value.toLowerCase().trim());
    });
  }

  get value() {
    return this._value;
  }

  clear() {
    this._value = "";
    this.$element.value = "";
  }
}

class Results {
  constructor(selector, items = []) {
    this.$element = document.querySelector(selector);
    this._items = items;
    this._searchResults = items;
    this.render(); // довольно опасно вызывать методы в конструкторе, но если вы уверены в своем коде, то можно
  }

  searchItems(text) {
    this._searchResults = this._items.filter((item) =>
      item.toLowerCase().includes(text)
    );
    this.render();
  }

  get items() {
    return this._items;
  }

  addItem(item) {
    this._items.push(item);
    this._searchResults = this._items;
    this.render();
  }

  render() {
    this.$element.innerHTML = this._searchResults.reduce(
      (result, item) => (result += `<li>${item}</li>`),
      ""
    );
  }
}

class CreateButton {
  _disabled;
  _onClick = () => {};
  constructor(selector) {
    this.$element = document.querySelector(selector);
    this.disabled = true;
  }

  set onClick(handler) {
    this._onClick = handler;
    this.$element.addEventListener("click", this._onClick);
  }

  set disabled(isDisabled) {
    this._disabled = isDisabled;
    this.$element.disabled = isDisabled;
  }
}

const createButton = new CreateButton("#create");

const results = new Results("#results", items);

const search = new Search("#search", (text) => {
  results.searchItems(text);
  if (results.items.includes(search.value) || text === "") {
    createButton.disabled = true;
  } else {
    createButton.disabled = false;
  }
});

createButton.onClick = () => {
  results.addItem(search.value);
  search.clear();
  createButton.disabled = true;
};
