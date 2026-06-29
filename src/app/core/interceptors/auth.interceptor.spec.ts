import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { AuthUser } from '../../models';

/**
 * Characterization tests — pins AuthInterceptor behavior before Angular 14→15 upgrade.
 */
describe('AuthInterceptor (characterization)', () => {
  let interceptor: AuthInterceptor;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        provideMockStore({
          selectors: [{ selector: selectAuthUser, value: null }],
        }),
      ],
    });
    interceptor = TestBed.inject(AuthInterceptor);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('passes request through without auth header when no user', async () => {
    store.overrideSelector(selectAuthUser, null);
    store.refreshState();

    const req = new HttpRequest('GET', '/api/clients');
    const handler: HttpHandler = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse({ status: 200 }))),
    };

    await firstValueFrom(interceptor.intercept(req, handler));
    expect(handler.handle).toHaveBeenCalledWith(req);
  });

  it('attaches Authorization header when user has token', async () => {
    store.overrideSelector(selectAuthUser, {
      token: 'test-token-123',
      username: 'test',
      displayName: 'Test',
    } as AuthUser);
    store.refreshState();

    const req = new HttpRequest('GET', '/api/clients');
    const handler: HttpHandler = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse({ status: 200 }))),
    };

    await firstValueFrom(interceptor.intercept(req, handler));
    const calledReq = (handler.handle as jest.Mock).mock.calls[0][0];
    expect(calledReq.headers.get('Authorization')).toBe('Bearer test-token-123');
  });

  it('does not attach header when user has empty token', async () => {
    store.overrideSelector(selectAuthUser, {
      token: '',
      username: 'test',
      displayName: 'Test',
    } as AuthUser);
    store.refreshState();

    const req = new HttpRequest('GET', '/api/clients');
    const handler: HttpHandler = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse({ status: 200 }))),
    };

    await firstValueFrom(interceptor.intercept(req, handler));
    expect(handler.handle).toHaveBeenCalledWith(req);
  });
});
