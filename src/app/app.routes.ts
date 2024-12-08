import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { UserPageComponent } from '../components/user-page/user-page.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: 'user', component: UserPageComponent }
];
