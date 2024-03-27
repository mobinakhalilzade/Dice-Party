export interface IPointTable {
  upperSection: ISection[];
  lowerSection: ISection[];
}

export interface ISection {
  id: number;
  name: string;
  multiplier: number;
  point: null | number;
  image:string
}
