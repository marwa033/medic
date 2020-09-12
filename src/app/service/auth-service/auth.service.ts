import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as io from 'socket.io-client';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const baseURL = 'http://157.230.20.69:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user: Observable<firebase.User>;
	userData: any;
   isLoggedIn = false;
  getCategoryResult: any;
  addCategoryResult: any;
  editcategoryresult: any;
  getDistrictResult: any;
  upDistrictresult: any;
  districts: any;
  activeCategory: any;
  activeDistrict: any;
  dataUser: any;
  getAdminsResults: any;
  upAdminsResults: any;
  activeAdmins: any;
  Admin: any;
  bookingDoctorResult: any;
  bookingClientsResult: any;
  getAdsResults: any;
  upAdsTesult: any;
  getPromoResult: any;
  upPromoResult: any;
  PromoCode: any;
  activeAds: any;
  addAds: any;
  getSubscriptionResult: any;
  Subscription: any;
  upSubscription: any;
  getProfileResults: any;
  upProfileResults: any;
  getDoctorResults: any;
  adsDelete: any;
  activeAdmin: any;
  getfilterDistrictResult: any;
  getCategoryFilter: any;
  getClientResults: any;
  AdsResultsfilter: any;
  getAdminsfilter: any;
  doctors: any;
  getBookResults: any;
  getBookfilterResults: any;
  getGroupResults: any;
  getMessageResults: any;
  updoctors: any;
  getCategoryID: any;
  getDistrictID: any;
  getAdsID: any;
  getDoctorID: any;
  addSububscription: any;
  adddoctors: any;
  upSububscription: any;
  getClientFilter: any;
  deleteAdmin: any;
  activeGroup: any;
  deleteGroup: any;
  getfilterDoctor: any;
  getMessagesResults: any;
  private socket: SocketIOClient.Socket;
  messageResult: any;
  getHome: any;
  notification: any;
  getBookingResults: any;
   constructor(private firebaseAuth: AngularFireAuth,
               private router: Router,
               private toastr: ToastrService,
                private http: HttpClient) {
                }
   

 // EMITTER
 sendMessage(msg: string , val , name , Id , time) {
  this.socket = io('http://157.230.20.69:8080/');
  this.socket.emit('newMessage', {groupId: val , text: msg , userName: name ,userId:Id , dateTime: time});
  console.log(this.socket)

}

// HANDLER
onNewMessage(val) {
  this.socket = io('http://157.230.20.69:8080/');
  return Observable.create(observer => {
    this.socket.on('newMessage/'+ val , msg => {
      observer.next(msg);
      console.log(this.socket)
    });
  });
}

// HANDLER
NewMessage(id) {
  this.socket = io('http://157.230.20.69:8080/');
  return Observable.create(observer => {
    this.socket.on('newMessage/'+ id , msg => {
      observer.next(msg);
    });
  });
}


   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */
   getLocalStorageUser() {
      this.userData = JSON.parse(localStorage.getItem('userProfile'));
      if (this.userData) {
         this.isLoggedIn = true;
         return true;
      } else {
         this.isLoggedIn = false;
         return false;
      }
   }


   /////////////////////////////////////////
async homeAnalytics() {
  let log =this.userData['x-auth-token'];
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'core/analytics', {
    method: 'GET'
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getHomeAnalytics = await response.json();
this.getHome = getHomeAnalytics;
return this.getHome;
}

/////////////////////////////////////////
async AddDistrict(value) {
  let log =this.userData['x-auth-token'];
  const data = {name:{ en: value.Ename , ar: value.Aname}};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/districts', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getAddDistrict = await response.json();
let message = getAddDistrict.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showdistrict']);
}
this.districts = getAddDistrict;
return this.districts;
}
/////////////////////////////////////////

/////////////////////////////////////////
async sendYourMessage(val , text , time) {
  let log =this.userData['x-auth-token'];
  const data = {text: text , dateTime: time , groupId: val};
  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'chat/messages/send', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const sendMessageResult = await response.json();
this.messageResult = sendMessageResult;
return this.messageResult;
}
/////////////////////////////////////////
async DoctorAdd(value , hours , phones) {
  let log =this.userData['x-auth-token'];
  const data = { name:{ en: value.EName , ar: value.AName}, 
  title:{en: value.ETitle, ar:value.ATitle },
  bio:{en: value.EBio, ar:value.ABio },
    address:{en: value.EAddress, ar:value.AAddress }, 
    image : value.imageSrc ,logo:value.imageSrcLogo,
  price:value.price , lat : value.lat ,
   lng: value.lang , estimateTime: value.time ,
  clinicPhones:phones , categoryId:value.categories ,
   districtId: value.districts,
user:{name: value.name , phone: value.phone ,password:value.password},numberOfBookingDays:value.booking ,
workingHours :hours

// workingHours.append('day' , value.day)
};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/vendors', {
    method: 'POSt',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getDoctoradd = await response.json();
let message = getDoctoradd.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.toastr.info('Add subscription below');
  // this.router.navigate(['/dashboard/showdoctors']);
}
this.adddoctors = getDoctoradd;
console.log(this.adddoctors)
this.getVendoeId(this.adddoctors._id)
return this.adddoctors;
}

getVendoeId(value) {
  localStorage.setItem('Vendor', JSON.stringify(value));
//   var x = JSON.parse(localStorage.getItem('Vendor'));
// console.log(x)
}

/////////////////////////////////////////
async AddSubscription(value) {
  let log =this.userData['x-auth-token'];
  let id = JSON.parse(localStorage.getItem('Vendor'));
  const data = {startDate: value.startDate , endDate: value.endDate ,vendorId :id }

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/Subscriptions', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getAddSubscription = await response.json();
let message = getAddSubscription.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added Subscription');
  this.router.navigate(['/dashboard/showdoctors']);
}
this.addSububscription = getAddSubscription;
return this.addSububscription;
}

/////////////////////////////////////////
async editAddSubscription(value,val) {
  let log =this.userData['x-auth-token'];
  // let vID = JSON.parse(localStorage.getItem('upVendor'));
  const data = {startDate: value.startDate , endDate: value.endDate ,vendorId :val }

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/Subscriptions', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getAddSubscription = await response.json();
let message = getAddSubscription.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added Subscription');
  this.router.navigate(['/dashboard/showdoctors']);
}
this.addSububscription = getAddSubscription;
return this.addSububscription;
}


/////////////////////////////////////////
async UpdateSubscription(value , val) {
  let log =this.userData['x-auth-token'];
  // console.log(Id)
  const data = { _id: value.subID,startDate: value.startDate , endDate: value.endDate ,vendorId :val }

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/Subscriptions', {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getUpSubscription = await response.json();
let message = getUpSubscription.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated Subscription');
  this.router.navigate(['/dashboard/showdoctors']);
}
this.upSububscription = getUpSubscription;
return this.upSububscription;
}


/////////////////////////////////////////
async UpdateDoctor(value , phones , hours) {
  let log =this.userData['x-auth-token'];
  const data = { _id: value.id ,name:{ en: value.EName , ar: value.AName}, title:{en: value.ETitle, ar:value.ATitle },
  bio:{en: value.EBio, ar:value.ABio },  address:{en: value.EAddress, ar:value.AAddress }, image : value.imageSrc ,logo:value.imageSrcLogo,
  price:value.price , lat : value.lat , lng: value.lang , estimateTime: value.time ,
  clinicPhones:phones , categoryId:value.categories , districtId: value.districts,
user:{name: value.name , phone: value.phone },numberOfBookingDays:value.booking ,
workingHours :hours

// workingHours.append('day' , value.day)
};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/vendors', {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const getUpdateDoctor = await response.json();
let message = getUpdateDoctor.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  // this.router.navigate(['/dashboard/showdoctors']);
}
this.updoctors = getUpdateDoctor;
return this.updoctors;
}

/////////////////////////////////////////
// async AddSubscription(value) {
//   let log =this.userData['x-auth-token'];
//   const data = { startDate: value.startDate , endDate: value.endDate , vendorId : value.doctors};

//   const bodyobj = JSON.stringify(data);
//   const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
//   const request = new Request(baseURL + 'payments/Subscriptions', {
//     method: 'POST',
//     body: bodyobj
// });
// request.headers.delete('Content-Type');
// request.headers.append('Content-Type', 'application/json');
// request.headers.append('x-auth-token', log);

// const response = await fetch( request);
// const responseAddSubscription = await response.json();
// let message = responseAddSubscription.message;
// if (message) {
//   this.toastr.error(message);

// }
//  else{
//   this.toastr.success('Successfully Added');
//   this.router.navigate(['/dashboard/showsubscription']);
// }
// this.Subscription = responseAddSubscription;
// return this.Subscription;
// }
/////////////////////////////////////////
async sendNotification(value) {
  let log =this.userData['x-auth-token'];
  const data = {title: value.nTitle , body:value.nBody};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/notifications/sendMessage?lang=ar&type=' + value.type, {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const responseAddPromo = await fetch( request);
const sendNotificationResult = await responseAddPromo.json();
let message = sendNotificationResult.message;
if (message) {
  this.toastr.success(message);
// console.log('***')
}
 else{
  this.toastr.success('Successfully Send');
}
this.notification = sendNotificationResult;
return this.notification;
}
/////////////////////////////////////////
async AddPromo(value ,doc) {
  let log =this.userData['x-auth-token'];
  const data = {code: value.Code ,  startDate : value.Date , daysPeriod: value.Period , maxNumberOfUses: value.Users,
    amount: value.Amount , type : value.Type , vendorIds: doc};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/promocodes', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const responseAddPromo = await fetch( request);
const getAddDistrict = await responseAddPromo.json();
let message = getAddDistrict.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showpromo']);
}
this.PromoCode = getAddDistrict;
return this.PromoCode;
}
/////////////////////////////////////////
async AddAdmin(value) {
  // console.log(value.name);
  // console.log(value.email);
  // console.log(value.phone);
  // console.log(value.password);
  let log =this.userData['x-auth-token'];
  const data = {role: value.role , user:{ name: value.name , email: value.email ,phone: value.phone , password: value.password }};
// Role
  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/admins', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

const response = await fetch( request);
const responseAdmin = await response.json();
let message = responseAdmin.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showadmins']);

}
this.Admin = responseAdmin;
return this.Admin;
}
/////////////////////////////////////////
async AddAds(value) {
// console.log("english title = > " + value.ETitle);console.log("arabic title => " + value.ATitle);
// console.log("end date = > " + value.endDate);console.log("image => " + value.imageSrc);
// console.log("doctor id => " + value.doctors);
  let log =this.userData['x-auth-token'];
  const data = {title:{ en: value.ETitle , ar: value.ATitle} , endDate:value.endDate ,image : value.imageSrc , vendorId: value.doctors};

  const bodyobj = JSON.stringify(data);
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/ads', {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
console.log(data);
const response = await fetch( request);
const responseAdsresult = await response.json();
let message = responseAdsresult.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showads']);

}
this.addAds = responseAdsresult;
return this.addAds;
}
/////////////////////////////////////////
async ADDCategory(value) {
  let log =this.userData['x-auth-token'];
  console.log(value.imageSrc);
const data = { image: value.imageSrc, color: value.Color , "name": { en : value.EName , ar : value.AName} 
 };
//  if(value.imageSrc == ""){
//   value.imageSrc == 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAF3CAMAAABkLEnOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMiaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBGRkQxRDNDOTFDNTExRTRCOUY3QzlGMTNGNzUwMjQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBGRkQxRDNEOTFDNTExRTRCOUY3QzlGMTNGNzUwMjQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEZGRDFEM0E5MUM1MTFFNEI5RjdDOUYxM0Y3NTAyNDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEZGRDFEM0I5MUM1MTFFNEI5RjdDOUYxM0Y3NTAyNDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5+2M54AAAC2VBMVEVMaXG3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7fD4v+rAAAA8nRSTlMAAwECcNDABBAuBvAKDwx466Hkv4AtzPr+/AnjxPcUHlocgyrJV/YTwqjg6ssH7/QLHySqKTOFTPE8ZSdQmJ2iIUUmMHM1WX0gY8po8/gVugVI2OLnI6np11b73J5g5gj1vEDlxmnV+YJJ7rDU/a/TGb5Cis0SN73hRpMXZKyxEdqcXqvPL1PZWJveoD5Di844e8OkyOyujw6z8ii4mRhbfx1BhCJqrY4NstZ0t9vB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'
//  }
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/categories',
{
method: 'POST',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

await fetch( request)
.then(response => response.json())
.then(json => this.getAddCategoryResponse(json))
.catch(err => {
 this.toastr.error(err.message);
});

}
getAddCategoryResponse( resposne) {
// console.log(resposne);
let message = resposne.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['/dashboard/showcategory']);
}this.addCategoryResult = resposne;
}

/////////////////////////////////////////


async editCategories(value) {
  let log =this.userData['x-auth-token'];

const data = {_id:value.id, image: value.imageSrc , color: value.upColor , "name": { en : value.upEName , ar : value.upAName}};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/categories',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const editresponse = await response.json();
  // if(value.imageSrc == ""){
  //   value.imageSrc == editresponse.data[value.id].image;
  // }

//  console.log(value.imageSrc);
  this.editcategoryresult = editresponse;
  return this.editcategoryresult;
}
/////////////////////////////////////////
async UpdateDistrict(value) {
  let log =this.userData['x-auth-token'];
  const data = {_id:value.id, "name": { en : value.upEName , ar : value.upAName} 
};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/districts',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseupDistrictdata = await response.json();
  this.upDistrictresult = responseupDistrictdata;
  return this.upDistrictresult;
}
/////////////////////////////////////////
async UpdatePromo(value , doc) {
  // console.log(value.upid);
  let log =this.userData['x-auth-token'];
  const data = { _id:value.id , code : value.upCode , startDate: value. upDate , daysPeriod : value.upDays , maxNumberOfUses: value.upUsers,
    amount: value.upAmount , vendorIds : doc};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'payments/promocodes',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseupPromo = await response.json();
  
  this.upPromoResult = responseupPromo;
  return this.upPromoResult;
}
/////////////////////////////////////////
async UpdateAdmins(value) {
  let log =this.userData['x-auth-token'];
  const data = {_id:value.id, role: value.role ,user: { name : value.upName , email : value.upEmail , phone: value.upPhone  } };
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'auth/admins',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseUpAdmins = await response.json();
 
  this.upAdminsResults = responseUpAdmins;
  
  return this.upAdminsResults;
}
/////////////////////////////////////////
async UpdateProfile(value) {
  let log =this.userData['x-auth-token'];
  const data = { name : value.name , email : value.email , phone: value.phone};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'auth/users/editProfile',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);

        const response = await fetch( request);
  const responseUpProfile = await response.json();
  let message = responseUpProfile.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Updated');
    // this.router.navigate(['/dashboard/showadmins']);
  
  }  
  this.upProfileResults = responseUpProfile;
  
  return this.upProfileResults;
}


/////////////////////////////////////////
async UpdateAds(value) {
  // console.log(value.id);
  // console.log(value.upETitle);
  // console.log(value.upATitle);
  // console.log(value.editimage);
  // console.log(value.doctorId);

  let log =this.userData['x-auth-token'];
  const data = {_id:value.id, title: { en : value.upETitle , ar : value.upATitle} ,
      image : value.imageSrc , endDate:value.endDate,
       vendorId: value.doctors};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/ads',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
const response = await fetch( request);
const responseUpAds = await response.json();
// let message = responseUpAds.message;
// if (message) {
//   this.toastr.error(message);

// }
//  else{
//   this.toastr.success('Successfully Updated');  
//   // this.Close();       
// }
    this.upAdsTesult = responseUpAds;
  return this.upAdsTesult;
}
/////////////////////////////////////////
async Activation(element) {
  let log =this.userData['x-auth-token'];
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/categories/changeState',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
// console.log(log);
        const response = await fetch( request);
  const responseActivedata = await response.json();
  this.activeCategory = responseActivedata;
  this.toastr.info('Change State');
  // this.router.navigate(['/dashboard/showcategory']);
  return this.activeCategory;
}
/////////////////////////////////////////
async AdminActivation(element) {
  let log =this.userData['x-auth-token'];
  const data = {_id:element.user._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'auth/users/changeState',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
        const response = await fetch( request);
  const responseActiveAdmindata = await response.json();
  this.activeAdmin = responseActiveAdmindata;
  this.toastr.info('Change State');
  return this.activeAdmin;
}
/////////////////////////////////////////
async GroupActivation(element) {
  let log =this.userData['x-auth-token'];
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'chat/groups/changeState',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
        const response = await fetch( request);
  const responseActiveGroup = await response.json();
  this.activeGroup = responseActiveGroup;
  this.toastr.info('Change State');
  return this.activeGroup;
}

/////////////////////////////////////////
async AdminDelete(element) {
  let log =this.userData['x-auth-token'];
const request = new Request(baseURL + 'auth/admins/' + element.user._id,
{
method: 'DELETE'
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
        const response = await fetch( request);
  const responseDelete = await response.json();
  this.deleteAdmin = responseDelete;
  // this.toastr.info('Successfully Delete');
  return this.deleteAdmin;
}
/////////////////////////////////////////
async GroupDelete(element) {
  let log =this.userData['x-auth-token'];
const request = new Request(baseURL + 'chat/groups/' + element._id,
{
method: 'DELETE'
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
        const response = await fetch( request);
  const responseGroup = await response.json();
  this.deleteGroup = responseGroup;
  this.toastr.info('Successfully Delete');
  return this.deleteGroup;
}
/////////////////////////////////////////
async AdsActivation(element) {
  let log =this.userData['x-auth-token'];
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/ads/changeState',
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
// console.log(log);
        const response = await fetch( request);
  const responseAds = await response.json();
  // let message = responseAds.message;

    this.toastr.info('Change State');
    this.router.navigate(['/dashboard/showads']);
  this.activeAds = responseAds;

  return this.activeAds;
}
/////////////////////////////////////////
async DeleteAds(element) {
  let log =this.userData['x-auth-token'];
  const data = {};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/ads/'+element._id,
{
method: 'DELETE',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
// console.log(log);
        const response = await fetch( request);
  const responseAdsDelete = await response.json();
  // let message = responseAdsDelete.message;
  this.toastr.info('successfully deleted');
    this.router.navigate(['/dashboard/showads']);
  this.adsDelete = responseAdsDelete;

  return this.adsDelete;
}
/////////////////////////////////////////
async DistrictActive(element) {
  let log =this.userData['x-auth-token'];  
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);

const request = new Request(baseURL + 'components/districts/changeState',

{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', log);
// request.params.append('state', element.filter)

        const response = await fetch( request);
  const responseActivedistrict = await response.json();
  this.activeDistrict = responseActivedistrict;
  // console.log(this.activeDistrict);
  this.toastr.info('Change State');
  this.router.navigate(['/dashboard/showdistrict']);
  return this.activeDistrict;
}
/////////////////////////////////////////
async GetProfile() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/users/me',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        const response = await fetch( request);
  const responsegetProfile = await response.json();

  this.getProfileResults = responsegetProfile;
  return this.getProfileResults;
}
/////////////////////////////////////////
async GetDoctor() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/vendors/subscriptions?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);  
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetDoctor = await response.json();
console.log(x);
  this.getDoctorResults = responsegetDoctor;
  return this.getDoctorResults;
}
/////////////////////////////////////////
async GetGroup() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'chat/groups?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetGroup = await response.json();

  this.getGroupResults = responsegetGroup.data;
  return this.getGroupResults;
}

/////////////////////////////////////////
async GetMessages() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'chat/messages/group/5ed80823a2bf15068dae56b3?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetMessage = await response.json();

  this.getMessageResults = responsegetMessage;
  return this.getMessageResults;
}

/////////////////////////////////////////
async GetClients() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/clients?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetClients = await response.json();

  this.getClientResults = responsegetClients;
  return this.getClientResults;
}

/////////////////////////////////////////
async GetFilterClients(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/clients?pageNumber=1&pageSize=100&state=' + value.status,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetClientsFilter = await response.json();

  this.getClientFilter = responsegetClientsFilter;
  return this.getClientFilter;
}

/////////////////////////////////////////
async GetBooking() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetbooks = await response.json();

  this.getBookingResults = responsegetbooks.data;
  return this.getBookingResults;
}


/////////////////////////////////////////
async TryBooking() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const tryResponse = await response.json();

  this.getBookingResults = tryResponse;
  return this.getBookingResults;
}
/////////////////////////////////////////
async GetBookingfilter(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings?completed=' + value.complete + '&vendorId=' + value.doctors,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetbooksfilter = await response.json();

  this.getBookfilterResults = responsegetbooksfilter;
  return this.getBookfilterResults;
}
/////////////////////////////////////////
async GetBookingClient(val) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings?clientId=' + val ,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetbooksfilter = await response.json();

  this.getBookfilterResults = responsegetbooksfilter;
  return this.getBookfilterResults;
}
/////////////////////////////////////////
async getMessages(val) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'chat/messages/group/' + val,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseGetMessages = await response.json();

  this.getMessagesResults = responseGetMessages;
  console.log(this.getMessagesResults)
  return this.getMessagesResults;
}
/////////////////////////////////////////
async GetBookingVendor(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings?pageNumber=1&pageSize=100&vendorId='+ value,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetbooksfilter = await response.json();

  this.getBookfilterResults = responsegetbooksfilter;
  return this.getBookfilterResults;
}
/////////////////////////////////////////
async GetCategories() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const date = {}
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/categories?pageNumber=1&pageSize=100&',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsedata = await response.json();
  // console.log('from the another function categories');
  this.getCategoryResult = responsedata;
  return this.getCategoryResult;
}
/////////////////////////////////////////
async GetFilterCategories(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const date = {}
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/categories?pageNumber=1&pageSize=100&state='+value.status 
  + '&name=' + value.filter,
  { method: 'GET',
  });
  this.getlang(x);
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsedatafilter = await response.json();
  // console.log('from the another function categories');
  this.getCategoryFilter = responsedatafilter;
  return this.getCategoryFilter;
}
getlang(value) {
  localStorage.setItem('language', JSON.stringify(value));

}
/////////////////////////////////////////
async GetIDCategories(element) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const date = {}
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/categories/' + element._id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsedataID = await response.json();
  // console.log('from the another function categories');
  this.getCategoryID = responsedataID;
  return this.getCategoryID;
}
/////////////////////////////////////////
async GetIDAds(element) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const date = {}
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/ads/' + element._id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseAdsID = await response.json();
  // console.log('from the another function categories');
  this.getAdsID = responseAdsID;
  return this.getAdsID;
}
/////////////////////////////////////////
async GetIDDistrict(element) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const date = {}
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/districts/' + element._id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsedistrictID = await response.json();
  this.getDistrictID = responsedistrictID;
  return this.getDistrictID;
}

/////////////////////////////////////////
async GetIDDoctor(val) {
  let log =this.userData['x-auth-token'];
  let  lang = JSON.parse(localStorage.getItem('language'));
  const date = {}
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/vendors/' + val,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', lang);
        const response = await fetch( request);
  const responseDoctorID = await response.json();
  this.getDoctorID = responseDoctorID;
  return this.getDoctorID;
}

/////////////////////////////////////////
async GetAds() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/ads?',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetads = await response.json();
  // console.log('from the another function categories');
  this.getAdsResults = responsegetads;
  return this.getAdsResults;
}

/////////////////////////////////////////
async GetAdsFilter(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/ads?state=' + value.status,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetadsfilter = await response.json();
  // console.log('from the another function categories');
  this.AdsResultsfilter = responsegetadsfilter;
  return this.AdsResultsfilter;
}

////////////////////////////+/////////////responsegetpromo
async GetDistrict() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/districts?pageNumber=1&pageSize=100',
  { method: 'GET',}
  );
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsedistrictdata = await response.json();
  
  this.getDistrictResult = responsedistrictdata;
  return this.getDistrictResult;
}
//////////////////////////////////////////////
async GetFilterDistrict(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/districts?pageNumber=1&pageSize=100&state='+value.status+'&name='+value.filter,
  { method: 'GET',}
  )
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsedistrictfilter = await response.json();
  
  this.getfilterDistrictResult = responsedistrictfilter;
  return this.getfilterDistrictResult;
}
//////////////////////////////////////////////
async GetFilterDoctor(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/vendors/subscriptions?pageNumber=1&pageSize=100&state='+value.status+'&name='+value.filter
  + '&categoryId=' + value.category + '&districtId=' + value.district + '&subscriptionDate=' + value.subscription,
  { method: 'GET',}
  )
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseDoctorfilter = await response.json();
  
  this.getfilterDoctor = responseDoctorfilter;
  return this.getfilterDoctor;
}
/////////////////////////////////////////
async GetSubscription() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/Subscriptions?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseSubscription = await response.json();
  
  this.getSubscriptionResult = responseSubscription;
  return this.getSubscriptionResult;
}
/////////////////////////////////////////
async GetPromo() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));

  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'payments/promocodes?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responsegetpromo = await response.json();
  
  this.getPromoResult = responsegetpromo;
  return this.getPromoResult;
}
/////////////////////////////////////////
async GetAdmins() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/admins?pageNumber=1&pageSize=100',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseAdminsData = await response.json();
  this.getAdminsResults = responseAdminsData;
  return this.getAdminsResults;
}

/////////////////////////////////////////
async GetAdminsFilter(value) {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'auth/admins?pageNumber=1&pageSize=100&state=' + value.status,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseAdminsfilter = await response.json();
  this.getAdminsfilter = responseAdminsfilter;
  return this.getAdminsfilter;
}
/////////////////////////////////////////
async GetBookingDoctors() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings/vendor/5ead9a1af87af0111ca7fa58?pageNumber=1&pageSize=100&completed=true',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseBookDoctor = await response.json();
  this.bookingDoctorResult = responseBookDoctor;
  // console.log(this.bookingDoctorResult);
  return this.bookingDoctorResult;
}
/////////////////////////////////////////
async GetBookingClients() {
  let log =this.userData['x-auth-token'];
  let  x = JSON.parse(localStorage.getItem('language'));
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  const request = new Request(baseURL + 'components/bookings/client/5ead9a1af87af0111ca7fa58?pageNumber=1&pageSize=100&completed=true',
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('x-auth-token', log);
        request.headers.append('lang', x);
        const response = await fetch( request);
  const responseBookClient = await response.json();
  this.bookingClientsResult = responseBookClient;
  // console.log(this.bookingClientsResult);
  return this.bookingClientsResult;
}


////////////////////////////////////////
  async loginUser(value) {
      const data = {email: value.mail, password: value.passcode};
      const bodyobj = JSON.stringify(data);
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      const request = new Request(baseURL + 'auth/users/login/email', {
        method: 'POST',
        body: bodyobj
    });
     request.headers.delete('Content-Type');
    request.headers.append('Content-Type', 'application/json');
    const response = await fetch( request);
    const responsedata = await response.json();
    let message = responsedata.message;
    if (message) {
      
      this.toastr.error(message);
      this.router.navigate(['/session/login']);

    }
     else{
      this.getrsponse(responsedata);
    }
    // this.getrsponse(responsedata);
   }
   getrsponse(resposne) {
 
      this.setLocalUserProfile(resposne);
 this.toastr.success('Successfully Logged In!');
 this.router.navigate(['/']);
    this.userData = resposne['x-auth-token'];
  }




   logOut() {
     
  var layout = JSON.parse(localStorage.getItem('layout'));
      this.firebaseAuth
      .auth
      .signOut();
      localStorage.removeItem('userProfile');
      localStorage.setItem('language', JSON.stringify('en'));
      this.isLoggedIn = false;
      this.toastr.success('Successfully logged out!');
      this.router.navigate(['/session/login']);
   }

   /*
    * setLocalUserProfile function is used to set local user profile data.
    */
   setLocalUserProfile(value) {
   	localStorage.setItem('userProfile', JSON.stringify(value));
      this.getLocalStorageUser();
      this.isLoggedIn = true;
   }
}
