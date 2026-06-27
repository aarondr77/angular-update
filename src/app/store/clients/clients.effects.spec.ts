import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { ClientsEffects } from './clients.effects';
import * as ClientsActions from './clients.actions';

describe('ClientsEffects', () => {
  let actions$: Observable<unknown>;
  let effects: ClientsEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientsEffects, provideMockActions(() => actions$)],
    });
    effects = TestBed.inject(ClientsEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should load clients on loadClients action', (done) => {
    const clients = [{ id: 'CLT-1', name: 'Test' }];
    actions$ = new Observable((subscriber) => {
      subscriber.next(ClientsActions.loadClients());
      subscriber.complete();
    });

    effects.loadClients$.subscribe((action) => {
      expect(action).toEqual(ClientsActions.loadClientsSuccess({ clients: clients as never }));
      done();
    });

    const req = httpMock.expectOne('/api/clients');
    expect(req.request.method).toBe('GET');
    req.flush(clients);
  });
});
