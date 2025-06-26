export interface UserPortfolio {
  backgroundImage: string;
  profileImage: string;
  profile: {
    name: string;
    position: string;
    description: string;
  };
  portfolios: PortfolioItem[];
}

export interface PortfolioItem {
  name: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface DatePickerFieldProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  id?: string;
}