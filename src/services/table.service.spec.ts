// src/app/services/table.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;
  let mockActivatedRoute;

  beforeEach(() => {
    mockActivatedRoute = {
      queryParams: of({ table: '5' })
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TableService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve table number from local storage', () => {
    service.storeTableNumber();
    expect(localStorage.getItem('tableNumber')).toBe('5');
  });

  it('should validate table number correctly', () => {
    expect(service.isValidTableNumber('5')).toBeTrue();
    expect(service.isValidTableNumber('-1')).toBeFalse();
    expect(service.isValidTableNumber('abc')).toBeFalse();
  });

  it('should set table number from storage', () => {
    localStorage.setItem('tableNumber', '10');
    service.setTableNumberFromStorage();
    expect(service.tableNumber).toBe('10');
  });
});
