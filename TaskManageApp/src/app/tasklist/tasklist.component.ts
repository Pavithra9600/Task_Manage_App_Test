// Import necessary modules from Angular
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service'; // Import the TaskService

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {

  // Array to store the tasks
  taskArray: Array<any> = [];

  // Constructor with dependency injection of TaskService
  constructor(private taskService: TaskService) {}

  // Lifecycle hook: ngOnInit is called after the component is initialized
  ngOnInit(): void {
    // Subscribe to updates in the task service's taskArray$
    this.taskService.taskArray$.subscribe(tasks => {
      this.taskArray = tasks; // Update the local taskArray with the latest data
    });
  }

  // Method to handle form submission
  onSubmit(form: NgForm) {
    // Add a new task using the TaskService
    this.taskService.addTask({
      taskName: form.controls['task'].value,
      description: form.controls['description'].value,
      isCompleted: false
    });

    form.reset(); // Reset the form after submission
  }

  // Method to handle task deletion
  onDelete(index: number) {
    // Delete a task using the TaskService
    this.taskService.deleteTask(index);
  }

  // Method to handle task editing
  onEdit(index: number) {
    const editedTask = this.taskArray[index];

    // Prompt the user for new task name and description
    const newTaskName = prompt('Enter new task name:', editedTask.taskName);
    const newDescription = prompt('Enter new task description:', editedTask.description);

    // If the user provides new values, update the task using the TaskService
    if (newTaskName !== null && newDescription !== null) {
      const updatedTask = { ...editedTask, taskName: newTaskName, description: newDescription };
      this.taskService.updateTask(index, updatedTask);
    }
  }

  // Method to handle task completion status change
  onCheck(index: number) {
    // Toggle the completion status of a task using the TaskService
    this.taskService.toggleCompletion(index);
  }
}
