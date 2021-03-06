import { Honorific, Gender, AccessLevel } from '../../models/enums';

export const emptyPractitioner = {
  id: '',
  honorific: Honorific.NoTitle,
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
  countryCode: '',
  homePhone: '',
  mobilePhone: '',
  gender: Gender.other,
  profession: '',
  jobLevel: '',
  accessLevel: AccessLevel.normal,
  clinicId: ''
};

export const emptySubjective = {
  moi: '',
  currentHistory: '',
  bodyChart: '',
  aggravatingFactors: '',
  easingFactors: '',
  vas: 0,
  pastHistory: '',
  socialHistory: '',
  imaging: '',
  generalHealth: ''
};

export const emptyObjective = {
  observation: '',
  active: '',
  passive: '',
  resistedIsometric: '',
  functionalTests: '',
  neurologicalTests: '',
  specialTests: '',
  palpation: '',
  additional: ''
};
