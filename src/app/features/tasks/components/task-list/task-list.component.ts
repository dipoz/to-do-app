import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';

type FilterState = 'all' | 'completed' | 'active';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
    imports: [TaskItemComponent, TaskFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
    private taskService = inject(TaskService);

    protected readonly tasks = this.taskService.tasks;
    protected readonly tasksCount = this.taskService.tasksCount;
    protected readonly hasTasks = computed(() => this.tasksCount() > 0);

    // Filter functionality
    protected readonly filterState = signal<FilterState>('all');

    protected readonly filteredTasks = computed(() => {
        const filter = this.filterState();
        const allTasks = this.tasks();

        if (filter === 'all') {
            return allTasks;
        } else if (filter === 'completed') {
            return allTasks.filter(task => task.completed);
        } else { // 'active'
            return allTasks.filter(task => !task.completed);
        }
    });

    protected readonly filteredTasksCount = computed(() => this.filteredTasks().length);
    protected readonly hasFilteredTasks = computed(() => this.filteredTasksCount() > 0);

    setFilter(filter: FilterState): void {
        this.filterState.set(filter);
    }

    handleAddTask(data: { title: string }): void {
        this.taskService.addTask(data.title);
    }

    handleUpdateTask(data: { id: string, title: string }): void {
        this.taskService.updateTask(data.id, data.title);
    }

    handleToggleComplete(id: string): void {
        this.taskService.toggleComplete(id);
    }

    handleDeleteTask(id: string): void {
        this.taskService.deleteTask(id);
    }
}