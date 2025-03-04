import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { LogService } from 'src/app/services/log.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { PutawayService } from 'src/app/services/transaction/putaway.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-put-away-detail',
  templateUrl: './put-away-detail.component.html',
  styleUrls: ['./put-away-detail.component.scss']
})
export class PutAwayDetailComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(
    private route: Router,
    private alert: AlertService,
    private utility: UtilityService,
    private warehouseApi: WarehouseService,
    private putAwayApi: PutawayService,
    private log: LogService) {
    this.onPreInit();
  }

  onPreInit() {

  }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit(): void {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      const number = localStorage.getItem('putaway-number');
      if (number) {
        this.getPutAwayDetail(number);
      }
      else {
        this.route.navigateByUrl('/putaway');
      }
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {

  }

  getPutAwayDetail(number: string) {
    this.subscription.add(
      this.putAwayApi.getPutAwayDetail(number).subscribe({
        next: response => { this.log.log('put away detail response : ', response); },
        error: error => { this.log.error(error, 'put-away-detail', 'getPutAwayDetail') }
      })
    );
  }

  getBasicUtility() {

  }

  ngOnDestroy(): void {

  }

}
