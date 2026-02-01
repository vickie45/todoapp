import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngFor, ngIf, date pipe
import { FormsModule } from '@angular/forms'; // For ngModel
import { HttpClient } from '@angular/common/http'; // For API calls
import { MatCardModule } from '@angular/material/card'; // For mat-card
import { MatInputModule } from '@angular/material/input'; // For matInput
import { MatFormFieldModule } from '@angular/material/form-field'; // For mat-form-field
import { MatButtonModule } from '@angular/material/button'; // For mat-button
import { MatListModule } from '@angular/material/list'; // For mat-list, mat-list-item
import { MatCheckboxModule } from '@angular/material/checkbox'; // For mat-checkbox
import { MatIconModule } from '@angular/material/icon'; // For mat-icon
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // For mat-spinner
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Import the standalone dialog component

// Define the Todo interface to match your backend model
interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, ConfirmationDialogComponent], // Keep ConfirmationDialogComponent in imports if it's used in the template, otherwise remove. It's used programmatically, so it should be removed from imports.
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  loading: boolean = false;
  error: string | null = null;

  // Assuming your .NET API runs on https://localhost:5257
  private apiUrl = 'http://localhost:5257/todos'; // Changed to HTTPS

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.loading = true;
    this.error = null;
    this.http.get<Todo[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: (err) => {
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
      title: this.newTodoTitle,
      description: this.newTodoDescription
    };

    this.http.post<Todo>(this.apiUrl, newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTodoTitle = '';
        this.newTodoDescription = '';
        this.loading = false;
      },
      error: (err) => {
        console.error('Error adding todo:', err);
        this.showError('Failed to add todo.');
        this.loading = false;
      }
    });
  }

  updateTodoStatus(todo: Todo): void {
    this.loading = true;
    this.error = null;
    const updatedTodo = {
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted
    };

    this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, updatedTodo).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
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
        this.http.delete(`${this.apiUrl}/${todo.id}`).subscribe({
          next: () => {
            this.todos = this.todos.filter(t => t.id !== todo.id);
            this.loading = false;
          },
          error: (err) => {
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