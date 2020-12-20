import WorkerTableBlade from "./resources/blades/WorkerTableBlade";
import getSelectedRow from "./getSelectedRow";
import declOfNum from "./declOfNum";
import CreateWorker from "./createWorker";
import Worker from "./Worker";
import SearchWorker, { SearchData } from "./searchWorker";

class App {
  private readonly content!: Element;
  private readonly tableBody!: Element;
  private rows: WorkerTableBlade[] = [];
  private selectedRows: WorkerTableBlade[] = [];

  private currentId: number = 1;

  constructor() {
    this.content = <Element> document.getElementsByClassName("content-container").item(0);
    this.tableBody = <Element> this.content.getElementsByTagName("tbody").item(0);

    this.init();
  }

  init() {
    const createForm: HTMLFormElement = <HTMLFormElement> document.querySelector(".create-container");
    new CreateWorker(createForm, this.onCreate.bind(this));

    const searchForm: HTMLFormElement = <HTMLFormElement> document.querySelector(".search-container");
    new SearchWorker(searchForm, this.onSearch.bind(this));

    const deleteButton: Element = <Element>document.querySelector(".delete-workers-button");
    deleteButton.addEventListener("click", this.onDeleteSelected.bind(this));

    for (let i = 0; i < 15; i++) {
      const worker: Worker = new Worker();
        worker.id = this.currentId;
        this.currentId++;
      worker.name = `User ${this.currentId - 1}`;
      worker.department = `Dep`;
      worker.position = `Pos`;
      worker.register = new Date();

      this.onCreate(worker);
    }
  }

  // При выделении
  private onSelected(workerBlade: WorkerTableBlade) {
    if (workerBlade.selected) {
      workerBlade.element.classList.add("selected");
    } else {
      workerBlade.element.classList.remove("selected");
    }

    this.updateCount();
  }

  // Метод который вызывается при удалении/создании рабочего
  private updateCount() {
    this.selectedRows = getSelectedRow(this.rows);

    const count: number = this.selectedRows.length;

    this.toggleShowActions(count > 0);
  }

  // Показ, скрытие блока действий
  private toggleShowActions(state: boolean) {
    const actionsContainer: Element = <Element> document.querySelector(".actions-container");
    const countWorkers: Element = <Element> actionsContainer.querySelector(".count-workers");

    const textButton: string = declOfNum(this.selectedRows.length, ['рабочего', 'рабочих', 'рабочих']);

    countWorkers.innerHTML = `${this.selectedRows.length} ${textButton}`;

    if (state) {
      actionsContainer.classList.remove("hidden");
    } else {
      actionsContainer.classList.add("hidden");
    }
  }

  private onCreate(worker: Worker) {
    if (worker.id === undefined) {
      worker.id = this.currentId;
      this.currentId++;
    }

    const workerBlade = new WorkerTableBlade(worker);

    workerBlade.onSelect(this.onSelected.bind(this));

    workerBlade.onDelete(this.onDelete.bind(this));

    this.rows.push(workerBlade);
    this.tableBody.append(workerBlade.element);

    this.updateCount();
  }

  private onSearch(data: SearchData | null) {
    for (let i = 0; i < this.rows.length; i++) {
      const row: WorkerTableBlade = this.rows[i];

      if (data === null) {
        row.show = true;
        continue;
      }

      let show = false;


      if (data.name !== undefined && row.name.toLocaleLowerCase().includes(data.name.toLocaleLowerCase())) {
        show = true;
      }

      if (data.id !== undefined && row.id === data.id) {
        show = true;
      }

      row.show = show;
    }
  }

  private onDeleteSelected() {
    for (let i = 0; i < this.selectedRows.length; i++) {
      const row: WorkerTableBlade = this.selectedRows[i];

      row.destroy();

      const index = this.rows.findIndex(e => e.id === row.id);

      this.rows.splice(index, 1);
    }

    this.updateCount();
  }

  private onDelete(row: WorkerTableBlade) {
    row.destroy();

    const index = this.rows.findIndex(e => e.id === row.id);

    this.rows.splice(index, 1);

    this.updateCount();
  }
}

new App();

