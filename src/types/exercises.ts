export interface Exercise {
  name: string;
  series: number;
  reps: number;
  weight: number;
  last_weight: number;
  id: string;
}

export interface WeightHistory {
  value: number;
  date: string;
}
