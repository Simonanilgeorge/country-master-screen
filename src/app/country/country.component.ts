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


 onRowEditInit(product:country) {
  this.clonedProducts[product.code] = {...product};
}

 reset(){
    this.country={
      name:null,
      code:null,
      alpha2Code:null,
      alpha3Code:null,
  };
}

log(){
  console.log("test");
}

}
