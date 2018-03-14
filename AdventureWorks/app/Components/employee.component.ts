import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../Service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IEmployee } from '../Models/employee';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/employee.component.html'
})

export class EmployeeComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    employees: IEmployee[];
    employee: IEmployee;
    msg: string;
    maxBirthDate: string;
    indLoading: boolean = false;
    employeeFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _employeeService: EmployeeService) { }

    ngOnInit(): void {
        this.employeeFrm = this.fb.group({
            BusinessEntityID: [''],
            NationalIDNumber: ['', Validators.required],
            LoginID: ['', Validators.required],
            OrganizationLevel: [''],
            JobTitle: ['', Validators.required],
            BirthDate: ['', Validators.required],
            MaritalStatus: ['', Validators.required],
            Gender: ['', Validators.required],
            HireDate: ['', Validators.required],
            VacationHours: ['', Validators.required],
            SickLeaveHours: ['', Validators.required],
            SalariedFlag: [true],
            ModifiedDate: [''],
            CurrentFlag: [true],
            rowguid: ['']
        });
        var today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        this.maxBirthDate = today.toISOString().substring(0, 10);
        this.LoadEmployees();
    }
    
    LoadEmployees(): void {
        this.indLoading = true;
        this._employeeService.get(Global.BASE_EMPLOYEE_ENDPOINT)
            .subscribe(employees => { this.employees = employees; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addEmployee() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Employee";
        this.modalBtnTitle = "Add";
        this.employeeFrm.reset();
        this.employeeFrm.patchValue({ LoginID: "adventure-works\\" });       
        this.modal.open();
    }

    editEmployee(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Employee";
        this.modalBtnTitle = "Update";
        this.employee = this.employees.filter(x => x.BusinessEntityID == id)[0];
        this.employee.HireDate = new Date(this.employee.HireDate).toISOString().substring(0, 10);
        this.employee.BirthDate = new Date(this.employee.BirthDate).toISOString().substring(0, 10);
        this.employeeFrm.setValue(this.employee);
        this.modal.open();
    }

    deleteEmployee(id: number) {
        this.dbops = DBOperation.delete;

        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.employee = this.employees.filter(x => x.BusinessEntityID == id)[0];
        this.employeeFrm.setValue(this.employee);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.employeeFrm.enable() : this.employeeFrm.disable();
    }

    onSubmit(formData: any) {
        this.msg = "";
        formData._value.ModifiedDate = new Date();
        switch (this.dbops) {
            case DBOperation.create:
                this._employeeService.post(Global.BASE_EMPLOYEE_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadEmployees();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._employeeService.put(Global.BASE_EMPLOYEE_ENDPOINT, formData._value.BusinessEntityID, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadEmployees();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._employeeService.delete(Global.BASE_EMPLOYEE_ENDPOINT, formData._value.BusinessEntityID).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadEmployees();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
        }
    }
}