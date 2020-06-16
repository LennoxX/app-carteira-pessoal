import { UserService } from './../../core/services/user.service';
import { Carteira } from './../models/carteira.model';
import { Posicao } from './../models/posicao.model';
import { Ativo } from './../models/ativo.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  collectionName = 'carteira';
  constructor(private db: AngularFirestore, private userService: UserService) {
  }

  getAll() {
    return this.db.collection(this.collectionName).snapshotChanges();
  }

  findById(id) {
    return this.db.doc(`${this.collectionName}/${id}`).valueChanges();
  }

  findByUser() {
    const carteiraRef = this.db.collection('carteira').ref;
    return carteiraRef.where('userId', '==', this.userService.getInstance().uid).get();

  }

  create(ativo: Ativo): Promise<any> {
    return this.db.collection(this.collectionName).add(JSON.parse(JSON.stringify(ativo)));
  }

  update(ativo: Carteira, id): Promise<any> {
    return this.db.doc(`${this.collectionName}/${id}`).update(JSON.parse(JSON.stringify(ativo)));
  }


}
