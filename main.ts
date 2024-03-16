import { Activity, ActivityLite } from "./types/activity.ts";
import activitiesJson from "./docs/templates/activities.json" with {
  type: "json",
};

async function generateWeeklyReport(lastWeeksActivities: any[]) {
  const markDownData = await Deno.readFileSync(`./docs/templates/weekly.md`);
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();
  const markdownContent = decoder.decode(markDownData);

  const runningTableData = lastWeeksActivities.map((
    { startTimeGMT, distance },
  ) => ({
    startTimeGMT,
    distance: parseFloat((distance / 1000).toFixed(2)),
  }));

  const totalDistance = runningTableData.reduce(
    (total, item) => total + item.distance,
    0,
  );

  const updatedMarkdown = generateDistanceTableAndActivities(
    markdownContent,
    runningTableData,
    totalDistance,
    lastWeeksActivities,
  );

  await Deno.writeFileSync(
    "./docs/output/testing.md",
    encoder.encode(updatedMarkdown),
  );
}

function generateDistanceTableAndActivities(
  markdownContent: string,
  runningTableData: Array<{ startTimeGMT: string; distance: number }>,
  totalDistance: number,
  activities: ActivityLite[],
): string {
  let updatedMarkdown = generateDistanceTable(
    markdownContent,
    runningTableData,
    totalDistance,
  );

  updatedMarkdown = generateRunningTable(updatedMarkdown, activities);
  updatedMarkdown = generateWorkoutTable(updatedMarkdown, activities);
  return updatedMarkdown;
}

function generateDistanceTable(
  markdownContent: string,
  data: Array<{ startTimeGMT: string; distance: number }>,
  totalDistance: number,
): string {
  return markdownContent
    .replace(
      "{Monday}",
      `${(data.find((item) => new Date(item.startTimeGMT).getDay() === 1)
        ?.distance || 0)}`,
    )
    .replace(
      "{Tuesday}",
      `${(data.find((item) => new Date(item.startTimeGMT).getDay() === 2)
        ?.distance || 0)}`,
    )
    .replace(
      "{Wednesday}",
      `${(data.find((item) => new Date(item.startTimeGMT).getDay() === 3)
        ?.distance || 0)}`,
    )
    .replace(
      "{Thursday}",
      `${(data.find((item) => new Date(item.startTimeGMT).getDay() === 4)
        ?.distance || 0)}`,
    )
    .replace(
      "{Friday}",
      `${(data.find((item) => new Date(item.startTimeGMT).getDay() === 5)
        ?.distance || 0)}`,
    )
    .replace(
      "{Saturday}",
      `${(data.find((item) => new Date(item.startTimeGMT).getDay() === 6)
        ?.distance || 0)}`,
    )
    .replace(
      "{Sunday}",
      `${(data.find((item) => new Date(item.startTimeGMT).getDay() === 0)
        ?.distance || 0)}`,
    )
    .replace("{WeeklyTotal}", totalDistance.toString());
}

function generateRunningTable(
  markdownContent: string,
  activities: Activity[],
): string {
  let activitiesTable = "";

  activities.forEach((activity) => {
    // Check if the activity is of type "running"
    if (activity.activityType?.typeKey === "running") {
      activitiesTable += `| ${activity.activityName} | ${
        secondsToHHMMSS(activity.duration)
      } | ${activity.averageHR} | ${
        calculatePacePerKm(activity.distance, activity.duration)
      } | ${
        activity.averageRunningCadenceInStepsPerMinute?.toFixed(0) ?? "-"
      } | ${activity.avgVerticalOscillation?.toFixed(0) ?? "-"} | ${
        (activity.avgStrideLength / 100)?.toFixed(2) ?? "-"
      } | ${activity.avgGroundContactBalance?.toFixed(0) ?? "-"} |\n`;
    }
  });

  return markdownContent.replace("{activityTable}", activitiesTable);
}

function generateWorkoutTable(
  markdownContent: string,
  activities: Activity[],
): string {
  let exerciseTable = "";

  activities.forEach((activity) => {
    // Check if the activity is of type "strength_training"
    if (activity.activityType?.typeKey === "strength_training") {
      activity.summarizedExerciseSets?.forEach((exercise, index) => {
        if (index === 0) {
          exerciseTable += `| ${activity.activityName} | | | | |\n`;
        }

        exerciseTable +=
          `| | ${exercise.category} | ${exercise.sets} | ${exercise.reps} | ${exercise.volume} |\n`;
      });
    }
  });

  return markdownContent.replace("{exerciseTable}", exerciseTable);
}

function secondsToHHMMSS(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const remainingSeconds: number = seconds % 3600;
  const minutes: number = Math.floor(remainingSeconds / 60);
  const remainingSecondsAfterMinutes: number = Math.floor(
    remainingSeconds % 60,
  );

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours.toString().padStart(2, "0")}:`;
  }
  formattedTime += `${minutes.toString().padStart(2, "0")}:${
    remainingSecondsAfterMinutes.toString().padStart(2, "0")
  }`;
  return formattedTime;
}

function calculatePacePerKm(
  distanceMeters: number,
  timeSeconds: number,
): string {
  const distanceKm: number = distanceMeters / 1000; // Convert meters to kilometers
  const timeMinutesPerKm: number = timeSeconds / 60 / distanceKm; // Calculate minutes per kilometer
  const paceMinutes: number = Math.floor(timeMinutesPerKm); // Extract minutes
  const paceSeconds: number = Math.round((timeMinutesPerKm - paceMinutes) * 60);
  return `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`;
}

function filterActivitiesFromLastWeek(activities: any[]) {
  const today: Date = new Date();
  const lastWeekStartDate: Date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 6,
  );
  const lastWeekEndDate: Date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1,
  );
  const filteredItems: any[] = activities
    .filter((item) => {
      const itemTime: Date = new Date(item.startTimeGMT);
      return itemTime >= lastWeekStartDate && itemTime <= lastWeekEndDate;
    });

  return filteredItems;
}

function filterActivityProperties<T extends object>(
  array: T[],
  keysToPick: (keyof T)[],
): Partial<T>[] {
  return array.map((item) => {
    const newItem: Partial<T> = {};
    for (const key of keysToPick) {
      if (key in item) {
        newItem[key] = item[key];
      }
    }
    return newItem;
  });
}

async function main() {
  const activities: Activity[] = activitiesJson as Activity[];
  // const runningActivitiesToExtract: (keyof Activity)[] = [
  //   "activityId",
  //   "activityName",
  //   "duration",
  //   "distance",
  //   "averageHR",
  //   "averageSpeed",
  //   "averageRunningCadenceInStepsPerMinute",
  //   "avgVerticalOscillation",
  //   "avgStrideLength",
  //   "avgGroundContactBalance",
  //   "startTimeGMT",
  //   "summarizedExerciseSets",
  // ];

  // const filteredActivities: Partial<Activity>[] = filterActivityProperties(
  //   activities,
  //   runningActivitiesToExtract,
  // );
  const lastWeeksActivities = await filterActivitiesFromLastWeek(
    activities,
  );
  await generateWeeklyReport(lastWeeksActivities);
}

main().catch((error) => {
  console.log("An error occuredL ", error);
});
