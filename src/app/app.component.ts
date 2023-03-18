import { AfterViewInit,Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmplAddEditComponent } from './empl-add-edit/empl-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './services/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-app';
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email','dob','gender','technology','package','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog :MatDialog,private _empService:EmployeeService,private _core:CoreService){}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getEmployees();

  }
  getEmployees(){
    this._empService.getEmployees().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
        console.log(res);},
      error:console.log
    })
  }
  addEditDialog(){
   const dialogRef= this._dialog.open(EmplAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next: (val:any) => {
      if(val){
        this.getEmployees();
      }
    }
   })
  }
  openEditForm(data:any){
    const dialogRef=this._dialog.open(EmplAddEditComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val){
          this.getEmployees();
        }
      }
     })
  }
  deleteEmployee(id:number){
    this._empService.deleteemployee(id).subscribe({
      next: (response:any)=>{
        this._core.OpenSnackBar("Deleted SuccessFUlly","OK");
        this.getEmployees();
      },
      error:console.log
    })
  }
}
