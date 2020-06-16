import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { CarteiraService } from './carteira.service';
import { UserService } from './../../core/services/user.service';
import { Carteira } from './../models/carteira.model';
import { Posicao } from './../models/posicao.model';
import { Ativo } from './../models/ativo.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  carteira: Carteira = new Carteira();

  constructor(
    private http: HttpClient,
    private configService: ConfigService) {


  }
  getDadosAtivo(tipo, sigla): Observable<Card> {

    return this.http.get(`${this.configService.getApiPath()}${tipo}/${sigla}`);

  }

}


