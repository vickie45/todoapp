import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Todo interface to match your backend model
export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5257/todos'; // Your .NET API base URL

  constructor(private http: HttpClient) { }

  /**
   * Fetches all todo items from the API.
   * @returns An Observable of an array of Todo items.
   */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  /**
   * Adds a new todo item to the API.
   * @param title The title of the new todo.
   * @param description The description of the new todo.
   * @returns An Observable of the newly created Todo item.
   */
  addTodo(title: string, description: string): Observable<Todo> {
    const newTodo = { title, description };
    return this.http.post<Todo>(this.apiUrl, newTodo);
  }

  /**
   * Updates an existing todo item's status or details.
   * @param todo The todo item with updated properties.
   * @returns An Observable of the updated Todo item.
   */
  updateTodo(todo: Todo): Observable<Todo> {
    const updatedTodo = {
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted
    };
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, updatedTodo);
  }

  /**
   * Deletes a todo item from the API.
   * @param id The ID of the todo item to delete.
   * @returns An Observable indicating the completion of the delete operation.
   */
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}