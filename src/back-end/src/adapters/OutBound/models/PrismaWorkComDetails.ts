import { WorkCompDetails as WorkCompDetailsModel } from "@prisma/client";
import PrismaWork from "@models/PrismaWork";

type PrismaWorkCompDetails = WorkCompDetailsModel & {
  work?: PrismaWork;
};
export default PrismaWorkCompDetails;
