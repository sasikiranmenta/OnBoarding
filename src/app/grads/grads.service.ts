import { GradDetails } from '../shared/grad.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GradsService {

    gradsChanged = new Subject<GradDetails[]>();

    private grads: GradDetails[] = [
        new GradDetails(1, 'sasikiran', 'sasikiranmenta@gmail.com', 'ssn college', 8, 90101804449, 'mungamuri vari street', 'mungamuri vari street', 'banglore', '2020-05-15', '2020-05-15', false, false),

        new GradDetails(2, 'sasikiran', 'sasikiranmenta@gmail.com', 'ssn college', 9, 90101804449, 'mungamuri vari street', 'mungamuri vari street', 'banglore', '2020-05-15' , '2020-05-15', false, true)
    ];

    getGrads() {
        console.log(this.grads[0].presentAddress);
        return this.grads.slice();

    }

    getGrad(index: number) {
        return this.grads[index];

    }

    addGrad(grad: GradDetails){
        this.grads.push(grad);
        this.gradsChanged.next(this.grads.slice());
        console.log("hii");

    }

    updateGrad(index: number, grad: GradDetails){
        this.grads[index] = grad;
        this.gradsChanged.next(this.grads.slice());
    }


}
