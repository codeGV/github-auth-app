


export interface GitHubRepo {
    commits: number;
    include: boolean;
    issues: number;
    name: string;
    pullRequests: number;
    repoId: string;
    url: string;
    owner: number;
    orgId: {
        name: string;
        url: string;
    };
    _id: string;
}
