// import {TestBed, async} from '@angular/core/testing';
// import {RouterTestingModule} from '@angular/router/testing';
// import {AppComponent} from './app.component';
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
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
