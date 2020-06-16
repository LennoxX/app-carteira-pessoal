import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Posicao } from 'src/app/shared/models/posicao.model';
import { Card } from './../../../shared/models/card.model';
import { DashboardService } from './../../../shared/services/dashboard.service';
import { PosicaoService } from './../../../shared/services/posicao.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  data: any;
  chartReady = false;
  loading = false;
  posicoes: Posicao[] = new Array();
  cards: Card[] = new Array();

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public pieChartLabels: Label[] = new Array();
  public pieChartData: SingleDataSet = new Array(1000);
  public pieChartType: ChartType = 'pie';
  public pieChartColors: Array<any>;
  variacao = new Array();
  totalCompra = 0;
  totalAtual = 0;
  variacaoTotal = 0;

  public pieChartLegend = true;


  constructor(private dashboardService: DashboardService, private posicaoService: PosicaoService, private ref: ChangeDetectorRef) {

  }
  ngAfterViewChecked(): void {
    this.chartReady = true;
    this.ref.detectChanges();
  }



  ngOnInit(): void {
    this.loading = true;
    this.posicaoService.findByUser().then(snapshot => {
      this.pieChartData = new Array();
      snapshot.forEach(doc => {
        const posicao: Posicao = Object.assign(new Posicao(), (doc.data()));
        this.posicoes.push(posicao);
        this.loadData(posicao).subscribe(res => {
          const card: Card = res;
          card.sigla = posicao.ativo.sigla;
          this.cards.push(card);
          this.buildGraph(card, posicao);

          this.loading = false;
        });
      });

    });
  }

  loadData(posicao): Observable<Card> {
    return this.dashboardService.getDadosAtivo(posicao.ativo.tipo.value, posicao.ativo.sigla);
  }

  buildGraph(card, posicao) {
    this.pieChartLabels.push(posicao.ativo.sigla);
    this.pieChartData.push(Number.parseFloat((Number.parseFloat(card.atual) * posicao.quantidade).toFixed(2)));
    this.buildTable(posicao, card);
  }

  buildTable(posicao: Posicao, card: Card) {

    const valorCompra = (posicao.valorMedioCompra * posicao.quantidade).toFixed(2);
    const valorAtual = (Number.parseFloat(card.atual.replace(',', '.')) * posicao.quantidade).toFixed(2);
    const variacaoAbs = Number.parseFloat((Number.parseFloat(valorAtual) - Number.parseFloat(valorCompra)).toFixed(2));
    this.variacao.push({
                      ativo: posicao.ativo.sigla,
                      valorCompra: Number.parseFloat(valorCompra),
                      valorAtual: Number.parseFloat(valorAtual),
                      balanco: variacaoAbs
    });
    this.totalCompra = this.totalCompra + Number.parseFloat(valorCompra);
    this.totalAtual = this.totalAtual + Number.parseFloat(valorAtual);
    this.variacaoTotal = this.totalAtual - this.totalCompra;
  }

  getPercent(item: any) {

    return (((item.valorAtual - item.valorCompra) / item.valorCompra) * 100).toFixed(2);
  }
}
