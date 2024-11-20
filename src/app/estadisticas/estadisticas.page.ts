import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  lookDateSelection = false; 
  initialDate : string = " ";
  endDate : string = " ";
  constructor() { }

  ngOnInit() {
  }

  lookDate (activar: boolean) {
    this.lookDateSelection = activar;
  }


}
