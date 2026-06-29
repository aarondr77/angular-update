import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

/**
 * Characterization tests — pins AuthGuard behavior before Angular 14→15 upgrade.
 */
describe('AuthGuard (characterization)', () => {
  let guard: AuthGuard;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore({
          selectors: [{ selector: selectIsAuthenticated, value: false }],
        }),
        {
          provide: Router,
          useValue: { createUrlTree: jest.fn().mockReturnValue('login-url-tree') },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('redirects to /login when not authenticated', async () => {
    store.overrideSelector(selectIsAuthenticated, false);
    store.refreshState();
    const result = await firstValueFrom(
      guard.canActivate() as ReturnType<typeof guard.canActivate>
    );
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBe('login-url-tree');
  });

  it('allows navigation when authenticated', async () => {
    store.overrideSelector(selectIsAuthenticated, true);
    store.refreshState();
    const result = await firstValueFrom(
      guard.canActivate() as ReturnType<typeof guard.canActivate>
    );
    expect(result).toBe(true);
  });
});
