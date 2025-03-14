import QueryBuilder from "../../builder/queryBuilder";
import { AdminSearchableFields } from "./admin.constant";
import { AdminModel } from "./admin.model";



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

  export const adminService={
    getAllAdminsFromDB
  }