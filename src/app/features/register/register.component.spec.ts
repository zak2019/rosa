// import {TestBed, async, ComponentFixture} from '@angular/core/testing';
// import {RouterTestingModule} from '@angular/router/testing';
// import {RegisterComponent} from './register.component';
// import createSpyObj = jasmine.createSpyObj;
// import {Observable} from 'rxjs/internal/Observable';
// import {AuthService} from '../../core/services/auth.service';
//
// describe('RegisterComponent', () => {
//
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;
//
//   let spyAuthService;
//
//   beforeEach(async(() => {
//     spyAuthService = createSpyObj('AuthService', ['register']);
//     spyAuthService.register.and.returnValue(Observable.of());
//   }));
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         RegisterComponent
//       ], providers: [
//         {provide: AuthService, useValue: spyAuthService}
//       ],
//       imports: [
//         RouterTestingModule
//       ],
//
//     }).compileComponents();
//   }));
//
//   beforeEach(async(() => {
//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
