import {Point } from "./ChartTypes";

export interface StatistierItem {
  id: string;
  title: string;
  data: StatistierData;
}

export interface StatistierData {
  score: number;
  positiviness: number;

}