import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FilterState } from '../../models/filter-state.model';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFilterComponent {
  activeFilter = input.required<FilterState>();
  filterChange = output<FilterState>();

  setFilter(filter: FilterState): void {
    this.filterChange.emit(filter);
  }
}