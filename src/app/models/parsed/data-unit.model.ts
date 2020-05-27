import { Month } from '../month.enum';

type NotName<X extends string> = X extends 'name' ? never : X;

export interface DataUnit {
  id: number;
  name: string;
  totalHours: string;
  productiveHours: string;
  unallocatedHours: string;
  months: Array<MonthUnit>;
  records: Array<DataRecord>;
}

export interface MonthUnit {
  name: Month;
  weeks: Array<WeekUnit>;
}

export interface WeekUnit {
  totalHours: string;
  productiveHours: string;
  unallocatedHours: string;
}

export interface DataRecord {
  monthName: Month;
  weekName: string;
  totalHours: string;
  productiveHours: string;
  unallocatedHours: string;
}

export interface DataHeader {
  totalOfall: string;
  productiveOfAll: string;
  unallocatedOfAll: string;
  months: Array<MonthHeader>;
  records: Array<HeaderRecord>;
}

export interface MonthHeader {
  name: Month;
  weeks: Array<WeekHeader>;
}

export interface WeekHeader {
  start: Date;
  end: Date;
  totalTime: string;
  productiveTime: string;
  unallocatedTime: string;
}

export interface HeaderRecord {
  monthName: Month;
  weekName: string;
  totalTime: string;
  productiveTime: string;
  unallocatedTime: string;
}
