import { usuarioIngresado } from './booleanos';

describe('Pruebas de booleanos', () => {
  it('Debe regresar true', () => {
    const res = usuarioIngresado();
    expect(res).toBeTrue();
  });
});
