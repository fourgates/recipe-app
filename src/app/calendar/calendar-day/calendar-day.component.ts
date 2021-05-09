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

  @Output() onDragStartEvent = new EventEmitter<any>();
  @Output() onDragOverEvent = new EventEmitter<any>();
  @Output() onDropHandlerEvent = new EventEmitter<any>();
  @Output() onSelectDateEvent = new EventEmitter<any>();
  @Output() onSelectDate = new EventEmitter<number>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  isToday(date: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  }

  selectEvent(event: CalendarEvent, date: number){
    this.onSelectDateEvent.emit({...event, date});
  }
  selectDate(date: number){
    this.onSelectDate.emit(date);
  }

  // dnd outputs
  onDragOver(event: any){
    this.onDragOverEvent.emit({event: event});
  }
  onDropHandler(event: any, date: number){
    this.onDropHandlerEvent.emit({event: event, date: date});
  }

  onDragStart(dndEvent: any, calendarEvent: CalendarEvent){
    this.onDragStartEvent.emit({dndEvent: dndEvent, calendarEvent: calendarEvent});
  }
  // end dnd outputs
}
