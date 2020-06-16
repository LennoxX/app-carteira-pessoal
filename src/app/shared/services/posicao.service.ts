import { UserService } from './../../core/services/user.service';
import { Posicao } from './../models/posicao.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PosicaoService {



  collectionName = 'posicao';
  constructor(private db: AngularFirestore, private userService: UserService) {
  }

  delete(id) {
    return this.db.doc(`${this.collectionName}/${id}`).delete();
  }

  getAll() {
    return this.db.collection(this.collectionName).snapshotChanges();
  }

  findById(id) {
    return this.db.doc(`${this.collectionName}/${id}`).valueChanges();
  }

  findByUser() {
    const carteiraRef = this.db.collection('posicao').ref;
    return carteiraRef.where('userId', '==', this.userService.getInstance().uid).get();
  }

  create(posicao: Posicao): Promise<any> {
    return this.db.collection(this.collectionName).add(JSON.parse(JSON.stringify(posicao)));
  }

  update(posicao: Posicao, id): Promise<any> {
    return this.db.doc(`${this.collectionName}/${id}`).update(JSON.parse(JSON.stringify(posicao)));
  }

}
