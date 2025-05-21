export default interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    refreshToken: string | null;
    // metric: UserMetric;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}