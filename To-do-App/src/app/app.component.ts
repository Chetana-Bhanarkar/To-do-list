import { Component, OnInit } from '@angular/core';
import { ToDo } from './model/To-do.model';
import { TodoService } from './service/todo.service';
import { finalize, subscribeOn } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(
    private todoService: TodoService,
    private toast : ToastrService){}

  title = 'To-do-App';
  taskArr: ToDo[] = [];
  addTask: string = ' ';
  editTaskwork : string|any = '';
  editTaskdate : string|any = '';
  editTaskstatus : string|any = '';
  isLoggedIn: boolean = false;
  loginBtnSpinner: boolean = false;

  _todoModel: ToDo = {};
  requestPayload: ToDo = {};


  ngOnInit(): void {
    this.getList() ;
  }

  createTask(todo : ToDo) {
      this.addTask = ' ';
     this.todoService.createTodo(todo).pipe(finalize(()=>(this.loginBtnSpinner = false))).subscribe(data  => {
      this.ngOnInit()
    }, err => {
      alert('error!')
    })
  }

add(){

  this.requestPayload = this.todo_list_model;
  this.createTask(this.requestPayload);

}


  getList() {
    this.todoService.getList().subscribe((response:any) => {
      console.log(response);
      this.taskArr = response ;
      // alert('Task inserted successfully')

    }, err => {
      alert('Unable to get list')
    })
  }

  editTask(){
    this._todoModel.work = this.editTaskwork;
    this._todoModel.date = this.editTaskdate;
    this._todoModel.status = this.editTaskstatus;
    this.todoService.updateTask( this._todoModel).subscribe(res => {
      this.ngOnInit();
    },err=>{
      alert("Failed to edit")
    })
  }

  call(todo : ToDo){
    this._todoModel = todo;
    console.log('call');
  }
//delete 
  deleteTask(todo : ToDo){
    this.todoService.deleteTask(todo).subscribe(res => {
      this.ngOnInit();
      alert('Are you sure ?')
    },err=>{
      alert("Unable to delete")

    })
  }

  public get todo_list_model(): ToDo {
    return this._todoModel
  }

  public set todo_list_model(value: ToDo) {
    this._todoModel = value;
  }

}
