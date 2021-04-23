import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditItemEPageRoutingModule } from './add-edit-item-e-routing.module';

import { AddEditItemEPage } from './add-edit-item-e.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditItemEPageRoutingModule
  ],
  declarations: [AddEditItemEPage]
})
export class AddEditItemEPageModule {}
