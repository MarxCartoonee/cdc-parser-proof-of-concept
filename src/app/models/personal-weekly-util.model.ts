import { PersonalTotalUtilization } from './personal-total-util.model';

export interface PersonalWeeklyUtilization extends PersonalTotalUtilization {
  totalMinutes: number;
  productiveMinutes: number;
  unallocatedMinutes: number;
  utilization: string;
}
