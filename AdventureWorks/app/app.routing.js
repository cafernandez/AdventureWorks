"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var employee_component_1 = require("./components/employee.component");
var appRoutes = [
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    { path: 'employee', component: employee_component_1.EmployeeComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map