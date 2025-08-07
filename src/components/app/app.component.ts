// src/app/app.component.ts

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import {
  DiscordNotificationService,
  LanguageService,
  MenuService,
  StorageService,
  TableService,
  ThemeService
} from '../../services';
import { MenuCategory, MenuItem } from '../../models';
import { faCog } from '@fortawesome/free-solid-svg-icons';
//import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    //FaIconComponent,
    MatSnackBarModule
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') imageUrlInput!: ElementRef;
  menuCategories: MenuCategory[] = [];
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  themeChecked = false;
  currentLanguage = '';
  tableNumber: string | null = null;
  faCog = faCog;

  constructor(
    private menuService: MenuService,
    private translate: TranslateService,
    protected tableService: TableService,
    private storageService: StorageService,
    private languageService: LanguageService,
    private discordNotificationService: DiscordNotificationService,
    private snackBar: MatSnackBar,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;

      this.translate.use(language).subscribe(
        () => {
          console.log(`Setting Language: ${language}`);
        },
        (err) => {
          console.error(err);
        }
      );

      this.loadMenuCategories();
      this.loadMenuItems();
    });

    this.setTheme();
    this.tableService.setTableNumberFromStorage();
    this.tableService.storeTableNumber();
  }

  ngAfterViewInit(): void {
    this.imageUrlInput.nativeElement.focus();
    this.imageUrlInput.nativeElement.select();
  }

  loadMenuCategories() {
    this.menuService
      .getCategories(this.currentLanguage)
      .subscribe((data: MenuCategory[]) => {
        this.menuCategories = data;
      });
  }

  loadMenuItems() {
    this.menuService
      .getItems(this.currentLanguage)
      .subscribe((data: MenuItem[]) => {
        this.menuItems = data;
        this.filteredMenuItems = data;

        const storedCategory = this.storageService.getItem('selectedCategory');

        if (storedCategory) {
          this.filterByCategory(storedCategory);
        }
      });
  }

  filterMenu(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredMenuItems = this.menuItems
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(query)
        )
      }))
      .filter((category) => category.items.length > 0);
  }

  resetSearch(input: HTMLInputElement) {
    input.value = '';

    const customEvent = { target: input } as unknown as Event;

    this.filterMenu(customEvent);
    this.showAllCategories();
  }

  filterByCategory(category: string) {
    if (category !== null) {
      this.storageService.setItem('selectedCategory', category);
    }

    if (
      this.filteredMenuItems.length > 0 &&
      this.filteredMenuItems[0].category === category
    ) {
      this.showAllCategories();
    } else {
      this.filteredMenuItems = this.menuItems.filter(
        (cat) => cat.category === category
      );
      this.updateSelectedCategory(category);
    }
  }

  showAllCategories() {
    this.storageService.removeItem('selectedCategory');
    this.filteredMenuItems = this.menuItems;
    this.updateSelectedCategory('All');
  }

  updateSelectedCategory(category: string) {
    const categoryLinks = document.querySelectorAll('.category-header a');

    categoryLinks.forEach((link) => {
      if (link.textContent && link.textContent.trim() === category) {
        link.classList.add('selected');
      } else {
        link.classList.remove('selected');
      }
    });
  }

  orderItem(item: MenuItem, event: Event) {
    if (!this.tableService.tableNumber) {
      return;
    }

    const button = event.target as HTMLButtonElement;
    const originalContent = button.innerHTML;

    button.disabled = true;
    button.innerHTML = '<i class="fas fa-shopping-cart"></i> Order Placed!';

    const message = `Table #${this.tableService.tableNumber}: ${item.name} (${item.price})`;

    from(this.discordNotificationService.sendMessage(message)).subscribe({
      next: () => {
        this.snackBar.open('Order Placed Successfully!', '', {
          duration: 3000,
          panelClass: ['custom-snack-bar']
        });
      },
      error: () => {
        this.snackBar.open('Order Failed. Try Again...', '', {
          duration: 3000,
          panelClass: ['custom-snack-bar']
        });
      },
      complete: () => {
        button.disabled = false;
        button.innerHTML = originalContent;
      }
    });
  }

  toggleTheme(event: Event) {
    const target = event.target as HTMLInputElement | null;

    if (target) {
      const theme = target.checked ? 'dark' : 'light';
      this.themeService.setTheme(theme);
      this.themeChecked = target.checked;
    }
  }

  setTheme() {
    const theme = this.themeService.getTheme();
    this.themeService.applyTheme();
    this.themeChecked = theme === 'dark';
  }

  setLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
}
