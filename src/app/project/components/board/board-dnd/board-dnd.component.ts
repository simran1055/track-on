import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IssueStatus } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { AuthQuery } from '@trungk18/project/auth/auth.query';
import { ApiService } from '@trungk18/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@UntilDestroy()
@Component({
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
export class BoardDndComponent {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  id: any;

  constructor(
    public projectQuery: ProjectQuery,
    public authQuery: AuthQuery,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiService.postApiFn(`/get-issue`, { projectId: this.id }).subscribe((res: any) => {
      console.log(res);
    }, error => this.toastr.error(error))
  }
}

