import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
  startDate : Date;
  endDate : Date;
  tries: any;

  constructor(public translate: TranslateService,
    public authService: AuthService,
   private pageTitleService: PageTitleService ,
     config: NgbModalConfig,
      private modalService: NgbModal) {}

      Add(value){
        this.authService.AddSubscription(value).
                  then( responseAddSubscription => { this.tries = responseAddSubscription;
                  });
      }  
  ngOnInit() {
  }

}
