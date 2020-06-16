import { Posicao } from 'src/app/shared/models/posicao.model';
import { PosicaoService } from './../../../shared/services/posicao.service';
import { Carteira } from './../../../shared/models/carteira.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minha-carteira-list',
  templateUrl: './minha-carteira-list.component.html',
  styleUrls: ['./minha-carteira-list.component.css']
})
export class MinhaCarteiraListComponent implements OnInit {

  loading = false;
  carteira: Carteira = new Carteira();
  posicoes: Posicao[] = new Array();
  constructor(private posicaoService: PosicaoService) {
    this.carteira.posicoes = this.posicoes;
  }

  ngOnInit(): void {

    this.loadPosicoes();
  }

  loadPosicoes() {
    this.loading = true;
    this.posicaoService.findByUser().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        this.loading = false;
        return;
      }

      snapshot.forEach(doc => {
        const posicao = Object.assign(new Posicao(), doc.data());
        posicao.id = doc.id;
        this.carteira.posicoes.push(posicao);
        this.loading = false;
      });
    })
      .catch(err => {
        this.loading = false;
        console.log('Error getting documents', err);
      });
  }


}
