import { UserService } from './../../core/services/user.service';
import { Carteira } from './../models/carteira.model';
import { Posicao } from './../models/posicao.model';
import { Ativo } from './../models/ativo.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AtivoService {



  collectionName = 'ativos';
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

  create(ativo: Ativo): Promise<any> {
    return this.db.collection(this.collectionName).add(JSON.parse(JSON.stringify(ativo)));
  }

  update(ativo: Ativo, id): Promise<any> {
    return this.db.doc(`${this.collectionName}/${id}`).update(JSON.parse(JSON.stringify(ativo)));
  }


  teste() {
    this.findById('23ZbivSzMqhhpvvAlIIo').subscribe((res) => {
      let carteira: Carteira = new Carteira();
      carteira.userId = this.userService.getInstance().uid;
      carteira.posicoes = new Array();
      let ativo = res;
      this.findById('7EDAoASxgfBTKjxsHDQs').subscribe((res2) => {
        let ativo2 = res2;
        let posicao2: Posicao = new Posicao();
        posicao2.ativo = ativo2;
        posicao2.quantidade = 20;
        posicao2.valorMedioCompra = 15.00;

        carteira.posicoes.push(posicao2);
        let posicao: Posicao = new Posicao();
        posicao.ativo = ativo;
        posicao.quantidade = 9;
        posicao.valorMedioCompra = 10.00;
        carteira.posicoes.push(posicao);
        this.db.collection('carteira').add(JSON.parse(JSON.stringify(carteira)));
      });


      console.log(carteira);

    });







    //

  }
}
