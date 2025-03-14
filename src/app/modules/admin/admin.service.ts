import QueryBuilder from '../../builder/queryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { AdminModel } from './admin.model';

// getAllAdminsFromDB
const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

// getSingleAdminDB
const getSingleAdminDB = async (id: string) => {
  const result = await AdminModel.findById(id).populate(
    'user',
    'id needsPasswordChange role status isDeleted',
  );
  return result;
};

export const adminService = {
  getAllAdminsFromDB,
  getSingleAdminDB,
};
