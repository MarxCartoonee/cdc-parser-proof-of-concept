import { UtilizationClusterfuck as IUtilizationClusterfuck } from '../models/utilization-clusterfuck.model';
import { MonthUtilization } from '../models/month-util.model';
import { PersonalTotalUtilization } from '../models/personal-total-util.model';
import {
  DataUnit,
  DataHeader,
  MonthHeader,
  WeekHeader,
  MonthUnit,
  WeekUnit,
  DataRecord,
  HeaderRecord,
} from '../models/parsed/data-unit.model';
import { WeekUtilization } from '../models/week-util.model';
import { Month } from '../models/month.enum';
import { reduce } from 'lodash';
import { flatten } from '@angular/compiler';

export class UtilizationClusterfuck implements IUtilizationClusterfuck {
  productiveOfAll: string;
  totalOfAll: string;
  unallocatedOfAll: string;
  months: Array<MonthUtilization>;
  totals: Array<PersonalTotalUtilization>;

  constructor(util: IUtilizationClusterfuck) {
    Object.assign(this, util);
  }

  public get ids(): Array<number> {
    return this.totals.map(({ id }) => id);
  }

  public get header(): DataHeader {
    const header: DataHeader = {
      totalOfall: this.totalOfAll,
      productiveOfAll: this.productiveOfAll,
      unallocatedOfAll: this.unallocatedOfAll,
      months: this.months.map(this._getMonthHeader.bind(this)),
      records: flatten(
        this.months.map((month) => this._getHeaderRecord(month))
      ),
    };

    return header;
  }

  public get data(): Array<DataUnit> {
    const rows: Array<DataUnit> = this.totals.map(
      ({ id, name, totalHours, productiveHours, unallocatedHours }) => {
        const ret: DataUnit = {
          id,
          name,
          totalHours,
          productiveHours,
          unallocatedHours,
          months: this.months.map(this._getMonthUnit(id).bind(this)),
          records: flatten(
            this.months.map((month) => this._getDataRecord(id)(month))
          ),
        };
        return ret;
      }
    );
    return rows;
  }

  private _getMonthHeader(month: MonthUtilization): MonthHeader {
    return {
      name: month.name,
      weeks: month.weeks.map(this._getWeekHeader.bind(this)),
    };
  }

  private _getWeekHeader(week: WeekUtilization): WeekHeader {
    return {
      start: new Date(week.start),
      end: new Date(week.end),
      totalTime: week.totalTime,
      productiveTime: week.productiveTime,
      unallocatedTime: week.unallocatedTime,
    };
  }

  private _getHeaderRecord(month: MonthUtilization): Array<HeaderRecord> {
    const { name: monthName, weeks } = month;

    const records: Array<HeaderRecord> = weeks.map((week) => {
      const weekName = this._getWeekHeaderName(week);
      const record: HeaderRecord = {
        monthName,
        weekName,
        totalTime: week.totalTime,
        productiveTime: week.totalTime,
        unallocatedTime: week.unallocatedTime,
      };
      return record;
    });
    return records;
  }

  private _getMonthUnit(id: number): (month: MonthUtilization) => MonthUnit {
    return (month) => {
      const unit: MonthUnit = {
        name: month.name,
        weeks: month.weeks.map(this._getWeekUnit(id).bind(this)),
      };
      return unit;
    };
  }

  private _getWeekUnit(id: number): (week: WeekUtilization) => WeekUnit {
    return (week) => {
      const {
        totalHours,
        productiveHours,
        unallocatedHours,
      } = week.records.find((record) => record.id === id);
      const unit: WeekUnit = {
        totalHours,
        productiveHours,
        unallocatedHours,
      };
      return unit;
    };
  }

  public _getDataRecord(
    id: number
  ): (month: MonthUtilization) => Array<DataRecord> {
    return (month) => {
      const { name: monthName, weeks } = month;

      const records: Array<DataRecord> = weeks.map((week) => {
        const {
          totalHours,
          productiveHours,
          unallocatedHours,
        } = week.records.find((r) => r.id === id);
        const record: DataRecord = {
          monthName,
          weekName: this._getWeekHeaderName(week),
          totalHours,
          productiveHours,
          unallocatedHours,
        };
        return record;
      });

      return records;
    };
  }

  private _getWeekCount(month: MonthUnit | MonthHeader): number {
    return month.weeks.length;
  }

  private _getWeekHeaderName(week: WeekUtilization): string {
    const { start, end } = week;
    return this._toDate(start) + '-' + this._toDate(end);
  }

  private _toDate(d: string): string {
    return new Date(d).getDate().toString().padStart(2, '0');
  }
}
