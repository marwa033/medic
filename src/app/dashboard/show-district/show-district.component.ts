import { Component, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';


@Component({
  selector: 'ms-show-district',
  templateUrl: './show-district.component.html',
  styleUrls: ['./show-district.component.scss']
})
export class ShowDistrictComponent implements OnInit {
  id: string = '';
  editeName: string= '';
  upaName: string = '';
  createdAt = new Date();
  updatedAt = new Date();

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = [ 'name','state' ,  'createdAt' , 'updatedAt' , 'action'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  results: any;
  tries: any;
  filter: any;
  editEName: any;
  
  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
   private router : Router,
   private toastr: ToastrService,
     config: NgbModalConfig,
     private spinner: NgxSpinnerService,
      private modalService: NgbModal) {
       config.backdrop = 'static';
       config.keyboard = false;
    }
    openLg(content) {
      this.modalService.open(content, { size: 'lg' });
    }
 
    Districts(){
      this.authService.GetDistrict().
                then( responsedistrictdata => { this.results = responsedistrictdata;
                   this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                   this.dataSource.paginator = this.paginator;
                   this.dataSource.sort = this.sort; 
                   console.log( this.results );
                   setTimeout(() => {
                    this.spinner.hide();
                  }, this.results);
                });
               }

               Update(value){
                this.authService.UpdateDistrict(value).
                          then( responseupDistrictdata => { this.tries = responseupDistrictdata;
                            let message = responseupDistrictdata.message;
                              if (message) {
                                    this.toastr.error(message);
                                   }
                                      else{
                                            this.toastr.success('Successfully Updated');
                                            this.Close();
                                       }
  
                          });
              } 
              Close(){ 
                this.modalService.dismissAll(); 
                this.spinner.show();
                window.location.reload();
                 } 

                 editRow(element)
                 {
                   this.id = element._id;
                   this.editEName = element.name;
                 }

Active(element){
  console.log('ACTIVE/INACTIVE');
  this.authService.DistrictActive(element).
  then( responseActivedistrict => { this.tries = responseActivedistrict;
    element.state = this.tries.state;
    this.Close();
  });
}
  ngOnInit() {
    this.spinner.show();

    this.Districts();
  }

}