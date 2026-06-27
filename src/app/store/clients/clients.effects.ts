import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Client } from '../../models';
import * as ClientsActions from './clients.actions';

@Injectable()
export class ClientsEffects {
  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClients),
      mergeMap(() =>
        this.http.get<Client[]>('/api/clients').pipe(
          map((clients) => ClientsActions.loadClientsSuccess({ clients })),
          catchError((error) =>
            of(
              ClientsActions.loadClientsFailure({
                error: error.message || 'Failed to load clients',
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
