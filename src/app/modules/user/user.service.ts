import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: Partial<IUser>): Promise<IUser | null> => {
  const result = await User.create(payload);
  if (result) {
    const userWithoutPassword = await User.findById(result._id).select(
      '-password',
    );
    return userWithoutPassword as IUser;
  }
  return null;
};

const getAllUser = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().populate('profile'), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

export const UserService = {
  createUser,
  getAllUser,
};
