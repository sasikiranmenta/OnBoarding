import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { GradsService } from '../grads/grads.service';
import { GradDetails } from './grad.model';
import { GradPutDetails } from './gradput.model';
import { DemandDetails } from './demand.model';
import { DemandputDetails } from './demandput.model';
import { Employee } from '../authentication/employee.model';
import { Log } from './log.model';


@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
        private http: HttpClient
    ) { }

    storeGrads(grad: GradPutDetails) {
        return this.http
            .post(
                'http://localhost:8080/bookapi/api/onboarding', grad
            );
    }

    updateGrad(id: number, grad: GradPutDetails) {
        return this.http.put(
            "http://localhost:8080/bookapi/api/onboarding/" + id, grad
        );
    }

    fetchGrads() {
        return this.http
            .get<GradDetails[]>(
                'http://localhost:8080/bookapi/api/onboarding'
            );
    }

    deleteGrad(id: number) {
        return this.http.delete("http://localhost:8080/bookapi/api/onboarding/" + id);
    }


    deleteDemand(id: number) {
        return this.http.delete("http://localhost:8080/bookapi/api/demand/" + id);
    }


    fetchDemand() {
        return this.http.get<DemandDetails[]>(
            'http://localhost:8080/bookapi/api/demand'
        );
    }

    updateDemand(id: number, demand: DemandputDetails) {
        return this.http.put(
            "http://localhost:8080/bookapi/api/demand/" + id, demand
        );
    }
    
    getDemand(id: number){
        return this.http.get<DemandDetails>("http://localhost:8080/bookapi/api/demand/" + id);
    }

    storeDemands(demand: DemandDetails) {
        return this.http.post(
            'http://localhost:8080/bookapi/api/demand', demand
        );
    }

    addEmployee(employee: Employee){
        return this.http.post(
            'http://localhost:8080/bookapi/api/employee', employee
        );

    }

    getEmployees(){
        return this.http.get<Employee[]>('http://localhost:8080/bookapi/api/employee');
    }

    getEmployee(id: number){
        return this.http.get<Employee>("http://localhost:8080/bookapi/api/employee/"+id);
    }

    addLog(log: Log){
console.log(log.userid);
        return this.http.post('http://localhost:8080/bookapi/api/logging', log);
    }

    getLog(){
        return this.http.get<Log[]>('http://localhost:8080/bookapi/api/logging');
    }



}
