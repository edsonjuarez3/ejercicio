import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  lista: any;

  constructor() { 
    this.lista = [[]];
  }

  getLista(index) {
    let lista = localStorage.getItem('todo-lista-'+index);
    if (lista !== 'undefined' && lista !== null) {
      this.lista[index] = JSON.parse(lista);
    }
    if (index>=this.lista.length) this.lista.push([]);
    return(this.lista[index]);
  }

  saveLista(listaIndex) {
    localStorage.setItem('todo-lista-'+listaIndex, JSON.stringify(this.lista[listaIndex]));
  }

  getItem(listaIndex, itemIndex) {
    return(this.lista[listaIndex][itemIndex]);
  }

  setItem(listaIndex, item, itemIndex?) {
    if (itemIndex == undefined) this.lista[listaIndex].push(Object.assign({}, item));
    else this.lista[listaIndex][itemIndex] = Object.assign({}, item);
    this.saveLista(listaIndex);  
  }

  deleteItem(listaIndex, itemIndex) {
    this.lista[listaIndex].splice(itemIndex,1);
    this.saveLista(listaIndex);
  }

  deleteLista(listaIndex) {
    this.lista[listaIndex].length = 0;
    this.saveLista(listaIndex);    
  }

  moveItem(listaIndex, from, to) {
    let element = this.lista[listaIndex][from];
    this.lista[listaIndex].splice(from, 1);
    this.lista[listaIndex].splice(to, 0, element);
    this.saveLista(listaIndex);    
  }
}