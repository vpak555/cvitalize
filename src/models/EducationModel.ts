type EducationModel = {
  id: string;
  school: string;
  degree: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  description: string;
};

export default EducationModel;
