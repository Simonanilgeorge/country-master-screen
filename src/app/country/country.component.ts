import { Component, OnInit } from '@angular/core';
import {CountryService } from '../country.service';
import { BrowserModule } from '@angular/platform-browser';
import {country} from '../country';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {



  countryDialog: boolean;
  submitted: boolean;
  public countries:country[]=[];
  public country:country={
    name:null,
    code:null,
    alpha2Code:null,
    alpha3Code:null,
  
  };


  clonedProducts: { [s: string]: country; } = {};

  constructor(private countryservice:CountryService) { 

    }

  ngOnInit(): void {
    this.getcountry();
  }
  
  //function to get countries
  getcountry()
  {
    this.countryservice.getcountry()
    .subscribe(data=>this.countries=data);
  }


  openNew() {

    this.submitted = false;
    this.countryDialog = true;
}


hideDialog() {
  this.countryDialog = false;
  this.submitted = false;
}

    //create a function to add countries
add(){

  console.log(`country type is ${typeof(this.country)}`);
  console.log( Object.entries(this.country));
  
  
  //call a function to post the data
  this.countryservice.addcountry(this.country)
  .subscribe(country => {
    this.countries.push(country);
  });
  
  this.reset();
  
 }



 reset(){
    this.country={
      name:null,
      code:null,
      alpha2Code:null,
      alpha3Code:null,
  };
}


      //update
      update(code:number,name:string,alpha2Code:string,alpha3Code:string){
this.country.name=name;
this.country.alpha2Code=alpha2Code;
this.country.alpha3Code=alpha3Code;

        console.log(`update function called and code is ${code}`);
      
      console.log(`country type is ${typeof(this.country)}`);
      console.log( Object.entries(this.country));
      console.log(`country type is ${typeof(this.country)}`);
      
      
      //call a function to post the data
      this.countryservice.updatecountry(this.country,code)
      .subscribe(country => {
      console.log(country);
      });
      
  
      
      
      
      }

      
delete(code:number): void {
  // this.countries = this.countries.filter(h => h.code !==this.countries.code);
  this.countries=this.countries.filter(function(country){
    if(country.code!=code){
      return true;
    }
    else {
      return false;
    }
  })
  console.log(`the country to be deleted is ${code}`);
  this.countryservice.deletecountry(code).subscribe();

  
}

log(){
  console.log("test");
}

}