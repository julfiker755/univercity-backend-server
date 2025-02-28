import { Request, Response } from 'express';
import { StudentService } from './student.service';
import { StudentValidationSchema } from './student.validation';


const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
   
    // const zodParseData=StudentValidationSchema.parse(student)

    const result = await StudentService.createStudentBD(student);
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
  }
};


const getAllStudent=async(req: Request, res: Response)=>{
  try{
    const result=await StudentService.getAllStudentFromBD()
    res.status(200).json({
        success: true,
        message: 'Student is Info succesfully',
        data: result,
      });

  }catch(err:any){
   console.log(err)
  }
}

export const StudentController = {
  createStudent,
  getAllStudent
};
