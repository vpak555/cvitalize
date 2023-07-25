import GeneralInfoModel from "./GeneralInfoModel";

type PersonalDetailsModel = Omit<GeneralInfoModel, 'fullName' | 'jobTitle' | 'profile'>;

export default PersonalDetailsModel;