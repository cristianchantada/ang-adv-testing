import { FormularioRegister } from "./formulario"
import { FormBuilder } from "@angular/forms";

describe('Formularios' , () => {

  let component: FormularioRegister;

  beforeEach( () => {
    component = new FormularioRegister( new FormBuilder() );
  });

  it('Debe crear un formulario con dos campos', () => {
    expect( component.form.contains('email')).toBeTruthy();
    expect( component.form.contains('password')).toBeTruthy();
  });


  it('Email debe de ser obligatorio', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('Email debe de ser email válido', () => {
    const control = component.form.get('email');
    control?.setValue('cris@email.com');
    expect(control?.valid).toBeTruthy();
  });

  

})