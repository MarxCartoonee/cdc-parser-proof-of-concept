import { PersonalWeeklyUtilization } from './personal-weekly-util.model';

export interface WeekUtilization {
  start: string;
  end: string;
  totalTime: string;
  productiveTime: string;
  unallocatedTime: string;
  records: Array<PersonalWeeklyUtilization>;
}
