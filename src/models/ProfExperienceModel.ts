type ProfExperienceModel = {
  id: string;
  employer: string;
  jobTitle: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  description: string;
};

export default ProfExperienceModel;
