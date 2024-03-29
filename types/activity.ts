export interface Activity {
  activityId: number;
  activityName: string;
  description: null;
  startTimeLocal: string;
  startTimeGMT: string;
  activityType: ActivityType;
  eventType: EventType;
  comments: null;
  parentId: null;
  distance: number;
  duration: number;
  elapsedDuration: number;
  movingDuration: number;
  elevationGain: number;
  elevationLoss: number;
  averageSpeed: number;
  maxSpeed: number;
  startLatitude: number;
  startLongitude: number;
  hasPolyline: boolean;
  ownerId: number;
  ownerDisplayName: string;
  ownerFullName: string;
  ownerProfileImageUrlSmall: string;
  ownerProfileImageUrlMedium: string;
  ownerProfileImageUrlLarge: string;
  calories: number;
  bmrCalories: number;
  averageHR: number;
  maxHR: number;
  averageRunningCadenceInStepsPerMinute: number;
  maxRunningCadenceInStepsPerMinute: number;
  maxLapAvgRunCadence: null;
  averageBikingCadenceInRevPerMinute: null;
  maxBikingCadenceInRevPerMinute: null;
  averageSwimCadenceInStrokesPerMinute: null;
  maxSwimCadenceInStrokesPerMinute: null;
  averageSwolf: null;
  activeLengths: null;
  steps: number;
  conversationUuid: null;
  conversationPk: null;
  numberOfActivityLikes: null;
  numberOfActivityComments: null;
  likedByUser: null;
  commentedByUser: null;
  activityLikeDisplayNames: null;
  activityLikeFullNames: null;
  activityLikeProfileImageUrls: null;
  requestorRelationship: null;
  userRoles: string[];
  privacy: Privacy;
  userPro: boolean;
  courseId: null;
  poolLength: null;
  unitOfPoolLength: null;
  hasVideo: boolean;
  videoUrl: null;
  timeZoneId: number;
  beginTimestamp: number;
  sportTypeId: number;
  avgPower: null;
  maxPower: null;
  aerobicTrainingEffect: number;
  anaerobicTrainingEffect: number;
  strokes: null;
  normPower: null;
  leftBalance: null;
  rightBalance: null;
  avgLeftBalance: null;
  max20MinPower: null;
  avgVerticalOscillation: number;
  avgGroundContactTime: number;
  avgStrideLength: number;
  avgFractionalCadence: null;
  maxFractionalCadence: null;
  trainingStressScore: null;
  intensityFactor: null;
  vO2MaxValue: number;
  avgVerticalRatio: number;
  avgGroundContactBalance: number;
  lactateThresholdBpm: null;
  lactateThresholdSpeed: null;
  maxFtp: null;
  avgStrokeDistance: null;
  avgStrokeCadence: null;
  maxStrokeCadence: null;
  workoutId: null;
  avgStrokes: null;
  minStrokes: null;
  deviceId: number;
  minTemperature: number;
  maxTemperature: number;
  minElevation: number;
  maxElevation: number;
  avgDoubleCadence: null;
  maxDoubleCadence: number;
  summarizedExerciseSets: ExerciseSetLite[];
  maxDepth: null;
  avgDepth: null;
  surfaceInterval: null;
  startN2: null;
  endN2: null;
  startCns: null;
  endCns: null;
  summarizedDiveInfo: SummarizedDiveInfo;
  activityLikeAuthors: null;
  avgVerticalSpeed: null;
  maxVerticalSpeed: number;
  floorsClimbed: null;
  floorsDescended: null;
  manufacturer: string;
  diveNumber: null;
  locationName: string;
  bottomTime: null;
  lapCount: number;
  endLatitude: number;
  endLongitude: number;
  minAirSpeed: null;
  maxAirSpeed: null;
  avgAirSpeed: null;
  avgWindYawAngle: null;
  minCda: null;
  maxCda: null;
  avgCda: null;
  avgWattsPerCda: null;
  flow: null;
  grit: null;
  jumpCount: null;
  caloriesEstimated: null;
  caloriesConsumed: null;
  waterEstimated: number;
  waterConsumed: null;
  maxAvgPower_1: null;
  maxAvgPower_2: null;
  maxAvgPower_5: null;
  maxAvgPower_10: null;
  maxAvgPower_20: null;
  maxAvgPower_30: null;
  maxAvgPower_60: null;
  maxAvgPower_120: null;
  maxAvgPower_300: null;
  maxAvgPower_600: null;
  maxAvgPower_1200: null;
  maxAvgPower_1800: null;
  maxAvgPower_3600: null;
  maxAvgPower_7200: null;
  maxAvgPower_18000: null;
  excludeFromPowerCurveReports: null;
  totalSets: null;
  activeSets: null;
  totalReps: null;
  minRespirationRate: null;
  maxRespirationRate: null;
  avgRespirationRate: null;
  trainingEffectLabel: string;
  activityTrainingLoad: number;
  avgFlow: null;
  avgGrit: null;
  minActivityLapDuration: number;
  avgStress: null;
  startStress: null;
  endStress: null;
  differenceStress: null;
  maxStress: null;
  aerobicTrainingEffectMessage: string;
  anaerobicTrainingEffectMessage: string;
  splitSummaries: SplitSummary[];
  hasSplits: boolean;
  moderateIntensityMinutes: number;
  vigorousIntensityMinutes: number;
  maxBottomTime: null;
  hasSeedFirstbeatProfile: null;
  calendarEventId: null;
  calendarEventUuid: null;
  groupRideUUID: null;
  avgGradeAdjustedSpeed: null;
  avgWheelchairCadence: null;
  maxWheelchairCadence: null;
  avgJumpRopeCadence: null;
  maxJumpRopeCadence: null;
  gameName: null;
  differenceBodyBattery: null;
  gameType: null;
  curatedCourseId: null;
  matchedCuratedCourseId: null;
  pr: boolean;
  parent: boolean;
  favorite: boolean;
  decoDive: boolean;
  purposeful: boolean;
  autoCalcCalories: boolean;
  elevationCorrected: boolean;
  atpActivity: boolean;
  manualActivity: boolean;
}

export interface ActivityType {
  typeId: number;
  typeKey: string;
  parentTypeId: number;
  isHidden: boolean;
  restricted: boolean;
  trimmable: boolean;
}

export interface EventType {
  typeId: number;
  typeKey: string;
  sortOrder: number;
}

export interface Privacy {
  typeId: number;
  typeKey: string;
}

export interface SplitSummary {
  noOfSplits: number;
  maxGradeValue: null;
  totalAscent: number;
  duration: number;
  splitType: string;
  numClimbSends: number;
  maxElevationGain: number;
  averageElevationGain: number;
  maxDistance: number;
  distance: number;
  averageSpeed: number;
  maxSpeed: number;
  mode: null;
  numFalls: number;
  avgStress: null;
  avgStressWin: null;
  avgStressLoss: null;
  avgStressDraw: null;
  gamesWon: null;
  gamesNotWon: null;
  gamesAverageWon: null;
  elevationLoss: number;
}

export interface SummarizedDiveInfo {
  weight: null;
  weightUnit: null;
  visibility: null;
  visibilityUnit: null;
  surfaceCondition: null;
  current: null;
  waterType: null;
  waterDensity: null;
  summarizedDiveGases: any[];
  totalSurfaceTime: null;
}

export interface ActivityLite {
  activityId: number;
  activityName: string;
  averageHR: number;
  averageRunningCadenceInStepsPerMinute: number;
  averageSpeed: number;
  avgGroundContactBalance: number | null;
  avgStrideLength: number;
  avgVerticalOscillation: number | null;
  distance: number;
  duration: number;
  startTimeGMT: string;
  summarizedExerciseSets: ExerciseSetLite[];
}

export interface ExerciseSetLite {
  category: string;
  subCategory: string;
  reps: number;
  volume: number;
  duration: number;
  sets: number;
}
