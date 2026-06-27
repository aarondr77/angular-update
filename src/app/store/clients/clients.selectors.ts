import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsState, selectAll, selectEntities } from './clients.reducer';

export const selectClientsState = createFeatureSelector<ClientsState>('clients');

export const selectAllClients = createSelector(selectClientsState, selectAll);
export const selectClientEntities = createSelector(selectClientsState, selectEntities);
export const selectClientsLoading = createSelector(selectClientsState, (state) => state.loading);
export const selectClientsLoaded = createSelector(selectClientsState, (state) => state.loaded);
export const selectClientsError = createSelector(selectClientsState, (state) => state.error);
export const selectClientCount = createSelector(selectAllClients, (clients) => clients.length);
export const selectSelectedClientId = createSelector(
  selectClientsState,
  (state) => state.selectedClientId
);
export const selectSelectedClient = createSelector(
  selectClientEntities,
  selectSelectedClientId,
  (entities, id) => (id ? entities[id] ?? null : null)
);
