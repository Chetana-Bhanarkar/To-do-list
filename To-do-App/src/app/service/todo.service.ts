import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDo } from '../model/To-do.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  Base_URL : string;

  constructor(private http : HttpClient) {
    this.Base_URL = "http://localhost:3000/list"
  }

  createTodo(todo : ToDo) : Observable<Object>{
    return this.http.post(`${this.Base_URL}`, todo) ;
  }


  getList():Observable<Object>{
    return this.http.get(`${this.Base_URL}`)
  }

  updateTask(todo : ToDo):Observable<Object>{
    return this.http.put(this.Base_URL + '/'+ todo.id, todo )
  }

  deleteTask(todo : ToDo):Observable<Object>{
    return this.http.delete(this.Base_URL + '/'+ todo.id);
  }
}
