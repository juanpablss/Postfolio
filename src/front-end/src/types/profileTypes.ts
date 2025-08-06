export interface Technology {
  id: string;
  name: string;
  iconUrl?: string;
}

export interface ContactLink {
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'behance' | 'portfolio' | 'other';
  value: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  projectUrl?: string;
  technologiesUsed?: Technology[];
}

export interface BaseUserProfile {
  userId: string;
  username: string;
  fullName: string;
  profilePictureUrl?: string;
  coverImageUrl?: string;
  location?: string;
}

export interface FreelancerProfileData extends BaseUserProfile {
  userType: 'freelancer';
  bio?: string;
  title?: string;
  availableForWork: boolean;
  technologies: Technology[];
  contactLinks: ContactLink[];
  projects?: Project[];
}

export interface EmployerProfileData extends BaseUserProfile {
  userType: 'employer';
  companyName?: string;
  companyWebsite?: string;
  companyLogoUrl?: string;
  aboutCompany?: string;
}

export type UserProfileData = FreelancerProfileData | EmployerProfileData;
