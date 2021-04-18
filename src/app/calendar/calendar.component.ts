import { Component, OnInit } from '@angular/core';

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
    {recipeName: 'Personal Pizzas with Prosciutto, Artichokes, and Fresh Mozzarella', recipeId: 1},
    {recipeName: 'Cheeseburger', recipeId: 2}
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
  events = [
    {
      eventDate: new Date(2021, 3, 1),
      eventRecipe: this.recipes[0],
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
  isToday(date: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  }
  addEvent(){ 
    debugger;
    this.events.push({
      eventDate: new Date(this.year, this.month, this.selectedDate),
      eventRecipe: this.eventRecipe,
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
  getEventsForDate(date: number){      
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
  selectRecipe(e: any, date: number){
    this.eventRecipe = e.eventRecipe;
    this.eventTheme = e.eventTheme;

    this.selectedDate = date;
    this.recipeDate = new Date(this.year, this.month, date).toDateString();

    this.openEventModal = true;
  }
  // https://stackoverflow.com/questions/49986104/drag-event-not-firing-with-angular-2
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
  dragEventObj: any;
  onDragStart(ev:any, event: any){
    console.log('onDragStart', ev);
    ev.dataTransfer.setData("text/plain", event);
    ev.dataTransfer.dropEffect = "move";
    this.dragEventObj = event;
  }
  onDragOver(ev: any) {
    //console.log('onDragOver', ev);
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
   }  
  onDropHandler(ev: any, date: number) {
    console.log('onDropHandler', ev, date);
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    console.log('data', data);
    //ev.target.appendChild(document.getElementById(data));
    this.dragEventObj.eventDate = new Date(this.year, this.month, date);

   }   
}
