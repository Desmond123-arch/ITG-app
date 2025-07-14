interface Company {
  employee_count: ReactNode;
  headquarters: ReactNode;
  employee_count: ReactNode;
  headquarters: ReactNode;
  id: number;
  user_id: number;
  uuid: string;
  company_name: string;
  company_email: string;
  company_logo: string;
  company_description: string;
  company_website_url?: string | null;
  founded?: string | null;
  industry?: string | null;
  specialties?: string[] | null;
}

export default Company