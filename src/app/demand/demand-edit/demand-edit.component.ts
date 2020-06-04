import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'src/app/shared/datastorage.service';
import { DemandService } from '../demand.service';
import { DemandDetails } from 'src/app/shared/demand.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { formatDate } from '@angular/common';
import { LogService } from 'src/app/shared/log.service';
import { User } from 'src/app/authentication/user.model';
import { AuthenticationService } from '../../authentication/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-demand-edit',
  templateUrl: './demand-edit.component.html',
  styleUrls: ['./demand-edit.component.css']
})
export class DemandEditComponent implements OnInit, OnDestroy {

  id: number;
  demand: DemandDetails;
  editmode = false;
  demandform: FormGroup;
  demand1: DemandDetails;
  user: User;
  userSub: Subscription;
  currentdate = new Date();
  date = formatDate(this.currentdate, 'yyyy-MM-dd', 'en');

  constructor(private router: Router,
              private route: ActivatedRoute,
              private demandservice: DemandService,
              private datastorage: DataStorageService,
              private logService: LogService,
              private authService: AuthenticationService) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user)=>{
      this.user = user;
        })
    this.demandservice.setDemands();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editmode = params['id'] != null;
      this.initform();
      this.userSub = this.authService.user.subscribe((user)=>{
              this.user = user;
      });

    });
  }

  private initform() {

    let skills = '';
    let count;
    let location = '';
    let start = '';
    let status = '';
    if (this.editmode) {
      this.demand1 = this.demandservice.getDemand(this.id);
    }

    if (this.editmode) {
      const demand = this.demandservice.getDemand(this.id);
      skills = demand.skills;
      count = demand.count;
      location = demand.location;
      start = formatDate(demand.start, 'yyyy-MM-dd', 'en');
      status = demand.status;
    }

    this.demandform = new FormGroup({
      skills: new FormControl(skills, Validators.required),
      count: new FormControl(count, Validators.required),
      location: new FormControl(location, Validators.required),
      start: new FormControl(start, Validators.required),
      status: new FormControl(status, Validators.required),
      empid: new FormControl(this.user.id, Validators.required)
    });
  }

  onSubmit(){
    if(this.editmode){
      this.demandservice.updateDemand(this.demand1.demandid,this.demandform.value);
      this.logService.addlog("demand with id "+this.demand1.demandid+"has been updated", this.date,this.user.id);
    }else{
      this.demandservice.addDemand(this.demandform.value);
      this.logService.addlog("new demand has been created", this.date,this.user.id);
      
    }
    this.router.navigate(['/demands']);
  }

  onClear(){
    this.demandform.reset();
    this.router.navigate(['/demands']);
  }

}
