---
id: testing
title: Testing Guide
sidebar_position: 2
---

This guide covers how to test BarStrad-UI during development and before production deployment.

## Testing Environment Setup

### Development Environment

Set up your local testing environment:

1. **Install Dependencies**

   ```bash
   # Install all dependencies
   pnpm install
   
   # Install testing dependencies
   pnpm install --save-dev @angular/testing
   ```

2. **Development Server**

   ```bash
   # Start development server
   pnpm start
   
   # Server should be available at http://localhost:4200
   ```

3. **Test Configuration**

   Verify test configuration in `angular.json`:

   ```json
   {
     "test": {
       "builder": "@angular-devkit/build-angular:karma",
       "options": {
         "karmaConfig": "karma.conf.js",
         "tsConfig": "tsconfig.spec.json"
       }
     }
   }
   ```

### Test Data Setup

Use test menu data for consistent testing:

```json
// src/assets/test-menu-items.json
[
  {
    "name": "Test Beverages",
    "items": [
      {
        "name": "Test Coffee",
        "price": 5.00
      },
      {
        "name": "Test Tea",
        "price": 3.50
      }
    ]
  }
]
```

## Manual Testing Checklist

### Core Functionality Tests

Test all basic application operations:

**Application Loading**

```bash
# Start development server
pnpm start

# Verify console output shows:
# ✅ Angular Live Development Server is listening
# ✅ Compiled successfully
```

**Basic Navigation**

- [ ] Application loads at http://localhost:4200
- [ ] Menu items display correctly
- [ ] Language switching works
- [ ] Settings component is accessible

Test each feature in your browser:

```typescript
// Test navigation
// Navigate to different components
// Verify routing works correctly
```

#### Menu Display Testing

1. Verify menu formatting is correct
2. Check that all categories display
3. Ensure item prices are formatted properly
4. Test both language versions (EN/BG)

#### Language Switching Testing

Test language functionality:

- [ ] Language toggle switches between EN/BG
- [ ] Menu items translate correctly
- [ ] UI elements change language
- [ ] Selected language persists on refresh

#### Error Handling Tests

##### Network Issues

1. Disconnect internet during application use
2. Verify graceful error handling for asset loading
3. Test offline behavior

##### Invalid Data

1. Test with malformed JSON files
2. Verify error messages are helpful
3. Ensure application doesn't crash

##### Browser Compatibility

1. Test in different browsers (Chrome, Firefox, Safari, Edge)
2. Verify responsive design on mobile
3. Test with different screen sizes

## Automated Testing

### Unit Testing Setup

Create test files for components and services:

```typescript
// menu.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MenuService]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load menu items', () => {
    // Test menu loading functionality
  });
});
```

### Component Testing

Test Angular components:

```typescript
// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu items', () => {
    // Test menu rendering
  });
});
```

### Service Testing

Test Angular services:

```typescript
// language.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should switch languages', () => {
    service.setLanguage('bg');
    expect(service.getCurrentLanguage()).toBe('bg');
  });
});
```

### Running Tests

Execute different types of tests:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage

# Run specific test file
pnpm test menu.service.spec.ts
```

### E2E Testing

Set up end-to-end testing with Cypress:

```bash
# Install Cypress
pnpm install --save-dev cypress

# Open Cypress
pnpm cypress open
```

Create E2E tests:

```typescript
// cypress/e2e/menu.cy.ts
describe('Menu Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display menu items', () => {
    cy.get('[data-cy=menu-items]').should('exist');
    cy.get('[data-cy=menu-item]').should('have.length.greaterThan', 0);
  });

  it('should switch languages', () => {
    cy.get('[data-cy=language-toggle]').click();
    cy.get('[data-cy=menu-title]').should('contain', 'Меню');
  });
});
```

### Testing Checklist

Before submitting changes, ensure:

#### Functionality Tests

- [ ] All components render correctly
- [ ] Language switching works as expected  
- [ ] Menu items display properly
- [ ] Settings component functions correctly

#### Integration Tests

- [ ] Application loads successfully
- [ ] Assets load correctly
- [ ] HTTP requests work properly
- [ ] Navigation functions correctly

#### Performance Tests

- [ ] Application loads within acceptable time
- [ ] Memory usage remains stable
- [ ] No memory leaks detected
- [ ] Large datasets handled properly

#### Edge Cases

- [ ] Invalid data formats handled
- [ ] Network disconnections handled gracefully
- [ ] Malformed JSON data handled
- [ ] Browser compatibility verified

### Continuous Testing

#### Automated Test Runs

Set up automated testing:

```json
// package.json scripts
{
  "scripts": {
    "test": "ng test",
    "test:watch": "ng test --watch",
    "test:coverage": "ng test --coverage",
    "e2e": "cypress run",
    "e2e:open": "cypress open"
  }
}
```

#### Test Reporting

Generate test reports:

```bash
# Run tests with coverage
pnpm test --coverage

# Generate HTML report
pnpm test --coverage --reporters=html

# Open coverage report
start coverage/index.html
```

### Performance Testing

#### Bundle Analysis

Analyze bundle size:

```bash
# Build with stats
pnpm build --stats-json

# Analyze bundle
npx webpack-bundle-analyzer dist/barstrad-ui/stats.json
```

#### Performance Audits

Use Lighthouse for performance testing:

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:4200 --output html --output-path ./lighthouse-report.html
```

### Testing Best Practices

#### Test Organization

```typescript
// Organize tests by feature
describe('MenuComponent', () => {
  describe('when loading menu items', () => {
    it('should display loading indicator', () => {
      // Test implementation
    });

    it('should hide loading indicator when done', () => {
      // Test implementation
    });
  });

  describe('when switching languages', () => {
    it('should update menu items', () => {
      // Test implementation
    });
  });
});
```

#### Mock Data

Use consistent test data:

```typescript
// test-data/menu-items.mock.ts
export const mockMenuItems = [
  {
    name: 'Test Category',
    items: [
      { name: 'Test Item 1', price: 5.00 },
      { name: 'Test Item 2', price: 7.50 }
    ]
  }
];
```

---

**Remember**: Thorough testing prevents production issues and ensures a reliable application experience for users!
