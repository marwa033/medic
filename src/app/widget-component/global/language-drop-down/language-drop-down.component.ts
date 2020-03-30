import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'ms-language-drop-down',
  templateUrl: './language-drop-down.component.html',
  styleUrls: ['./language-drop-down.component.scss']
})
export class LanguageDropDownComponent implements OnInit {

   currentLang = 'en';
   selectImage = 'assets/img/en.png';

	langArray : any [] = [
      {  
         img:"assets/img/en.png",
         name:"English",
         value	: "en"
      },     
      {  
         img:"assets/img/france.png",
         name:"French",
         value:"fr"
      },      
      {  
         img:"assets/img/ar.png",
         name:"Arabic",
         value:"ar"
      },

   ];

	constructor(public translate : TranslateService) { }

	ngOnInit() {
	}

   //setLang method is used to set the language into template.
   setLang(lang) {
      for(let data of this.langArray) {
         if(data.value == lang) {
            this.selectImage = data.img;
            break;
         }
      }
      this.translate.use(lang);
   }
}
