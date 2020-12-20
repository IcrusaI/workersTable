export default class SearchWorker {
  private form: HTMLFormElement;
  private event: (data: SearchData | null) => any;

  private idField: HTMLInputElement;
  private nameField: HTMLInputElement;

  constructor(form: HTMLFormElement, event: (data: SearchData | null) => any) {
    this.form = form;
    this.event = event;

    this.idField = <HTMLInputElement> form.querySelector("input[name=id]");
    this.nameField = <HTMLInputElement> form.querySelector("input[name=name]");

    const resetButton = <HTMLInputElement> form.querySelector("button[name=reset]");

    resetButton.addEventListener("click", this.reset.bind(this));
    this.form.addEventListener("submit", this.onCreate.bind(this));
  }

  private onCreate(e: Event) {
    e.preventDefault();

    let ready = false;

    const data: SearchData = {};

    if (this.idField.value !== "") {
      data.id = Number.parseInt(this.idField.value);
      ready = true;
    }

    if (this.nameField.value !== "") {
      data.name = this.nameField.value;
      ready = true;
    }

    if (!ready) {
      this.reset();
      return;
    }

    this.event(data);
  }

  private reset() {
    this.idField.value = '';
    this.nameField.value = '';

    this.event(null);
  }
}

export interface SearchData {
  id?: number,
  name?: string
}
