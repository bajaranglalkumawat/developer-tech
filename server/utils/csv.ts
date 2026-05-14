import { stringify } from "csv-stringify/sync";

export function toCsv(data: Array<Record<string, unknown>>) {
  return stringify(data, { header: true });
}
