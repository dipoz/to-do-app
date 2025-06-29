import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CollapseDirective } from 'ngx-bootstrap/collapse';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrl: './task-create.component.scss',
    imports: [ReactiveFormsModule, CollapseDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCreateComponent {
    isCollapsed = signal(true);
    collapseId = `collapse-${crypto.randomUUID().slice(0, 8)}`;

    saveTask = output<{ title: string }>();

    private fb = inject(FormBuilder);

    form = this.fb.nonNullable.group({
        title: ['', [Validators.required, Validators.minLength(3)]]
    });

    toggleCollapse(): void {
        this.isCollapsed.update(value => !value);
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        const { title } = this.form.getRawValue();
        this.saveTask.emit({ title });
        this.form.reset();

        this.isCollapsed.set(true);
    }
}