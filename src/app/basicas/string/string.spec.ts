import { mensaje } from './string';

describe('Pruebas de strings', () => {

  it('Debe de regresar un string', () => {
    const resp = mensaje('Cristian');
    expect(typeof resp).toBe('string');
  });

  it('Debe devolver un saludo con el nombre enviado', () => {
    const nombre = 'Juan'
    const resp = mensaje(nombre);
    expect(resp).toContain(nombre);
  });


});
