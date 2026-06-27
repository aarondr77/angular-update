import { clientsReducer, initialState, clientsAdapter } from './clients.reducer';
import * as ClientsActions from './clients.actions';
import { Client } from '../../models';

const mockClients: Client[] = [
  {
    id: 'CLT-1',
    name: 'Beta Corp',
    status: 'Active',
    tier: 'Standard',
    accountManager: 'A',
    balance: 100,
    lastContact: '2024-01-01',
    balanceHistory: [90, 95, 100],
  },
  {
    id: 'CLT-2',
    name: 'Alpha Inc',
    status: 'Review',
    tier: 'Premier',
    accountManager: 'B',
    balance: 200,
    lastContact: '2024-01-02',
    balanceHistory: [180, 190, 200],
  },
];

describe('clientsReducer', () => {
  it('should set loading on loadClients', () => {
    const state = clientsReducer(initialState, ClientsActions.loadClients());
    expect(state.loading).toBe(true);
  });

  it('should populate entities on success', () => {
    const state = clientsReducer(
      initialState,
      ClientsActions.loadClientsSuccess({ clients: mockClients })
    );
    expect(clientsAdapter.getSelectors().selectAll(state)).toHaveLength(2);
    expect(state.loaded).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('should store selected client id', () => {
    const state = clientsReducer(initialState, ClientsActions.selectClient({ id: 'CLT-1' }));
    expect(state.selectedClientId).toBe('CLT-1');
  });
});
