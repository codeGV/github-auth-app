export class Integration {
    githubId: string;
    username: string;
    accessToken: string;
    avatar_url: string;
    site_admin: string;
    type: string;
    url: string;
    connectedAt: Date;

    constructor(data: any) {
        this.githubId = data.githubId;
        this.username = data.username;
        this.accessToken = data.accessToken;
        this.connectedAt = data.connectedAt;
        this.avatar_url = data.v;
        this.site_admin = data.site_admin;
        this.type = data.type;
        this.url = data.url;
    }
}
