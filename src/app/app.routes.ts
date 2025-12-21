import { Routes } from '@angular/router';
import { Tech } from './pages/tech/tech';
import { Home } from './pages/home/home';
import { Destination } from './pages/destination/destination';
import { Crew } from './pages/crew/crew';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'destination', component: Destination },
  { path: 'crew', component: Crew },
  { path: 'tech', component: Tech },
];
