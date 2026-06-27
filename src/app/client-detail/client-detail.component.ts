import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models';
import * as ClientsActions from '../store/clients/clients.actions';
import {
  selectAllClients,
  selectClientsLoaded,
  selectClientsLoading,
} from '../store/clients/clients.selectors';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  client$: Observable<Client | undefined>;
  loading$ = this.store.select(selectClientsLoading);
  private sub = new Subscription();

  notes = '';

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
    this.client$ = this.store.select(selectAllClients).pipe(
      map((clients) => {
        const id = this.route.snapshot.paramMap.get('id');
        return clients.find((c) => c.id === id);
      })
    );
  }

  ngOnInit(): void {
    this.sub.add(
      this.store.select(selectClientsLoaded).subscribe((loaded) => {
        if (!loaded) {
          this.store.dispatch(ClientsActions.loadClients());
        }
      })
    );

    this.sub.add(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.store.dispatch(ClientsActions.selectClient({ id }));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  statusClass(status: string): string {
    return status.toLowerCase();
  }
}
