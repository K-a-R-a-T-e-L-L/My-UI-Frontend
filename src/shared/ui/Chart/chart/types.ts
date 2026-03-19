export type DataPoint = {
  date: string;
  copies: number;
};

export type ParsedData = {
  dateObj: Date;
  date: string;
  copies: number;
}[];
