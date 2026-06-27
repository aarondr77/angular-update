import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { clientsReducer, ClientsState } from './clients/clients.reducer';
import { notificationsReducer, NotificationsState } from './notifications/notifications.reducer';

export interface AppState {
  auth: AuthState;
  clients: ClientsState;
  notifications: NotificationsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  clients: clientsReducer,
  notifications: notificationsReducer,
};
