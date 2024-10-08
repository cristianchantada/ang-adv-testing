import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterMedicoComponent } from './router-medico.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';

class FakeRouter {
  navigate(params:any){}
}

class FakeActivatedRoute {
  // params: Observable<any> = EMPTY;

  private subject = new Subject();

  get params(){
    return this.subject.asObservable();
  }

  push(valor: any){
    this.subject.next(valor);
  }


}

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      providers: [
        {provide: Router, useClass: FakeRouter},
        {provide: ActivatedRoute, useClass: FakeActivatedRoute},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de redireccionar a médico cuando se guarde', () => {

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.guardarMedico();

    expect(spy).toHaveBeenCalledOnceWith(['medico', '123']);

  })

  it('Debe de colocar el id = nuevo', () => {

    component = fixture.componentInstance;
    const activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push({id: 'nuevo'});
    expect(component.id).toBe('nuevo');
  })


});
