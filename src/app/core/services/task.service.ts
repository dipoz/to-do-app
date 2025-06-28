import { Injectable, computed, inject, signal } from '@angular/core';
import { Task } from '../../features/tasks/models/task.model';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private platformId = inject(PLATFORM_ID);
    private storageKey = 'tasks-app-data';
    private tasksSignal = signal<Task[]>(this.loadFromStorage());

    readonly tasks = computed(() => this.tasksSignal());
    readonly tasksCount = computed(() => this.tasksSignal().length);

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    private loadFromStorage(): Task[] {
        if (!this.isBrowser()) return [];

        const data = localStorage.getItem(this.storageKey);
        if (!data) return [];

        try {
            const parsed = JSON.parse(data);
            return parsed.map((task: any) => ({
                ...task,
                createdAt: new Date(task.createdAt)
            }));
        } catch (e) {
            console.error('Failed to parse tasks from localStorage', e);
            return [];
        }
    }

    private saveToStorage(tasks: Task[]): void {
        if (!this.isBrowser()) return;
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    addTask(title: string): void {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            createdAt: new Date()
        };

        this.tasksSignal.update(tasks => {
            const updated = [...tasks, newTask];
            this.saveToStorage(updated);
            return updated;
        });
    }

    updateTask(id: string, title: string): void {
        this.tasksSignal.update(tasks => {
            const updated = tasks.map(task =>
                task.id === id ? { ...task, title } : task
            );
            this.saveToStorage(updated);
            return updated;
        });
    }

    toggleComplete(id: string): void {
        this.tasksSignal.update(tasks => {
            const updated = tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            this.saveToStorage(updated);
            return updated;
        });
    }

    deleteTask(id: string): void {
        this.tasksSignal.update(tasks => {
            const updated = tasks.filter(task => task.id !== id);
            this.saveToStorage(updated);
            return updated;
        });
    }
}