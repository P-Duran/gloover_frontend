import { TableData } from "types/TableCardTypes";

export const transformToTableData = (
  data: Array<{ [key: string]: any }>
): TableData => {
  return data.map((e) => {
    return { data: e };
  });
};
