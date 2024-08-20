import { EMPTY, Observable, of, throwError } from 'rxjs';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';

describe('MedicosComponent', () => {
  let componente: MedicosComponent;
  let servicio: jasmine.SpyObj<MedicosService>;

  beforeEach(() => {
    servicio = jasmine.createSpyObj('MedicosService', [
      'getMedicos',
      'agregarMedico',
      'borrarMedico',
    ]);
    servicio.getMedicos.and.returnValue(of(['medico1', 'medico2', 'medico3']));
    componente = new MedicosComponent(servicio);
  });

  it('Init: debe de cargar los médicos', () => {
    componente.ngOnInit();
    expect(componente.medicos.length).toBeGreaterThan(0);
  });

  it('Debe de llamar al servidor para agregar un médico', () => {
    const espia = servicio.agregarMedico.and.returnValue(of(EMPTY));
    componente.agregarMedico();
    expect(espia).toHaveBeenCalled();
  });

  it('Debe de agregar un nuevo médico al arreglo de médicos', () => {
    const medico = { id: 1, nombre: 'Juan' };
    servicio.agregarMedico.and.returnValue(of(medico));
    componente.agregarMedico();
    expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
  });

  it('Si falla la adicición de médico, la propiedad mensajeError debe de ser igual al error del servicio', () => {
    const miError = 'No se pudo agregar el médico';
    servicio.agregarMedico.and.returnValue(
      throwError(() => new Error(miError))
    );
    componente.agregarMedico();
    expect(componente.mensajeError).toBe(miError);
  });

  it('debe de llamar al servidor para borrar un médico', () => {
    const espia = servicio.borrarMedico.and.returnValue(EMPTY);
    spyOn(window, 'confirm').and.returnValue(true);
    componente.borrarMedico('1');
    expect(espia).toHaveBeenCalledWith('1');
  });

  it('NO debe de llamar al servidor para borrar un médico', () => {
    const espia = servicio.borrarMedico.and.returnValue(EMPTY);
    spyOn(window, 'confirm').and.returnValue(false);
    componente.borrarMedico('1');
    expect(espia).not.toHaveBeenCalledWith('1');
  });



});
