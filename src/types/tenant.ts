export interface TenantBranding {
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  primaryDark: string;
  bgColor: string;
  surfaceColor: string;
  surfaceHighColor: string;
  textColor: string;
  textMutedColor: string;
  fontFamily: string;
  heroImageUrl: string;
  ogImageUrl: string;
}

export interface LandingConfig {
  headline: string;
  subheadline: string;
  ctaText: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  testimonials: {
    name: string;
    avatar: string;
    quote: string;
    role: string;
  }[];
  showSocialProof: boolean;
  socialProofCount: number;
}

export interface QuizConfig {
  questions: {
    id: string;
    type: "single" | "multiple" | "scale" | "input";
    question: string;
    description?: string;
    options?: {
      value: string;
      label: string;
      icon?: string;
    }[];
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    required: boolean;
  }[];
  progressStyle: "bar" | "dots" | "fraction";
  allowSkip: boolean;
}

export interface PricingConfig {
  plans: {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year" | "one-time";
    features: string[];
    highlighted: boolean;
    ctaText: string;
    trialDays: number;
  }[];
  showComparison: boolean;
  showGuarantee: boolean;
  guaranteeText: string;
}

export interface AssessmentConfig {
  includeTimeGoal: boolean;
  includeDistanceGoal: boolean;
  includeInjuryHistory: boolean;
  includeTrainingHistory: boolean;
  includeAvailability: boolean;
  maxWeeklyDays: number;
  minWeeklyDays: number;
}

export interface GoalConfig {
  availableDistances: string[];
  availableGoalTypes: ("time" | "finish" | "pr" | "health" | "custom")[];
  maxGoalDuration: number;
  minGoalDuration: number;
}

export interface AIConfig {
  provider: string;
  model: string;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  features: {
    planGeneration: boolean;
    chatCoaching: boolean;
    performanceAnalysis: boolean;
    injuryPrevention: boolean;
  };
}

export interface CommunityConfig {
  enabled: boolean;
  features: {
    leaderboard: boolean;
    challenges: boolean;
    forum: boolean;
    groupRuns: boolean;
  };
  defaultVisibility: "public" | "members" | "private";
}

export interface PaymentConfig {
  provider: "stripe" | "mercadopago" | "both";
  stripePublicKey?: string;
  mercadoPagoPublicKey?: string;
  currency: string;
  locale: string;
  allowCoupons: boolean;
}

export interface TenantConfig {
  id: string;
  slug: string;
  name: string;
  domain?: string;
  status: "active" | "inactive" | "trial";
  branding: TenantBranding;
  landing: LandingConfig;
  quiz: QuizConfig;
  pricing: PricingConfig;
  assessment: AssessmentConfig;
  goals: GoalConfig;
  ai: AIConfig;
  community: CommunityConfig;
  payment: PaymentConfig;
  createdAt: string;
  updatedAt: string;
}
