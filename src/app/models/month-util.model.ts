import { WeekUtilization } from './week-util.model';
import { Month } from './month.enum';

export interface MonthUtilization {
  name: Month;
  weeks: Array<WeekUtilization>;
}
