"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var employee_service_1 = require("../Service/employee.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent(fb, _employeeService) {
        this.fb = fb;
        this._employeeService = _employeeService;
        this.indLoading = false;
    }
    EmployeeComponent.prototype.ngOnInit = function () {
        this.employeeFrm = this.fb.group({
            BusinessEntityID: [''],
            NationalIDNumber: ['', forms_1.Validators.required],
            LoginID: ['', this.loginIDUnique.bind(this)],
            OrganizationLevel: [''],
            JobTitle: ['', forms_1.Validators.required],
            BirthDate: ['', forms_1.Validators.required],
            MaritalStatus: ['', forms_1.Validators.required],
            Gender: ['', forms_1.Validators.required],
            HireDate: ['', forms_1.Validators.required],
            VacationHours: ['', forms_1.Validators.required],
            SickLeaveHours: ['', forms_1.Validators.required],
            SalariedFlag: [true],
            ModifiedDate: [''],
            CurrentFlag: [true],
            rowguid: ['']
        });
        var today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        this.maxBirthDate = today.toISOString().substring(0, 10);
        this.LoadEmployees();
    };
    EmployeeComponent.prototype.loginIDUnique = function (c) {
        try {
            return !this.employees.find(function (x) { return x.LoginID == c.value; }) && (c.value != '') ? null : {
                validateLoginID: {
                    valid: false
                }
            };
        }
        catch (ex) {
            console.log(ex);
        }
    };
    EmployeeComponent.prototype.LoadEmployees = function () {
        var _this = this;
        this.indLoading = true;
        this._employeeService.get(global_1.Global.BASE_EMPLOYEE_ENDPOINT)
            .subscribe(function (employees) { _this.employees = employees; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    EmployeeComponent.prototype.addEmployee = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Employee";
        this.modalBtnTitle = "Add";
        this.employeeFrm.reset();
        this.employeeFrm.patchValue({ LoginID: "adventure-works\\" });
        this.modal.open();
    };
    EmployeeComponent.prototype.editEmployee = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Employee";
        this.modalBtnTitle = "Update";
        this.employee = this.employees.filter(function (x) { return x.BusinessEntityID == id; })[0];
        this.employee.HireDate = new Date(this.employee.HireDate).toISOString().substring(0, 10);
        this.employee.BirthDate = new Date(this.employee.BirthDate).toISOString().substring(0, 10);
        this.employeeFrm.setValue(this.employee);
        this.modal.open();
    };
    EmployeeComponent.prototype.deleteEmployee = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.employee = this.employees.filter(function (x) { return x.BusinessEntityID == id; })[0];
        this.employeeFrm.setValue(this.employee);
        this.modal.open();
    };
    EmployeeComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.employeeFrm.enable() : this.employeeFrm.disable();
    };
    EmployeeComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        formData._value.ModifiedDate = new Date();
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._employeeService.post(global_1.Global.BASE_EMPLOYEE_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadEmployees();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._employeeService.put(global_1.Global.BASE_EMPLOYEE_ENDPOINT, formData._value.BusinessEntityID, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadEmployees();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._employeeService.delete(global_1.Global.BASE_EMPLOYEE_ENDPOINT, formData._value.BusinessEntityID).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadEmployees();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EmployeeComponent.prototype, "modal", void 0);
    EmployeeComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/employee.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, employee_service_1.EmployeeService])
    ], EmployeeComponent);
    return EmployeeComponent;
}());
exports.EmployeeComponent = EmployeeComponent;
//# sourceMappingURL=employee.component.js.map