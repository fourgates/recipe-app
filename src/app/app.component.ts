import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'recipe-app';
  constructor(private router: Router){
    
  }
  ngOnInit(): void {
    this.router.events.subscribe(e =>{
      if(e instanceof ActivationStart){
        if(e.snapshot.data.title){
          this.title = e.snapshot.data.title;
        }
      }
    })
  }
}
