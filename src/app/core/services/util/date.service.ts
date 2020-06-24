import {Injectable, OnInit} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export  class DateService implements OnInit{


  dateCreation: any;
  labelCreation : any;

  constructor() {
  }

  ngOnInit(){

  }


  dateDiff(date) {

    this.dateCreation = '';

    let diff= {min: 0, sec :0, hour: 0, day: 0, sem: 0, mon: 0, years: 0}
    let tmp = this.dateDifference(date);

    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp ;                    // Extraction du nombre de secondes

    if(diff.sec>=60){
      tmp = Math.floor((diff.sec) / 60);    // Nombre de minutes (partie entière)
      diff.min = tmp ;                    // Extraction du nombre de minutes
    }
    if(diff.min>=60){
      tmp = Math.floor((diff.min) / 60);    // Nombre d'heures (entières)
      diff.hour = tmp;                   // Extraction du nombre d'heures
    }

    if(diff.hour>=24){
      tmp = Math.floor((diff.hour) / 24);   // Nombre de jours restants
      diff.day = tmp;
    }
    if(diff.day>=7){
      tmp = Math.floor((diff.day) / 7);   // Nombre de semaines restants
      diff.sem = tmp;
    }

    if(diff.sem>=4){
      tmp = Math.floor((diff.sem) / 4);   // Nombre de mois restants
      diff.mon = tmp;
    }

    if(diff.mon>=12){
      tmp = Math.floor((diff.mon) / 12);   // Nombre d'années restants
      diff.years = tmp;
    }



    return  this.dateCreation = (diff.years!=0) ? diff.years  : (
      (diff.mon!=0) ? diff.mon  : (
        (diff.sem!=0) ? diff.sem : (
          (diff.day!=0) ? diff.day  : (
            (diff.hour!=0) ? diff.hour : (
              (diff.min!=0) ? diff.min : (
                (diff.sec!=0) ? diff.sec  : ''
              )
            )
          )
        )
      )
    );

  }

  dateLabel(date){
    this.labelCreation = '';

    let diff= {min: 0, sec :0, hour: 0, day: 0, sem: 0, mon: 0, years: 0}
    let tmp = this.dateDifference(date);

    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp ;                    // Extraction du nombre de secondes

    if(diff.sec>=60){
      tmp = Math.floor((diff.sec) / 60);    // Nombre de minutes (partie entière)
      diff.min = tmp ;                    // Extraction du nombre de minutes
    }
    if(diff.min>=60){
      tmp = Math.floor((diff.min) / 60);    // Nombre d'heures (entières)
      diff.hour = tmp;                   // Extraction du nombre d'heures
    }

    if(diff.hour>=24){
      tmp = Math.floor((diff.hour) / 24);   // Nombre de jours restants
      diff.day = tmp;
    }
    if(diff.day>=7){
      tmp = Math.floor((diff.day) / 7);   // Nombre de semaines restants
      diff.sem = tmp;
    }

    if(diff.sem>=4){
      tmp = Math.floor((diff.sem) / 4);   // Nombre de mois restants
      diff.mon = tmp;
    }

    if(diff.mon>=12){
      tmp = Math.floor((diff.mon) / 12);   // Nombre d'années restants
      diff.years = tmp;
    }



    return  this.labelCreation = (diff.years!=0) ? ((diff.years>1) ? "Years" : "Year") : (
      (diff.mon!=0) ? ((diff.mon>1) ? "Months" : "Month") : (
        (diff.sem!=0) ? ((diff.sem>1) ? "Weeks" : "Week") : (
          (diff.day!=0) ? ((diff.day>1) ? "Days" : "Day") : (
            (diff.hour!=0) ? ((diff.hour>1) ? "Hours" : "Hour") : (
              (diff.min!=0) ?  ((diff.min>1) ? "Minutes" : "Minute") : (
                (diff.sec!=0) ?  ((diff.sec>1) ? "Seconds" : "Second") : ''
              )
            )
          )
        )
      )
    );
  }

  dateDifference(date) {
    let creationDate = new Date(date);
    let currentDate = new Date();
    let tmp = Date.UTC(creationDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()) - Date.UTC(
      creationDate.getFullYear(),
      creationDate.getMonth(),
      creationDate.getDate(),
      creationDate.getHours(),
      creationDate.getMinutes(),
      creationDate.getSeconds());
    return tmp;
  }

  getTimeLeft(date) {
    let creationDate = new Date(date);
    let currentDate = new Date();
    let tmp = Date.UTC(creationDate.getFullYear(),
      creationDate.getMonth(),
      creationDate.getDate(),
      creationDate.getHours(),
      creationDate.getMinutes(),
      creationDate.getSeconds()) - Date.UTC(
        currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds());
    return tmp;
  }
}
