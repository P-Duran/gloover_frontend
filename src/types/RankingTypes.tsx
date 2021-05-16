export interface RankingElement {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  value: number;
}

export enum RankingType {
  DEFAULT = "DEFAULT",
  WILSON = "WILSON",
}
