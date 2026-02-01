import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodolistComponent], // HttpClient is provided via app.config.ts
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoapp';
}
