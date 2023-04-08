import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { BiometricAuth } from 'capacitor-biometric-auth';

import { Plugins } from '@capacitor/core';
const { BiometriAuth } = Plugins;

@Component({
  selector: 'app-locked',
  templateUrl: './locked.page.html',
  styleUrls: ['./locked.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LockedPage implements OnInit {
  showFallback = true;
  password = '';
  hasBiometricAuth = false;

  constructor(
    private modalCtrl : ModalController
  ) { }

  async ngOnInit() {
    const available = await BiometricAuth.isAvailable();
    this.hasBiometricAuth = available.has;
    if (this.hasBiometricAuth) {
      this.openBiometricAuth(); 
    }
  }

  async openBiometricAuth(){
    const authResult = await BiometricAuth.verify( { reason : 'se agotó el tiempo de su sesión' } );

    if (authResult.verified) {
      this.dismissLockScreen();
    }
  }

  unlock(){
    if (this.password == '123456') {
      this.dismissLockScreen();
    }
  }

  dismissLockScreen(){
    this.modalCtrl.dismiss( { reset: true });
  }

}
