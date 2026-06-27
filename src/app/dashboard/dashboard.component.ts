import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Client } from '../models';
import * as ClientsActions from '../store/clients/clients.actions';
import {
  selectAllClients,
  selectClientCount,
  selectClientsError,
  selectClientsLoading,
} from '../store/clients/clients.selectors';
import { selectAuthUser } from '../store/auth/auth.selectors';
import * as AuthActions from '../store/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  clients$: Observable<Client[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  count$: Observable<number>;
  user$ = this.store.select(selectAuthUser) as Observable<{ displayName: string } | null>;

  displayedColumns = ['id', 'name', 'status', 'tier', 'balance', 'accountManager'];

  constructor(private store: Store, private router: Router) {
    this.clients$ = this.store.select(selectAllClients);
    this.loading$ = this.store.select(selectClientsLoading);
    this.error$ = this.store.select(selectClientsError);
    this.count$ = this.store.select(selectClientCount);
  }

  ngOnInit(): void {
    this.store.dispatch(ClientsActions.loadClients());
  }

  onRowClick(client: Client): void {
    this.store.dispatch(ClientsActions.selectClient({ id: client.id }));
    this.router.navigate(['/clients', client.id]);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }
}
