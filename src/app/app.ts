import { Component } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { Tech } from './pages/tech/tech';
import { Home } from './pages/home/home';
import { Destination } from './pages/destination/destination';
import { Crew } from './pages/crew/crew';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'destination', component: Destination },
  { path: 'crew', component: Crew },
  { path: 'tech', component: Tech },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/destination">Destination</a>
        <a routerLink="/crew">Crew</a>
        <a routerLink="/tech">Tech</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {}

// Bootstrap the application
bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
