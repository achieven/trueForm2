import {EventEmitter, Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class NavService {
  navchange: EventEmitter<boolean> = new EventEmitter();
  constructor() {}
  emitNavChangeEvent(value: boolean) {
    this.navchange.emit(true);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}
