import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InsidePage implements OnInit {

  logoutTimer = this._accser.logoutTimer.asObservable();
  timer : number = 0;
  constructor(
    private _accser : AccessService
  ) { }

  ngOnInit() {
    this.logoutTimer.forEach((resp) => { this.timer = resp; });
    
  }

  ionViewDidEnter(){
    this._accser.resetLogoutTimer();
  }

}
