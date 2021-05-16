export interface PieData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface ChartData {
  id: string;
  data: Point[];
}

export interface Point {
  x: any;
  y: any;
}