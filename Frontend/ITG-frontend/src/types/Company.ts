interface Company {
  id: number;
  user_id: number;
  company_uuid: string;
  company_name: string;
  company_email: string;
  company_logo: string;
  company_description: string;
  company_website_url?: string | null;
  year_founded: number;
  headquarters: string;
  employee_count: string;
  industry: string;
  specialties: string[];
  founder: string;
}

export default Company