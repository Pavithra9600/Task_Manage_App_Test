// Import necessary modules from Angular
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  // BehaviorSubject to store and broadcast the current state of tasks
  private taskArraySubject = new BehaviorSubject<Array<any>>([{ taskName: 'HTML5', description: 'HyperText Markup Language', isCompleted: false }]);

  // Observable derived from taskArraySubject, allowing components to subscribe to changes
  taskArray$ = this.taskArraySubject.asObservable();

  // Method to add a new task
  addTask(task: any) {
    // Get the current tasks from the BehaviorSubject
    const currentTasks = this.taskArraySubject.getValue();

    // Add the new task and notify subscribers about the change
    this.taskArraySubject.next([...currentTasks, task]);
  }

  // Method to delete a task by index
  deleteTask(index: number) {
    // Get the current tasks from the BehaviorSubject
    const currentTasks = this.taskArraySubject.getValue();

    // Remove the task at the specified index and notify subscribers about the change
    currentTasks.splice(index, 1);
    this.taskArraySubject.next([...currentTasks]);
  }

  // Method to update a task by index
  updateTask(index: number, updatedTask: any) {
    // Get the current tasks from the BehaviorSubject
    const currentTasks = this.taskArraySubject.getValue();

    // Update the task at the specified index and notify subscribers about the change
    currentTasks[index] = updatedTask;
    this.taskArraySubject.next([...currentTasks]);
  }

  // Method to toggle the completion status of a task by index
  toggleCompletion(index: number) {
    // Get the current tasks from the BehaviorSubject
    const currentTasks = this.taskArraySubject.getValue();

    // Toggle the completion status of the task at the specified index and notify subscribers about the change
    currentTasks[index].isCompleted = !currentTasks[index].isCompleted;
    this.taskArraySubject.next([...currentTasks]);
  }
}
