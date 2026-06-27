import { selectAllClients, selectClientCount, selectClientsLoading } from './clients.selectors';
import { initialState, clientsAdapter } from './clients.reducer';
import { Client } from '../../models';

describe('clientsSelectors', () => {
  const clients: Client[] = [
    {
      id: 'CLT-1',
      name: 'Alpha',
      status: 'Active',
      tier: 'Standard',
      accountManager: 'X',
      balance: 1,
      lastContact: '2024-01-01',
      balanceHistory: [1],
    },
  ];

  const state = {
    clients: clientsAdapter.setAll(clients, {
      ...initialState,
      loaded: true,
    }),
  };

  it('selectAllClients returns all clients', () => {
    expect(selectAllClients(state)).toEqual(clients);
  });

  it('selectClientCount returns count', () => {
    expect(selectClientCount(state)).toBe(1);
  });

  it('selectClientsLoading returns loading flag', () => {
    expect(selectClientsLoading(state)).toBe(false);
  });
});
