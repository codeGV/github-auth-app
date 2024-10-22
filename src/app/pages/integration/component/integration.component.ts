import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../../services/github-integration.service';
import { ActivatedRoute } from '@angular/router';
import { Integration } from 'src/app/models/integration.model';
import { GitHubRepo, RepoDetails } from 'src/app/models/repo.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrationComponent implements OnInit {
  connected: boolean = false;
  integrationData$ = new BehaviorSubject<Integration | null>(null);
  repos: GitHubRepo[] = [];
  repoDetails: RepoDetails[] = [];
  currentPage: number = 1;
  totalPages: number = 2;
  pageSize: number = 10;
  gridApi:any;
  gridOptions:GridOptions = {
    pagination: true,
    paginationPageSize: 10,   
             
    // domLayout: 'autoHeight',
    rowModelType: 'serverSide',  
    cacheBlockSize: this.pageSize,
    paginationPageSizeSelector: [10, 20, 50, 100],
  };

  columnDefs: ColDef[] = [
    { field: 'repoId', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    {
      field: 'url',
      headerName: 'Link',
      cellRenderer: (params: any) => `<a href="${params.value}" target="_blank">${params.value}</a>`,
    },
    { field: 'owner', headerName: 'User' },
    { field: 'commits', headerName: 'Total Commits' },
    { field: 'pullRequests', headerName: 'Total Pull Requests' },
    { field: 'issues', headerName: 'Total Issues' },
    {
      field: 'include',
      headerName: 'Include',
      cellRenderer: (params: any) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = params.value;
        checkbox.addEventListener('change', () => {
          this.onRepoChecked(params.data);
        });
        return checkbox;
      },
    },
  ];


  constructor(
    private _githubService: GithubIntegrationService,
    private _actRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const githubId = this._actRoute.snapshot.queryParams['id'];
    if (githubId) {
      this.fetchIntegration(githubId);
    }
  }
  // onGridReady(params:any) {
  //   console.log('params::',params)
  //   this.gridApi = params.api;;
  // }

  
  onGridReady(params: any) {
    console.log('params::',params)
    this.gridApi = params.api;
    this.loadRepos(this.currentPage);
  }

  connect() {
    this._githubService.connectGithub();
  }

  fetchIntegration(githubId: string) {
    this._githubService.getIntegrationByGitHubId(githubId).subscribe(
      (data) => {
        this.connected = true;
        this.integrationData$.next(new Integration(data));
        this.loadRepos(this.currentPage);
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
      this.showMessage('Integration removed');
    });
  }

  // loadRepos(page: number) {
  //   this._githubService.getAllReposForOrgs(page, this.pageSize).subscribe((data) => {
  //     this.repos = data.repositories;
  //     this.totalPages = data.totalPages;
  //     this.currentPage = data.currentPage;
  //     this.gridApi.paginationSetRowCount(data.totalCount, false);
  //     this._cdr.detectChanges();
  //   });
  // }

    loadRepos(page: number) {
    this._githubService.getAllReposForOrgs(page, this.pageSize).subscribe((data) => {
      this.repos = data.repositories;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;

      if (this.gridApi) {
        this.gridApi.paginationSetRowCount(data.totalCount, false);
      }

      this._cdr.detectChanges();
    });
  }

  onRepoChecked(repo: GitHubRepo) {
    console.log('AG checkbox:', repo);
    const newIncludeStatus = !repo.include;
    this._githubService.toggleRepoInclude(repo._id, newIncludeStatus).subscribe(
      (data:GitHubRepo) => {
        this.showMessage(newIncludeStatus ? 'Repo included' : 'Repo excluded');
        const index = this.repos.findIndex(r => r._id === repo._id);
        if (index !== -1) {
          this.repos[index] = { ...data };
        }
        this._cdr.detectChanges();
      },
      (error) => {
        console.error('Error updating repo include status:', error);
        this.showMessage('Error updating repo include status');
      }
    );
  }

  showMessage(msg: string) {
    this._snackBar.open(msg, 'Ok', {
      duration: 3000,
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRepos(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepos(this.currentPage);
    }
  }
  onPaginationChanged(event:any){
    console.log('pagination event',event)

  }
}
