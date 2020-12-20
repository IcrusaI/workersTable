import WorkerTableBlade from "./resources/blades/WorkerTableBlade";

export default function getSelectedRow(workerBlades: WorkerTableBlade[]): WorkerTableBlade[] {
  const rows: WorkerTableBlade[] = [];
  for (const key in workerBlades) {
    const workerBlade: WorkerTableBlade = workerBlades[key];

    if (workerBlade.selected) {
      rows.push(workerBlade);
    }
  }

  return rows;
}
