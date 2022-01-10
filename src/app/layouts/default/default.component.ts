import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import {Subscription} from "rxjs";
import { distinctUntilChanged } from 'rxjs/operators';
import {MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  mode: MatDrawerMode = 'side';

  private mediaSubscription!: Subscription;
  private activeMediaQuery: string = '';

  constructor(private mediaObserver: MediaObserver) {}


  ngOnInit(): void {
    const getAlias = (MediaChange: MediaChange[]) => {
      return MediaChange[0].mqAlias;
    };

    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .pipe(
        distinctUntilChanged(
          (x: MediaChange[], y: MediaChange[]) => getAlias(x) === getAlias(y)
        )
      )
      .subscribe((change) => {
        change.forEach((item) => {
          this.activeMediaQuery = item
            ? `'${item.mqAlias}' = (${item.mediaQuery})`
            : '';
          if (item.mqAlias === 'md') {
            this.mode="over"
          }
          if (item.mqAlias === 'lg') {
            this.mode="side"
          }
          console.log('activeMediaQuery', this.activeMediaQuery);
        });
      });
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
