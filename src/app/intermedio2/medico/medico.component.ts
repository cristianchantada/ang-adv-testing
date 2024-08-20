import { Component } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent {

  public medicos: any[] = [];

  constructor(
    private medicoService: MedicoService
  ){}

  saludarMedico(nombre: string){
    return `Hola ${nombre} !`
  }

  obtenerMedicos(){
    this.medicoService.getMedicos().subscribe(
      (medicos: any) => this.medicos = medicos
    )
  }

}
