export interface ResumeData {
    firstName: '';
    lastName: '';
    email: '';
    phone: '';
    skills: string[];
    workHistory: WorkplaceData[];
}

export interface WorkplaceData {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string; 
}