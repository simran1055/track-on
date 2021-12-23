import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from '@trungk18/core/services/google-analytics.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];

  constructor(private _googleAnalytics: GoogleAnalyticsService, private router: Router) { }

  sendTwitterEventButton() {
    this._googleAnalytics.sendEvent('Share Twitter', 'button');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/sign-in'])
  }

}
