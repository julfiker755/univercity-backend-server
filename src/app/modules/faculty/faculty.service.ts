import QueryBuilder from "../../builder/queryBuilder";
import { AdminSearchableFields } from "../admin/admin.constant";
import { FacultyModel } from "./faculty.model";




const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
    const facultyQuery = new QueryBuilder(
      FacultyModel.find(),
      query,
    )
      .search(AdminSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await facultyQuery.modelQuery;
    return result;
  };

  const getSingleFacultyFromDB = async (id: string) => {
    const result = await FacultyModel.findById(id);
  
    return result;
  };

  export const facultyService = {
    getAllFacultiesFromDB,
    getSingleFacultyFromDB
  };
  