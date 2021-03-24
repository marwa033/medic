import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {MatIconModule} from '@angular/material/icon';
import {
			MatButtonModule,
			MatTabsModule,
			MatCardModule,
			MatMenuModule,
			MatCheckboxModule,
			MatDividerModule,
			MatProgressBarModule,
         MatInputModule,      
			MatFormFieldModule,
			MatTableModule,
			MatListModule, 
			MatPaginatorModule,
			MatChipsModule,
			MatSortModule,
			MatSelectModule,
			MatDialogModule,
			MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
			import { GridModule, PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
// import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DashboardRoutes } from './dashboard.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { SaasComponent } from './saas/saas.component';
import { CrmComponent } from './crm/crm.component';


import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { ModalModule } from '@bit/valor-software.ngx-bootstrap.modal';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ShowDistrictComponent } from './show-district/show-district.component';
import { AddDistrictComponent } from './add-district/add-district.component';
import { GetAdminComponent } from './get-admin/get-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { BookingDoctorsComponent } from './booking-doctors/booking-doctors.component';
import { BookingClientsComponent } from './booking-clients/booking-clients.component';
import { ShowAdsComponent } from './show-ads/show-ads.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { ShowPromoComponent } from './show-promo/show-promo.component';
import { AddPromoComponent } from './add-promo/add-promo.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { ShowSubscriptionComponent } from './show-subscription/show-subscription.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowDoctorComponent } from './show-doctor/show-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ShowClientsComponent } from './show-clients/show-clients.component';
import { BookingComponent } from './booking/booking.component';
import { GroupComponent } from './group/group.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TryComponent } from './try/try.component';

@NgModule({
	declarations: [
		SaasComponent,
		CrmComponent,
		AddCategoryComponent,
		ShowDistrictComponent,
		AddDistrictComponent,
		GetAdminComponent,
		AddAdminComponent,
		BookingDoctorsComponent,
		BookingClientsComponent,
		ShowAdsComponent,
		AddAdsComponent,
		ShowPromoComponent,
		AddPromoComponent,
		AddSubscriptionComponent,
		ShowSubscriptionComponent,
		ProfileComponent,
		ShowDoctorComponent,
		AddDoctorComponent,
		ShowClientsComponent,
		BookingComponent,
		GroupComponent,
		MessagesComponent,
		NotificationsComponent,
		TryComponent
	],
	imports: [ GridModule,
		ListViewModule ,
		MatTableModule ,
		ButtonModule,
		MatDatepickerModule,
		ChartModule ,
		RichTextEditorAllModule,
		MatExpansionModule,
		DocumentEditorContainerAllModule,
		MatDialogModule,
		CommonModule,
		MatTableModule,
		MatSelectModule,
		FlexLayoutModule,
		WidgetComponentModule,
		EasyPieChartModule,
		MatPaginatorModule,
		MatChipsModule,
      TranslateModule,
      PerfectScrollbarModule,
		RouterModule.forChild(DashboardRoutes),
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatCardModule,
		MatMenuModule,
		MatListModule,
		MatCheckboxModule,
		MatDividerModule,
		ChartsModule,
		NgxDatatableModule,
		MatProgressBarModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatSortModule,
		NgxSpinnerModule,
		AgmCoreModule.forRoot({apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k'})
	],
	providers: [
		PageService, SortService, FilterService, GroupService,
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
		NgbModalConfig, NgbModal
	  ],
	  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
