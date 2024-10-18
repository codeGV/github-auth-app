import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../../services/github-integration.service';
import { ActivatedRoute } from '@angular/router';
import { Integration } from 'src/app/models/integration.model';
import { GitHubRepo, RepoDetails } from 'src/app/models/repo.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef } from 'ag-grid-community'


@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrationComponent implements OnInit {
  connected: boolean = false;
  integrationData$ = new BehaviorSubject<Integration | null>(null);
  repos: GitHubRepo[] = [];
  repoDetails: RepoDetails[] = []

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'html_url', headerName: 'Link', cellRenderer: (params: any) => `<a href="${params.value}" target="_blank">${params.value}</a>` },
    { field: 'name', headerName: 'Slug' },
    { field: 'include', headerName: 'Include', checkboxSelection: true },
  ];

  statsColumnDefs: ColDef[] = [
    { field: 'userId', headerName: 'UserID' },
    { field: 'user', headerName: 'User' },
    { field: 'totalCommits', headerName: 'Total Commits' },
    { field: 'totalPullRequests', headerName: 'Total Pull Requests' },
    { field: 'totalIssues', headerName: 'Total Issues' }
  ];

  constructor(private _githubService: GithubIntegrationService,
    private _actRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const githubId = this._actRoute.snapshot.queryParams['id'];
    if (githubId) {
      this.fetchIntegration(githubId);
    }
  }

  connect() {
    this._githubService.connectGithub();
  }

  fetchIntegration(githubId: string) {
    this._githubService.getIntegrationByGitHubId(githubId).subscribe(
      (data) => {
        this.connected = true;
        this.integrationData$.next(new Integration(data));
        this.loadRepos()
        this.showMessage('Integration successfully completed');

      },
      (error) => {
        console.error('Error fetching integration:', error);
        this.showMessage(error?.error?.message);
      }
    );
  }

  remove() {
    this._githubService.removeIntegration(this.integrationData$.value?.githubId).subscribe(() => {
      this.connected = false;
      this.integrationData$.next(null);
      this.showMessage('Integration removed')
    });
  };

  loadRepos() {
    this._githubService.getAllReposForOrgs().subscribe((data) => {
      this.repos = data;
    });
  }

  onRepoChecked(event: Array<{ data: GitHubRepo }>) {
    if (event.length > this.repoDetails.length) {
      const repo = event.pop()?.data
      if (repo) {
        this._githubService.getRepoDetails(repo.owner.login, repo.name).subscribe((details) => {
          this.repoDetails = [...this.repoDetails, {
            id: repo.id,
            userId: repo.owner.id,
            user: repo.owner.login,
            totalCommits: details.commits,
            totalPullRequests: details.pullRequests,
            totalIssues: details.issues
          }];
          this._cdr.detectChanges()
        });
      }
    } else {
      this.repoDetails = this.repoDetails.filter((repo) => !!event.find((e) => e?.data.id === repo.id))
    }
  }

  showMessage(msg: string) {
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
    });
  }
}
