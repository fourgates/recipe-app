import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from './calendar-day/calendar-day.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
  // ported from alpine.js from
  // https://tailwindcomponents.com/component/calendar-ui-with-tailwindcss-and-alpinejs
export class CalendarComponent implements OnInit {
  MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  noOfDays: number[] = [];
  blankdays: number[] = [];
  month: number = 0;
  year: number;
  datepickerValue: string | undefined;
  openEventModal = false;
  recipeDate: string | undefined;
  selectedDate: number | undefined;
  eventTheme :any;
  eventRecipe :any;

  recipes = [
    {description: 'Personal Pizzas with Prosciutto, Artichokes, and Fresh Mozzarella', recipeId: 1},
    {description: 'Cheeseburger', recipeId: 2}
  ];
  themes = [
    {
      value: "blue",
      label: "Lunch"
    },
    {
      value: "red",
      label: "Breakfast"
    },
    {
      value: "yellow",
      label: "Dinner"
    },
    {
      value: "green",
      label: "Other"
    }
  ];     

  // TODO - abstract this to an input
  events: CalendarEvent[] = [
    {
      eventDate: new Date(2021, 4, 4),
      eventSubject: this.recipes[0],
      eventTheme: this.themes[0]
    },
  ];

  constructor() { 
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
  }

  ngOnInit(): void {
    this.getNoOfDays();

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
    this.noOfDays = daysArray;    
  }

  addEvent(){ 
    this.events.push({
      eventDate: new Date(this.year, this.month, this.selectedDate),
      eventSubject: this.eventRecipe,
      eventTheme: this.eventTheme
    });

    console.log(this.events);

    // clear the form data
    // this.event_title = '';
    // this.event_date = '';
    this.eventTheme = 'blue';

    //close the modal
    this.openEventModal = false;
  }
  showEventModal(date: number) {  
    // open the modal
    this.openEventModal = true;
    this.selectedDate = date;
    this.recipeDate = new Date(this.year, this.month, date).toDateString();
  }
  // TODO - make this a map instead
  getEventsForDate(date: number): CalendarEvent[]{      
    return this.events.filter(e => {
      return e.eventDate.toDateString() === new Date(this.year, this.month, date).toDateString();
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
  selectRecipe(event: any){
    this.eventRecipe = event.eventRecipe;
    this.eventTheme = event.eventTheme;

    this.selectedDate = event.date;
    this.recipeDate = new Date(this.year, this.month, event.date).toDateString();

    this.openEventModal = true;
  }
  // https://stackoverflow.com/questions/49986104/drag-event-not-firing-with-angular-2
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
  dragEventObj: any;
  onDragStart(dragEvent: any){
    const ev = dragEvent.dndEvent;
    const calendarEvent = dragEvent.calendarEvent;
    this.debug('onDragStart', ev);
    ev.dataTransfer.setData("text/plain", calendarEvent);
    ev.dataTransfer.dropEffect = "move";
    this.dragEventObj = calendarEvent;
  }
  onDragOver(dndEvent: any) {
    this.debug('onDragOver', dndEvent);
    dndEvent.event.preventDefault();
    dndEvent.event.dataTransfer.dropEffect = "move";
   }  
  onDropHandler(dndEvent: any) {
    const ev = dndEvent.event;
    const date = dndEvent.date;
    this.debug('onDropHandler', ev, date);
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    this.debug('data', data);
    //ev.target.appendChild(document.getElementById(data));
    this.dragEventObj.eventDate = new Date(this.year, this.month, date);
   }   
  debugging = false;
  private debug(message: string, ...args: any[]){
    if(this.debugging){
      console.log(message, args);
    }
   }
}
