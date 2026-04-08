export interface AthleteProfile {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer-not-to-say";
  weight?: number;
  weightUnit?: "kg" | "lbs";
  height?: number;
  heightUnit?: "cm" | "in";
  location?: string;
  timezone?: string;
}

export interface AssessmentData {
  experienceLevel: "beginner" | "intermediate" | "advanced" | "elite";
  weeklyMileage: number;
  mileageUnit: "km" | "mi";
  recentRaceTimes: {
    distance: string;
    time: string;
    date: string;
  }[];
  injuryHistory: {
    type: string;
    bodyPart: string;
    severity: "mild" | "moderate" | "severe";
    recoveredAt?: string;
    notes?: string;
  }[];
  availableDays: string[];
  preferredRunTime: "morning" | "afternoon" | "evening" | "flexible";
  maxSessionDuration: number;
  hasGpsWatch: boolean;
  watchBrand?: string;
  crossTraining: string[];
}

export interface GoalData {
  type: "time" | "finish" | "pr" | "health" | "custom";
  distance: string;
  targetTime?: string;
  targetDate: string;
  raceName?: string;
  raceLocation?: string;
  priority: "primary" | "secondary";
  notes?: string;
}

export interface Athlete {
  id: string;
  tenantId: string;
  profile: AthleteProfile;
  assessment: AssessmentData;
  goals: GoalData[];
  subscriptionStatus: "active" | "trial" | "expired" | "cancelled";
  subscriptionPlanId?: string;
  stripeCustomerId?: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
