// src/app/services/table.service.ts

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tableNumber: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getTableNumber(): string | null {
    return localStorage.getItem('tableNumber');
  }

  storeTableNumber() {
    this.route.queryParams.subscribe((params) => {
      const tableNumber = params['table'];

      if (tableNumber && this.isValidTableNumber(tableNumber)) {
        localStorage.setItem('tableNumber', tableNumber);
        this.tableNumber = tableNumber;

        // Remove the table from the query string
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { table: null },
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  isValidTableNumber(tableNumber: string): boolean {
    const tableNumberInt = parseInt(tableNumber, 10);
    return !isNaN(tableNumberInt) && tableNumberInt > 0;
  }

  setTableNumberFromStorage() {
    const tableNumber = this.getTableNumber();

    if (tableNumber) {
      this.tableNumber = tableNumber;
    } else {
      this.tableNumber = '';
    }
  }
}
