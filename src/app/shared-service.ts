import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable()
export class SharedService {
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  private needToRefreshMenu = new Subject<any>();
  changeMenuEmitted$ = this.needToRefreshMenu.asObservable();
  emitChangeforMenu(change: any) {
    this.needToRefreshMenu.next(change);
  }

  private sendmsgopen = new Subject<any>();
  sendmsgopen$ = this.sendmsgopen.asObservable();

  sendMsgOpen(type:boolean) {
    this.sendmsgopen.next(type)
  }
}


