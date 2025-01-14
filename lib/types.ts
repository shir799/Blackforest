export interface DamageDetails {
  type: 'chip' | 'crack' | 'replacement';
  location: string;
  size: string;
  vehicleType: string;
  manufacturer: string;
  model: string;
  year: string;
  hasInsurance: boolean;
  insuranceType?: 'partial' | 'full';
  description?: string;
}

export interface CostEstimate {
  minPrice: number;
  maxPrice: number;
  repairTime: string;
  recommendation: string;
  insuranceCoverage?: string;
}

