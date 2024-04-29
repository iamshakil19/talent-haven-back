
import { IUserRole, TUserStatus } from "./user.interface";

export const userRole: IUserRole[] = ['system-admin', 'candidate', 'employer'];
export const userStatus: TUserStatus[] = ['active', 'inactive', 'suspend']

export const UserSearchableFields = [
    'plan',
];