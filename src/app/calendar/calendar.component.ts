import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // ported from alpine.js from
  // https://tailwindcomponents.com/component/calendar-ui-with-tailwindcss-and-alpinejs
  MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  no_of_days: number[] = [];
  blankdays: number[] = [];
  month: number = 0;
  year: number;
  datepickerValue: string | undefined;
  openEventModal = false;
  event_date: string | undefined;
  themes: any[]= [];
  selectedDate: number | undefined;
  events = [
    {
      event_date: new Date(2020, 3, 1),
      event_title: "April Fool's Day",
      event_theme: 'blue'
    },

    {
      event_date: new Date(2020, 3, 10),
      event_title: "Birthday",
      event_theme: 'red'
    },

    {
      event_date: new Date(2020, 3, 16),
      event_title: "Upcoming Event",
      event_theme: 'green'
    }
  ];
  event_theme = 'blue';
  constructor() { 
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
  }

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    this.themes = [
      {
        value: "blue",
        label: "Blue Theme"
      },
      {
        value: "red",
        label: "Red Theme"
      },
      {
        value: "yellow",
        label: "Yellow Theme"
      },
      {
        value: "green",
        label: "Green Theme"
      },
      {
        value: "purple",
        label: "Purple Theme"
      }
    ];   
  }
  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
  }
  getNoOfDays(){
    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for ( var i=1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for ( var i=1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    
    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;    
  }
  isToday(date: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  }
  addEvent(){ 
    this.events.push({
      event_date: new Date(this.year, this.month, this.selectedDate),
      event_title: "April Fool's Day",
      event_theme: this.event_theme
    });

    console.log(this.events);

    // clear the form data
    // this.event_title = '';
    // this.event_date = '';
    this.event_theme = 'blue';

    //close the modal
    this.openEventModal = false;
  }
  showEventModal(date: number) {  
    // open the modal
    this.openEventModal = true;
    this.selectedDate = date;
    this.event_date = new Date(this.year, this.month, date).toDateString();
  }
  changeEvent(e: any){
    console.log('e', e.value);
    this.event_theme = e;
  }
  test(date: number){      
    return this.events.filter(e => {
      return e.event_date.toDateString() === new Date(this.year, this.month, date).toDateString();
    })
  }
  prevMonth(){
    this.month--; 
    this.getNoOfDays();
  }
  nextMonth(){
    this.month++; 
    this.getNoOfDays();
  }  
}
