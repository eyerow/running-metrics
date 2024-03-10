import { Activity } from "./types/activity.ts";
import activitiesJson from './docs/output/activities.json' with { type: 'json' };

const activities: Activity[] = activitiesJson as Activity[];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getThisWeek(): {start:Date, end:Date}{
  const today = new Date()
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    start: startOfWeek,
    end: endOfWeek,
  };
}

function customPickBy<T extends object>(
  array: T[],
  keysToPick: (keyof T)[]
): Partial<T>[] {
  return array.map(item => {
    const newItem: Partial<T> = {};
    for (const key of keysToPick) {
      if (key in item) {
        newItem[key] = item[key];
      }
    }
    return newItem;
  });
}

function getWeeklySum(activities:Activity[]) {
  // Calculate the weekly sum using reduce
  const weeklySum = activities.reduce((total, activity) => total + activity.distance, 0);

  return weeklySum;
}

function getEachDaysDistance(activities:any[]){
  const { start, end } = getThisWeek();

  const dailyDistances = [
    { dayOfWeek: 'Monday', date: start.toISOString().substring(0, 10), distance: 0 },
    { dayOfWeek: 'Tuesday', date: addDays(start, 1).toISOString().substring(0, 10), distance: 0 },
    { dayOfWeek: 'Wednesday', date: addDays(start, 2).toISOString().substring(0, 10), distance: 0 },
    { dayOfWeek: 'Thursday', date: addDays(start, 3).toISOString().substring(0, 10), distance: 0 },
    { dayOfWeek: 'Friday', date: addDays(start, 4).toISOString().substring(0, 10), distance: 0 },
    { dayOfWeek: 'Saturday', date: addDays(start, 5).toISOString().substring(0, 10), distance: 0 },
    { dayOfWeek: 'Sunday', date: end.toISOString().substring(0, 10), distance: 0 }
  ];
  activities.forEach((activity:Activity) => {
    const activityDate = new Date(activity.startTimeGMT); // Assuming startTimeGMT is a valid Date object or ISO string
    const dateString = activityDate.toISOString().substring(0, 10); // Extracting the date string in 'yyyy-MM-dd' format
    const index = dailyDistances.findIndex(d => d.date === dateString);
    if (index !== -1) {
      dailyDistances[index].distance += activity.distance / 1000; // Convert meters to kilometers
    }
  });


  dailyDistances.forEach(day => {
    day.distance = parseFloat(day.distance.toFixed(2));
  });
  return dailyDistances
}

const runningActivityToExtract: (keyof Activity)[] = [
  "activityId",
  "activityName",
  "startTimeGMT",
  "duration",
  "averageHR",
  "maxHR",
  "distance"
];
console.log(customPickBy(activities, runningActivityToExtract))
console.log(getEachDaysDistance(activities))

