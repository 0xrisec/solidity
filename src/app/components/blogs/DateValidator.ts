import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';

@Injectable()
export class DateValidator {
    constructor(public datepipe: DatePipe) {
        this.datepipe = datepipe;
    }
    dateValidator = (control:AbstractControl) => {
        if (control) {
            const startDate = this.datepipe.transform(control?.parent?.get('start')?.value, 'MM/dd/YYYY');
            const endDate = this.datepipe.transform(control?.parent?.get('end')?.value, 'MM/dd/YYYY');
            if(startDate && endDate){
                const regExp = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[01])\/(\d{4})$/;
                let start = Date.parse(startDate);
                let end = Date.parse(endDate);
                if (startDate?.match(regExp) && endDate?.match(regExp) && start<=end) {
                    return null;
                } 
                return false;
            }
            return  false;
        } else{
            return false;
        }
    }
}