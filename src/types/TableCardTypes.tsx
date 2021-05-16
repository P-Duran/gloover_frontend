export type RowData = {
  data: { [key: string]: any };
  expandedData?: React.ReactNode;
};

export type TableData = Array<RowData>;
