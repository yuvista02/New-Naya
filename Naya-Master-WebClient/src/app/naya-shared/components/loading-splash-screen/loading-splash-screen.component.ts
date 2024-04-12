import { Component, Input } from '@angular/core';

@Component({
    selector: 'naya-loading-splash-screen',
    templateUrl: './loading-splash-screen.component.html',
    styleUrls: ['./loading-splash-screen.component.scss'],
    standalone: true
})
export class LoadingSplashScreenComponent  {
  
  @Input() message: string;


}
