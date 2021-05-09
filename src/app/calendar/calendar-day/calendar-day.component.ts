import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface CalendarTheme{
  value: string;
  label: string;
}
export interface CalendarEvent {
  eventDate: Date;
  eventTheme: CalendarTheme;
  eventSubject: any;
}
@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  // @ts-ignore
  @Input() year: number;
  // @ts-ignore
  @Input() month: number;
  // @ts-ignore
  @Input() date: number;
  // @ts-ignore
  @Input() events: CalendarEvent[];

  @Output() onDragOverEvent = new EventEmitter<string>();
  @Output() onDropHandlerEvent = new EventEmitter<string>();
  @Output() onDragStartEvent = new EventEmitter<string>();
  @Output() onSelectDateEvent = new EventEmitter<any>();
  @Output() onSelectDate = new EventEmitter<number>();

  // showEventModal - selectEvent
  // selectRecipe - selectDate
  constructor() { 
  }

  ngOnInit(): void {
  }

  isToday(date: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  }

  onDragOver(event: any){

  }
  onDropHandler(event: any, date: number){

  }

  onDragStart(event: any, calendarEvent: CalendarEvent){

  }
  selectEvent(event: CalendarEvent, date: number){
    this.onSelectDateEvent.emit({...event, date});
  }
  selectDate(date: number){
    this.onSelectDate.emit(date);
  }
}
