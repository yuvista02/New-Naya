import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private entityType$ = new BehaviorSubject<string | null>(null);
  private headerName$ = new BehaviorSubject<string | null>(null);
  private entityID$ = new BehaviorSubject<number | null>(null);
  public MSShowButton: boolean = false;

  constructor() {}

  public setHistoryEntityValues(showButton: boolean, entityType: string | null, entityID: number | null, entityName: string | null) {
    this.entityType$.next(entityType);
    this.entityID$.next(entityID);
    this.headerName$.next(`${entityType?.getDisplayName()} History: ${entityName ?? String.empty}`);
    this.MSShowButton = showButton;
  }

  public GetHistoryEntityType(): Observable<string | null> {
    return this.entityType$.asObservable();
  }

  public GetHistoryEntityID(): Observable<number | null> {
    return this.entityID$.asObservable();
  }

  public GetHistoryHeaderName(): Observable<string | null> {
    return this.headerName$.asObservable();
  }
}
