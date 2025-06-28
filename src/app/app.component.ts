import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, TaskListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'to-do-app';
  currentYear = new Date().getFullYear();
}