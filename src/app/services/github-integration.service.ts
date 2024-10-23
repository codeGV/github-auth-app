import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GitHubRepo } from '../models/repo.model';

@Injectable()
export class GithubIntegrationService {
  baseUrl = environment.API_BASE_URL;
  private _token?: string;
  private _headers?: HttpHeaders;

  constructor(private http: HttpClient) {}

  private _initHeader() {
    this._headers = new HttpHeaders({
      Authorization: `Bearer ${this._token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    });
  }

  connectGithub(): void {
    window.open(this.baseUrl + '/auth/github', '_self');
  }

  getIntegrationByGitHubId(githubId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/integration/${githubId}`).pipe(
      tap((res: any) => {
        this._token = res['accessToken'];
        this._initHeader();
      })
    );
  }

  removeIntegration(githubId?: string): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/integration/remove', {
      githubId,
    });
  }

  getAllReposForOrgs(
    page: number = 1,
    limit: number = 10
  ): Observable<{
    repositories: GitHubRepo[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
  }> {
    const params = new HttpParams().set('page', page).set('limit', limit);

    return this.http.get<{
      repositories: GitHubRepo[];
      totalPages: number;
      currentPage: number;
      totalCount: number;
    }>(`${this.baseUrl}/github/organizations/repos`, {
      params,
      headers: this._headers,
    });
  }

  toggleRepoInclude(repoId: string, include: boolean): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/github/repos/toggleInclude`,
      { repoId, include },
      { headers: this._headers }
    );
  }
}
