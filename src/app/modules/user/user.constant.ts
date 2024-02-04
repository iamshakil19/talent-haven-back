
import { IUserRole, TUserStatus } from "./user.interface";

export const userRole: IUserRole[] = ['systemAdmin', 'admin', 'user',];
export const userStatus: TUserStatus[] = ['active', 'inactive', 'suspend']

export const UserSearchableFields = [
    'plan',
];