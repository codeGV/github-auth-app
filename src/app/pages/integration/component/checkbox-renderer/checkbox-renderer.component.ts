import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs';
import { GithubIntegrationService } from 'src/app/services/github-integration.service';

@Component({
  selector: 'app-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html',
  styleUrls: ['./checkbox-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxRendererComponent {
  public params: any;

  constructor(private _githubService: GithubIntegrationService) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onCheckboxChanged(event: any): void {
    const checked = event.target.checked;
    const rowData = this.params.data;
    rowData.include = checked;

    this._githubService
      .toggleRepoInclude(rowData._id, checked)
      .pipe(take(1))
      .subscribe(
        (updatedData: any) => {
          if (checked && updatedData) {
            rowData.commits = updatedData.commits;
            rowData.issues = updatedData.issues;
            rowData.pullRequests = updatedData.pullRequests;
          } else {
            rowData.commits = 0;
            rowData.issues = 0;
            rowData.pullRequests = 0;
          }

          this.params.api.refreshCells({ rowNodes: [this.params.node] });
        },
        (error: any) => {
          console.error('Error fetching additional data:', error);
        }
      );
  }
}
