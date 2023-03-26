import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BackendlessMockService} from '../backendless-mock.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {MatDialogModule} from '@angular/material/dialog';
import {EmployeeService} from '../employee.service';

import {EmployeeComponent} from './employee.component';


@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(BackendlessMockService, {
          apiBase: 'api/',
          delay: 250,
          passThruUnknownUrl: true,
          post204: false,
          put204: false
        }),
        MatDialogModule,
      ],
      providers: [
        EmployeeService,
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };

    expect(comp).toBeTruthy();
  }));
});
