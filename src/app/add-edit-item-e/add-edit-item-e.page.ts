import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../lista.service';

@Component({
  selector: 'app-add-edit-item-e',
  templateUrl: './add-edit-item-e.page.html',
  styleUrls: ['./add-edit-item-e.page.scss'],
})

export class AddEditItemEPage {
  item: any;
  tabIndex: number;
  itemIndex: number;
  buttons: Array<string>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController,
              private ListaService: ListaService) { 
    this.buttons = ["radio-button-off", "radio-button-on", "snow", "flame"];

    this.tabIndex = +this.route.snapshot.paramMap.get('tab');
    this.itemIndex = +this.route.snapshot.paramMap.get('item'); 
    if (this.itemIndex >= 0) {
      this.item = Object.assign({}, this.ListaService.getItem(this.tabIndex, this.itemIndex));
      this.item.date = new Date(this.item.date).toISOString();
    }
    else {
      this.item = { date: new Date().toISOString(), task: '', icon: 'radio-button-off'};
    } 
  }

  async error(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  save() {
    if (!this.item.task.length) {
      this.error('The task cannot be empty');
    }
    else {
      if (this.itemIndex >= 0) {
        this.ListaService.setItem(this.tabIndex, this.item, this.itemIndex);
      }
      else {
        this.ListaService.setItem(this.tabIndex, this.item);      
      }
      this.router.navigate(['/home']);
    }
  }
}