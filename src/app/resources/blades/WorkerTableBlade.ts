import Worker from "../../Worker";

export default class WorkerTableBlade {
  public readonly element!: Element;

  private _id!: Number;
  private _name!: string;
  private _position!: string;
  private _register!: Date;
  private _department!: string;

  constructor(worker?: Worker) {
    this.element = WorkerTableBlade.createElement();

    if (worker) {
      this.id = worker.id;
      this.name = worker.name;
      this.position = worker.position;
      this.register = worker.register;
      this.department = worker.department;
    }
  }

  private static createElement(): Element {
    const element: Element = document.createElement("tr");

    const select: Element = document.createElement("td");
    select.setAttribute("data-name", "select");
    select.append(this.createSelectElement());

    const id: Element = document.createElement("td");
    id.setAttribute("data-name", "id");

    const name: Element = document.createElement("td");
    name.setAttribute("data-name", "name");

    const position: Element = document.createElement("td");
    position.setAttribute("data-name", "position");

    const register: Element = document.createElement("td");
    register.setAttribute("data-name", "register");

    const department: Element = document.createElement("td");
    department.setAttribute("data-name", "department");

    const actions: Element = document.createElement("td");
    actions.setAttribute("data-name", "actions");
    actions.append(this.createActionElement());

    element.append(select, id, name, position, register, department, actions);

    return element;
  }

  private setData(dataName: string, value: string) {
    const elements: HTMLCollection = this.element.getElementsByTagName("td");

    for (let i = 0; i < elements.length; i++) {
      const element: Element = <Element>elements.item(i);

      if (element.getAttribute("data-name") === dataName) {
        element.innerHTML = value;
      }
    }
  }

  private getElementDataName(dataName: string) {
    const elements: HTMLCollection = this.element.getElementsByTagName("td");

    for (let i = 0; i < elements.length; i++) {
      const element: Element = <Element>elements.item(i);

      if (element.getAttribute("data-name") === dataName) {
        return element;
      }
    }
  }

  private static createSelectElement(): Element {
    const checkbox: Element = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    return checkbox;
  }

  private static createActionElement(): Element {
    const container: Element = document.createElement("div");

    const deleteButton: Element = document.createElement("button");
    deleteButton.classList.add("delete-worker");
    deleteButton.innerHTML = "Удалить";

    container.append(deleteButton);

    return container;
  }

  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
    this._id = value;
    this.setData("id", value.toString());
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this.setData("name", value);
  }

  get department(): string {
    return this._department;
  }

  set department(value: string) {
    this._department = value;
    this.setData("department", value);
  }

  get register(): Date {
    return this._register;
  }

  set register(value: Date) {
    this._register = value;
    this.setData("register", WorkerTableBlade.formatDate(value));
  }

  get position(): string {
    return this._position;
  }

  set position(value: string) {
    this._position = value;
    this.setData("position", value);
  }

  //
  get selected(): boolean {
    const element: Element = <Element>this.getElementDataName("select");

    const checkbox: HTMLInputElement = <HTMLInputElement>element.querySelector("input[type=checkbox]");

    return checkbox.checked;
  }

  set selected(state: boolean) {
    const element: Element = <Element>this.getElementDataName("select");

    const checkbox: HTMLInputElement = <HTMLInputElement>element.querySelector("input[type=checkbox]");

    checkbox.checked = state;
  }

  //
  get show(): boolean {
    return this.element.classList.contains("hidden");
  }

  set show(state: boolean) {
    const classList: DOMTokenList = this.element.classList;
    if (state) {
      classList.remove("hidden");
    } else {
      classList.add("hidden");
    }
  }

  public onSelect(event: (state: WorkerTableBlade) => any) {
    const element: Element = <Element>this.getElementDataName("select");
    const checkbox: HTMLInputElement = <HTMLInputElement>element.querySelector("input[type=checkbox]");

    checkbox.addEventListener("change", () => event(this));
  }

  public onDelete(event: (state: WorkerTableBlade) => any) {
    const element: Element = <Element>this.getElementDataName("actions");
    const deleteButton: HTMLInputElement = <HTMLInputElement>element.querySelector("button.delete-worker");

    deleteButton.addEventListener("click", () => event(this));
  }

  private static formatDate(date: Date) {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }

  public destroy(): void {
    this.element.remove();
  }
}
