import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditItemEPage } from './add-edit-item-e.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditItemEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditItemEPageRoutingModule {}
