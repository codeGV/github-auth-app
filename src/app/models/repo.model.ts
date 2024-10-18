export class GitHubRepo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: string | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    permissions: Permission;
    security_and_analysis: SecurityAndAnalysis;
    include: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.node_id = data.node_id;
        this.name = data.name;
        this.full_name = data.full_name;
        this.private = data.private;
        this.owner = new Owner(data.owner);
        this.html_url = data.html_url;
        this.description = data.description;
        this.fork = data.fork;
        this.url = data.url;
        this.forks_url = data.forks_url;
        this.keys_url = data.keys_url;
        this.collaborators_url = data.collaborators_url;
        this.teams_url = data.teams_url;
        this.hooks_url = data.hooks_url;
        this.issue_events_url = data.issue_events_url;
        this.events_url = data.events_url;
        this.assignees_url = data.assignees_url;
        this.branches_url = data.branches_url;
        this.tags_url = data.tags_url;
        this.blobs_url = data.blobs_url;
        this.git_tags_url = data.git_tags_url;
        this.git_refs_url = data.git_refs_url;
        this.trees_url = data.trees_url;
        this.statuses_url = data.statuses_url;
        this.languages_url = data.languages_url;
        this.stargazers_url = data.stargazers_url;
        this.contributors_url = data.contributors_url;
        this.subscribers_url = data.subscribers_url;
        this.subscription_url = data.subscription_url;
        this.commits_url = data.commits_url;
        this.git_commits_url = data.git_commits_url;
        this.comments_url = data.comments_url;
        this.issue_comment_url = data.issue_comment_url;
        this.contents_url = data.contents_url;
        this.compare_url = data.compare_url;
        this.merges_url = data.merges_url;
        this.archive_url = data.archive_url;
        this.downloads_url = data.downloads_url;
        this.issues_url = data.issues_url;
        this.pulls_url = data.pulls_url;
        this.milestones_url = data.milestones_url;
        this.notifications_url = data.notifications_url;
        this.labels_url = data.labels_url;
        this.releases_url = data.releases_url;
        this.deployments_url = data.deployments_url;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.pushed_at = data.pushed_at;
        this.git_url = data.git_url;
        this.ssh_url = data.ssh_url;
        this.clone_url = data.clone_url;
        this.svn_url = data.svn_url;
        this.homepage = data.homepage;
        this.size = data.size;
        this.stargazers_count = data.stargazers_count;
        this.watchers_count = data.watchers_count;
        this.language = data.language;
        this.has_issues = data.has_issues;
        this.has_projects = data.has_projects;
        this.has_downloads = data.has_downloads;
        this.has_wiki = data.has_wiki;
        this.has_pages = data.has_pages;
        this.has_discussions = data.has_discussions;
        this.forks_count = data.forks_count;
        this.mirror_url = data.mirror_url;
        this.archived = data.archived;
        this.disabled = data.disabled;
        this.open_issues_count = data.open_issues_count;
        this.license = data.license;
        this.allow_forking = data.allow_forking;
        this.is_template = data.is_template;
        this.web_commit_signoff_required = data.web_commit_signoff_required;
        this.topics = data.topics;
        this.visibility = data.visibility;
        this.forks = data.forks;
        this.open_issues = data.open_issues;
        this.watchers = data.watchers;
        this.default_branch = data.default_branch;
        this.permissions = new Permission(data.permissions);
        this.security_and_analysis = new SecurityAndAnalysis(data.security_and_analysis);
        this.include = data.include || false;
    }
}

class Owner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;

    constructor(data: any) {
        this.login = data.login;
        this.id = data.id;
        this.node_id = data.node_id;
        this.avatar_url = data.avatar_url;
        this.gravatar_id = data.gravatar_id;
        this.url = data.url;
        this.html_url = data.html_url;
        this.followers_url = data.followers_url;
        this.following_url = data.following_url;
        this.gists_url = data.gists_url;
        this.starred_url = data.starred_url;
        this.subscriptions_url = data.subscriptions_url;
        this.organizations_url = data.organizations_url;
        this.repos_url = data.repos_url;
        this.events_url = data.events_url;
        this.received_events_url = data.received_events_url;
        this.type = data.type;
        this.site_admin = data.site_admin;
    }
}

class Permission {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;

    constructor(data: any) {
        this.admin = data.admin;
        this.maintain = data.maintain;
        this.push = data.push;
        this.triage = data.triage;
        this.pull = data.pull;
    }
}

class SecurityAndAnalysis {
    secret_scanning: SecurityStatus;
    secret_scanning_push_protection: SecurityStatus;
    dependabot_security_updates: SecurityStatus;
    secret_scanning_non_provider_patterns: SecurityStatus;
    secret_scanning_validity_checks: SecurityStatus;

    constructor(data: any) {
        this.secret_scanning = new SecurityStatus(data.secret_scanning);
        this.secret_scanning_push_protection = new SecurityStatus(data.secret_scanning_push_protection);
        this.dependabot_security_updates = new SecurityStatus(data.dependabot_security_updates);
        this.secret_scanning_non_provider_patterns = new SecurityStatus(data.secret_scanning_non_provider_patterns);
        this.secret_scanning_validity_checks = new SecurityStatus(data.secret_scanning_validity_checks);
    }
}

class SecurityStatus {
    status: string;

    constructor(data: any) {
        this.status = data.status;
    }
}

export interface RepoDetails {
    id:number;
    userId: number;
    user: string;
    totalCommits: number;
    totalPullRequests: number;
    totalIssues: number;
}
