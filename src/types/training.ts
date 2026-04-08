export interface ZoneData {
  zone: number;
  name: string;
  minPace: string;
  maxPace: string;
  minHr?: number;
  maxHr?: number;
  description: string;
}

export interface PaceZones {
  unit: "min/km" | "min/mi";
  zones: ZoneData[];
  vdot?: number;
  estimatedAt: string;
}

export interface TrainingSession {
  id: string;
  weekNumber: number;
  dayOfWeek: number;
  date: string;
  type:
    | "easy"
    | "tempo"
    | "interval"
    | "long"
    | "recovery"
    | "race-pace"
    | "hills"
    | "fartlek"
    | "cross-training"
    | "rest";
  title: string;
  description: string;
  targetDistance?: number;
  targetDuration?: number;
  targetPaceZone?: number;
  warmup?: {
    distance?: number;
    duration?: number;
    description: string;
  };
  mainSet?: {
    repeats?: number;
    distance?: number;
    duration?: number;
    restDuration?: number;
    paceZone: number;
    description: string;
  }[];
  cooldown?: {
    distance?: number;
    duration?: number;
    description: string;
  };
  notes?: string;
  completed: boolean;
  completedAt?: string;
  actualDistance?: number;
  actualDuration?: number;
  actualPace?: string;
  averageHr?: number;
  perceivedEffort?: number;
  athleteFeedback?: string;
}

export interface TrainingWeek {
  weekNumber: number;
  phase: "base" | "build" | "peak" | "taper" | "recovery";
  totalDistance: number;
  sessions: TrainingSession[];
  notes?: string;
}

export interface TrainingPlan {
  id: string;
  athleteId: string;
  tenantId: string;
  goalId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  paceZones: PaceZones;
  weeks: TrainingWeek[];
  status: "active" | "completed" | "paused" | "cancelled";
  generatedBy: string;
  generatedAt: string;
  lastModifiedAt: string;
  adjustmentHistory: {
    date: string;
    reason: string;
    changes: string;
  }[];
}
