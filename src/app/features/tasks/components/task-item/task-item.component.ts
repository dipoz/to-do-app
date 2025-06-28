import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html',
    styleUrl: './task-item.component.scss',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
    task = input.required<Task>();

    deleteTask = output<string>();
    updateTask = output<{ id: string, title: string }>();
    toggleComplete = output<string>();

    isEditing = signal(false);

    private fb = inject(FormBuilder);

    editForm = this.fb.nonNullable.group({
        title: ['', [Validators.required, Validators.minLength(3)]]
    });

    startEditing(): void {
        this.editForm.setValue({ title: this.task().title });
        this.isEditing.set(true);
    }

    cancelEditing(): void {
        this.isEditing.set(false);
    }

    saveChanges(): void {
        if (this.editForm.invalid) return;

        const { title } = this.editForm.getRawValue();
        this.updateTask.emit({
            id: this.task().id,
            title
        });

        this.isEditing.set(false);
    }

    handleToggle(): void {
        this.toggleComplete.emit(this.task().id);
    }

    handleDelete(): void {
        this.deleteTask.emit(this.task().id);
    }
}