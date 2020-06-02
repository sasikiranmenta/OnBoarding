import { Component, OnInit } from '@angular/core';
import { DemandDetails } from 'src/app/shared/demand.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-detail',
  templateUrl: './demand-detail.component.html',
  styleUrls: ['./demand-detail.component.css']
})
export class DemandDetailComponent implements OnInit {

  demand: DemandDetails;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private demandService: DemandService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.demand = this.demandService.getDemand(this.id);
      }
    );
  }

  onDelete(){
    console.log(this.demand.demandid);
    this.demandService.deleteDemand(this.demand.demandid);
    this.router.navigate(['/demands']);
  }

}
