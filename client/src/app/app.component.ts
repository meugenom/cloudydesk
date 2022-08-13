import { Component } from '@angular/core';
import { ModService } from './mod/mod.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [ModService]
})
export class AppComponent {
  title = 'desktop';
}
