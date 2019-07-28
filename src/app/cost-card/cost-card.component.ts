import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-cost-card',
  templateUrl: './cost-card.component.html',
  styleUrls: ['./cost-card.component.css'],
  providers: [DataService]
})
export class CostCardComponent implements OnInit {

  categories = [];
  models = [];
  SubCategory = [];
  regions = [];
  contries = [];
  categoriesDis: boolean;
  selectedCategries: any;
  selectedSubCategries: any;
  SubCategoryDis: boolean;
  selectedModel: any;
  selectedRegion: any;
  selectedContry = [];
  contryDis: boolean;
  baseRate: any;
  rate: any;
  userClass: string;
  Banners: string;
  HNWI:boolean;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.rate = 0;
    this.baseRate = 0;
    this.categoriesDis = false;
    this.SubCategoryDis = false;
    this.contryDis = false;
    this.selectedModel = '';
    this.selectedCategries = '';
     this.selectedSubCategries=''; 
     this.userClass=" ";
     this.selectedRegion='';
     this.Banners=' ';
      this.dataService.getModels().subscribe(res => {
      this.models = res;
      this.HNWI=false;
    });

    this.dataService.getRegions().subscribe(res => {
      this.regions = res;

    });

  }


  getCat(id) {
    this.selectedCategries = '';
    this.selectedSubCategries=''; 
    this.baseRate = 0;
    this.SubCategory = [];
    if (id == 1) {
      this.dataService.getCPCCategories().subscribe(res => {
        this.categories = res;
        // this.SubCategory = res.subCat;
      });
    } else if (id == 2) {
      this.dataService.getCPLCategories().subscribe(res => {
        this.categories = res;
      });
    } else if (id == 3) {
      this.dataService.getCPVLCategories().subscribe(res => {
        this.categories = res;
      });
    }
    else if (id == 4) {
      this.dataService.getCPACategories().subscribe(res => {
        this.categories = res;
      });
    }
    else if (id == 5) {
      this.dataService.getCPICategories().subscribe(res => {
        this.categories = res;
      });
    }


  }

  showCat(id) {
   
    if (this.selectedModel !== '') {
      this.categoriesDis = true;
      this.getCat(id);
    } else {
      this.categoriesDis = false;

    }
  }

  showSubCat(id) {
    if (this.selectedModel !== '') {
      this.SubCategoryDis = true;
      this.getSubCat(id);

    } else {
      this.SubCategoryDis = false;

    }
  }



  showContries(id) {
    this.Calculate()

    this.contries = [];
    if (this.selectedRegion !== '') {
      if(id==3){
      this.contryDis = false;
      this.getContries(id);

      }else{

        this.contryDis = true;
        this.getContries(id);
      }

    } else {
      this.contryDis = false;

    }
  }

  getSubCat(id): any {
     this.selectedSubCategries=''; 
     this.baseRate = 0;
    var arr = this.categories.find(cat => cat.id == id);

    this.SubCategory = arr.subCat;

  }


  getContries(id: any): any {
    this.selectedContry=[];
    var arr = this.regions.find(reg => reg.id == id);

    this.contries = arr.Country;
  }



  getRate(id): any {
    this.baseRate = 0;
     if (id) {

      var arr = this.SubCategory.find(cat => cat.id == id);

      this.baseRate = arr.rate;
      this.Calculate()
    }
  }


  addConties(event) {
    this.selectedContry.push(event.id);
    this.Calculate()
  }


  removeConties(event) {
    var index = this.selectedContry.findIndex(con => con == event.id);

    this.selectedContry.splice(index, 1);
    this.Calculate()
  }


  Calculate(): any {
    this.rate  =  this.baseRate;
    debugger
    this.HNWI?this.rate +=  (this.baseRate* 0.2):this.rate  =  this.baseRate;
    // if  region "GCC"
     if (this.selectedRegion == 1) {
       // if add any country 
      if (this.selectedContry.length > 0) {

        // if only one country 
        if (this.selectedContry.length == 1) {
          var UAE = this.selectedContry.find(con => con == 2);
          if(UAE){
            this.rate +=  (this.baseRate* 0.1);
          }

          // if added two countries
        } else if (this.selectedContry.length == 2) {
          this.rate +=  (this.baseRate * 0.15);
        // if more than 2 countries 
        } else if (this.selectedContry.length > 2) {
          this.rate = this.baseRate;

        }
      }else if (this.selectedContry.length = 0) {
     this.rate  =  this.baseRate;

      }

    // if region "Levant"
    } else if (this.selectedRegion == 2) {
       // if add any country 
       this.rate -=  (this.baseRate * 0.3);
      
    // if region "NA"
    } else if (this.selectedRegion == 3) {

          this.rate -=  ( this.baseRate * 0.4);

    }

// tslint:disable-next-line: comment-format
    //*********** User Class  **************** */
    // if (this.userClass == "A") {
    //   let rat = (this.baseRate * 0.2);
    //   this.rate += rat;

    // } else if (this.userClass == "B") {
    //   this.rate +=  (this.baseRate * 0.15);

    // } else if (this.userClass == "C") {
    //   this.rate +=  (this.baseRate * 0.10);

    // } else if (this.userClass == "") {
    //   this.rate = this.rate;

    // }


// tslint:disable-next-line: comment-format
    //************  Banners Type  *************** */

    if (this.Banners == "Client") {
      this.rate +=  (this.baseRate * 0.15);

    } else if (this.Banners == "Own") {
      this.rate = this.rate;

    } else if (this.Banners == "Both") {
      this.rate +=  (this.baseRate * 0.10);

    }
    return this.rate;
  }

}
