import Worker from "./Worker";

export default class CreateWorker {
  private form: HTMLFormElement;
  private event: (worker: Worker) => any;

  private nameField: HTMLInputElement;
  private positionField: HTMLInputElement;
  private registerField: HTMLInputElement;
  private departmentField: HTMLInputElement;

  constructor(form: HTMLFormElement, event: (worker: Worker) => any) {
    this.form = form;
    this.event = event;

    this.nameField = <HTMLInputElement> form.querySelector("input[name=name]");
    this.positionField = <HTMLInputElement> form.querySelector("input[name=position]");
    this.registerField = <HTMLInputElement> form.querySelector("input[name=register]");
    this.departmentField = <HTMLInputElement> form.querySelector("input[name=department]");

    this.form.addEventListener("submit", this.onCreate.bind(this));
  }

  private onCreate(e: Event) {
    e.preventDefault();

    const worker: Worker = new Worker();

    worker.name = this.nameField.value;
    worker.position = this.positionField.value;
    worker.register = new Date(this.registerField.value);
    worker.department = this.departmentField.value;

    this.event(worker);

    this.reset();
  }

  private reset() {
    this.nameField.value = '';
    this.positionField.value = '';
    this.registerField.value = '';
    this.departmentField.value = '';
  }
}


