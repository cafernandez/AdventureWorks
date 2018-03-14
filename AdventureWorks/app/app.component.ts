import { Component } from "@angular/core"
@Component({
    selector: "employee-app",
    template: `
               <div>
                  <nav class='navbar'>
                       <div class='container-fluid'>
                         <ul class='nav navbar-nav'>
                            <li><img src="../images/ExigyLogo.png"/></li>
                            <li nav-item active><a [routerLink]="['employee']">Employees Management</a></li>
                        </ul>
                      </div>
                 </nav>    
              <div class='container'>
                <router-outlet></router-outlet>
              </div>
             </div>          
`
})

export class AppComponent {

}