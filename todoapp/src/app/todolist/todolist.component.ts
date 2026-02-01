import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngFor, ngIf, date pipe
import { FormsModule } from '@angular/forms'; // For ngModel
import { HttpErrorResponse } from '@angular/common/http'; // For typing error responses
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Todo, TodoService } from '../todo.service'; // Import Todo and TodoService

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, ConfirmationDialogComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
  providers: [TodoService] // Provide the TodoService
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private todoService: TodoService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.loading = true;
    this.error = null;
    this.todoService.getTodos().subscribe({
      next: (data: Todo[]) => {
        this.todos = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching todos:', err);
        this.showError('Failed to fetch todos. Make sure the API is running.');
        this.loading = false;
      }
    });
  }

  addTodo(): void {
    this.loading = true;
    this.error = null;
    const newTodo = {
      title: this.newTodoTitle, // These are passed to the service
      description: this.newTodoDescription // These are passed to the service
    };
    this.todoService.addTodo(newTodo.title, newTodo.description).subscribe({
      next: (todo: Todo) => {
        this.todos.push(todo);
        this.newTodoTitle = '';
        this.newTodoDescription = '';
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error adding todo:', err);
        this.showError('Failed to add todo.');
        this.loading = false;
      }
    });
  }

  updateTodoStatus(todo: Todo): void {
    this.loading = true;
    this.error = null;
    this.todoService.updateTodo(todo).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating todo:', err);
        this.showError('Failed to update todo status.');
        // Revert the change if update fails to reflect current state
        todo.isCompleted = !todo.isCompleted;
        this.loading = false;
      }
    });
  }

  deleteTodo(todo: Todo): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete "${todo.title}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If user confirmed deletion
        this.loading = true;
        this.error = null;
        this.todoService.deleteTodo(todo.id).subscribe({
          next: () => {
            this.todos = this.todos.filter(t => t.id !== todo.id);
            this.loading = false;
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error deleting todo:', err);
            this.showError('Failed to delete todo.');
            this.loading = false;
          }
        });
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 5000, panelClass: ['snackbar-error'] });
  }
}