import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'count' ,'name', 'phone' , 'action' , 'any'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  id : any = [];
  tries: any;
  delete: any;
  name: any;
  new : Boolean = false 
 
  constructor(public translate: TranslateService,
    public authService: AuthService,
    private router: Router,
   private pageTitleService: PageTitleService ,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    }                


    Group(){
      this.authService.GetGroup().
                then( getGroupResults => { this.results = getGroupResults;
                   this.dataSource = new MatTableDataSource(getGroupResults);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort;
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                  console.log(this.results)

                  this.results.forEach(element => {
                    let id =element._id
                    this.authService.NewMessage(id).subscribe(msg => {
                      location.reload();
                      this.new = true
                    });
                  });

                });
               }


               Close(){ 
                this.modalService.dismissAll(); 
                this.spinner.show();
                window.location.reload();
                 }  

               Active(element){
                this.authService.GroupActivation(element).
                then( responseActiveGroup => { this.tries = responseActiveGroup;
                  //  console.log(element);
                   this.Close();   
                });
               }
               Delete(element){
                 if(confirm('Are you sure you want to delete this chat?')){
                this.authService.GroupDelete(element).
                then( responseGroup => { this.delete = responseGroup;
                  //  console.log(element);
                   this.Close();   
                });}else{}
               }
               
  ngOnInit() {
    this.spinner.show();
    this.Group();
    // for(let i=0; i>= this.results ; i++){
    // }
  }

}
