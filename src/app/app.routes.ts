import { Routes } from '@angular/router';
import { ShowDataComponent } from './component/show-data/show-data.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    { path: 'show-data', component: ShowDataComponent },
];
