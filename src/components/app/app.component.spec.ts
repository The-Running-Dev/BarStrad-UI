// src/app/app.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { TableService } from '../../services/table.service';

// Step 1: Create a mock class for TableService
class MockTableService {
  tableNumber = '5';

  getTableNumber() {
    return '5';
  }

  storeTableNumber() {
    // Mock implementation
  }

  isValidTableNumber(tableNumber: string): boolean {
    return !isNaN(parseInt(tableNumber, 10)) && parseInt(tableNumber, 10) > 0;
  }

  setTableNumberFromStorage() {
    this.tableNumber = '5';
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  //let tableService: TableService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        // Step 2: Provide the mock class in the test module configuration
        { provide: TableService, useClass: MockTableService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    //tableService = TestBed.inject(TableService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the table number in the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Table #5');
  });

  // Add more tests as needed
});
