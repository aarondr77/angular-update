import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Client } from '../../models';
import * as ClientsActions from './clients.actions';

export interface ClientsState extends EntityState<Client> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  selectedClientId: string | null;
}

export const clientsAdapter = createEntityAdapter<Client>({
  selectId: (client) => client.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const initialState: ClientsState = clientsAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  selectedClientId: null,
});

export const clientsReducer = createReducer(
  initialState,
  on(ClientsActions.loadClients, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientsActions.loadClientsSuccess, (state, { clients }) =>
    clientsAdapter.setAll(clients, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(ClientsActions.loadClientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ClientsActions.selectClient, (state, { id }) => ({
    ...state,
    selectedClientId: id,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } = clientsAdapter.getSelectors();
