import { Component, ViewChild } from '@angular/core';
import { IonTabBar, IonList, AlertController } from '@ionic/angular';
import { ListaService } from '../lista.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('myTabs', {static: false}) tabRef: IonTabBar;
  @ViewChild('myLista', {static: false}) listaRef: IonList;
  tabs: any;
  tabIndex: number;
  reorder: boolean;

  constructor(private listaService: ListaService,
              private alertController: AlertController){
    this.tabs = [
      {label: 'School', icon: 'school', lista: []},
      {label: 'Home', icon: 'home', lista: []}
    ];
    this.tabs.forEach((tab, index) => {
      tab.lista = this.listaService.getLista(index);
    });
    this.tabIndex = 0;
    this.reorder = false;
  }

  toggleReorder() {
    this.reorder = !this.reorder;
    this.listaRef.closeSlidingItems();
  }

  setTab(tabIndex) {
    this.tabIndex = tabIndex;
    this.tabRef.selectedTab = this.tabs[this.tabIndex].label;
  } 

  async deleteItem(item?) {
    const alert = await this.alertController.create({
      header: item === undefined ? 'Delete all' : 'Delete item',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.listaRef.closeSlidingItems();
            if (item === undefined) {
              this.listaService.deleteLista(this.tabIndex);
            }
            else {
              this.listaService.deleteItem(this.tabIndex, item);              
            }
          }
        },       
        {
          text: 'CANCEL',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  moveItem(indexes) {
    this.listaService.moveItem(this.tabIndex, indexes.from, indexes.to);
    indexes.complete();
  }
}