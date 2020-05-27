import { MonthUtilization } from './month-util.model';
import { PersonalTotalUtilization } from './personal-total-util.model';

export interface UtilizationClusterfuck {
  productiveOfAll: string;
  totalOfAll: string;
  unallocatedOfAll: string;
  months: Array<MonthUtilization>;
  totals: Array<PersonalTotalUtilization>;
}
