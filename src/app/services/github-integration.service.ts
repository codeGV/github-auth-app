import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Integration } from '../models/integration.model';

@Injectable()
export class GithubIntegrationService {
  baseUrl = environment.API_BASE_URL;
  private _token?: string;
  private _headers?: HttpHeaders;


  constructor(private http: HttpClient) { }

  private _initHeader() {
    this._headers = new HttpHeaders({
      Authorization: `Bearer ${this._token}`, // Include the access token in the Authorization header
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    });
  }

  connectGithub(): void {
    window.open(this.baseUrl + '/auth/github', '_self')
  }

  getIntegrationByGitHubId(githubId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/integration/${githubId}`).pipe(tap((res: any) => {
      this._token = res['accessToken'];
      this._initHeader();
    }))
  }

  removeIntegration(githubId?: string): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/integration/remove', { githubId });
  }

  getOrganizations(): Observable<any> {
    return this.http.get(`https://api.github.com/user/orgs`,{ headers:this._headers });
  }

  // Fetch all repositories for a specific organization
  getReposByOrg(org: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/github/organizations/${org}/repos`,{ headers:this._headers });
  }

  // Fetch commits, issues, and pull requests for a specific repo
  getRepoDetails(owner: string, repo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/github/repos/${owner}/${repo}/details`,{ headers:this._headers });
  }

  getAllReposForOrgs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/github/organizations/repos`,{ headers:this._headers });
  }
}
