import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApodService } from '../apod.service';
import { Apod } from '../apod.model';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.page.html',
  styleUrls: ['./apod.page.scss'],
})
export class ApodPage {

  apod: Apod;
  date: string;

  constructor(
    private apodService: ApodService,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {

    this.route.params.subscribe(
      (params)=>{
        if(params['date']){

          this.getApod(params['date']);

        }else{

          // this.getApod(new Date().toISOString().slice(0, 10));
         
          var date = this.randomDate(     // Generate random date.
            new Date(1995,5,16),
            new Date()
          );

          console.log(" apod.page.ts - ionViewWillEnter - random date = ", date);

          this.getApod(date);             // Get APOD for the given random date.               
        }
      }
    );
  }
  
  randomDate(start, end){

    let date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    return new Date(
      (date.getTime() - date.getTimezoneOffset()*60000)
    ).toISOString().slice(0, 10);
  }

  getApod(date:string):void {
 
    console.log(" apod.page.ts - getApod - random date = ", date);
     
    this.apodService.getApod(date)
      .subscribe((result:any) => {

        this.apod = result;

        // this.date = this.randomDate(   // Random date in response cb?   
        //   new Date(1995,5,16),         // Purpose of the local var "this.date"?
        //   new Date()
        // );

        console.log("apod.page.ts - getApod - result = ", result); // Log the response.
      });
  }

}