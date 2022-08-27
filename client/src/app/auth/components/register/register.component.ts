import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'description'];
  
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getSomething()
  }

  getSomething() {
    this.authService.getSomething().subscribe(data => {
      console.log(data);
    })
  }

}
