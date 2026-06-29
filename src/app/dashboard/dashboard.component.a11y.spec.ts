import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { axe } from 'jest-axe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { initialState } from '../store/clients/clients.reducer';
import { CurrencyCompactPipe } from '../shared/pipes/currency-compact.pipe';
import { DashboardComponent } from './dashboard.component';

const loadingClients = { ...initialState, loading: true };

describe('DashboardComponent a11y', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, CurrencyCompactPipe],
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatChipsModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              user: { username: 'a', token: 't', displayName: 'A' },
              loading: false,
              error: null,
            },
            clients: loadingClients,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
  });

  it('should have no a11y violations', async () => {
    const results = await axe(fixture.nativeElement);
    expect(results).toHaveNoViolations();
  });
});
