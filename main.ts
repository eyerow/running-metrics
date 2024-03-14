import { Activity } from "./types/activity.ts";
import activitiesJson from './docs/output/activities.json' with { type: 'json' };

const activities: Activity[] = activitiesJson as Activity[];
const runningActivitiesToExtract: (keyof Activity)[] = [
  "activityId",
  "activityName",
  "duration",
  "distance",
  "averageHR",
  "averageSpeed",
  "averageRunningCadenceInStepsPerMinute",
  "avgVerticalOscillation",
  "avgStrideLength",
  "avgGroundContactBalance",
  "startTimeGMT",
];

function writeJson(path: string, data: object): string {
  try {
    Deno.writeTextFileSync(`./docs/output/md/${path}.json`, JSON.stringify(data));

    return "Written to " + path;
  } catch (e) {
    return e.message;
  }
}

async function generateWeeklyReport(data:any[]){
  const markDowndata = await Deno.readFileSync(`./docs/templates/weekly.md`);
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder()
  const markdownContent = decoder.decode(markDowndata);

  const totalDistance = data.reduce((total, item)=> total +item.distance, 0)
  const updateMarkdown = markdownContent
  .replace("{Monday}", `${(data.find(item => new Date(item.startTimeGMT).getDay() === 1)?.distance || 0)}`)
  .replace("{Tuesday}", `${(data.find(item => new Date(item.startTimeGMT).getDay() === 2)?.distance || 0)}`)
  .replace("{Wednesday}", `${(data.find(item => new Date(item.startTimeGMT).getDay() === 3)?.distance || 0)}`)
  .replace("{Thursday}", `${(data.find(item => new Date(item.startTimeGMT).getDay() === 4)?.distance || 0)}`)
  .replace("{Friday}", `${(data.find(item => new Date(item.startTimeGMT).getDay() === 5)?.distance || 0)}`)
  .replace("{Saturday}", `${(data.find(item => new Date(item.startTimeGMT).getDay() === 6)?.distance || 0)}`)
  .replace("{Sunday}", `${(data.find(item => new Date(item.startTimeGMT).getDay() === 0)?.distance || 0)}`)
  .replace('{WeeklyTotal}', totalDistance);


 await Deno.writeFileSync('./docs/output/md/testing.md', encoder.encode(updateMarkdown)); 

}

function filterActivitiesFromLastWeek(activities: any[]){
   const today: Date = new Date();
    const lastWeekStartDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
    const lastWeekEndDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1 );
    const filteredItems: any[] = activities
      .filter(item => {
          const itemTime: Date = new Date(item.startTimeGMT);
          return itemTime >= lastWeekStartDate && itemTime <= lastWeekEndDate;
      })
    
    return filteredItems;
}

function filterActivityProperties<T extends object>(
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




const filteredActivities=filterActivityProperties(activities, runningActivitiesToExtract)
const lastWeeksActivities = await filterActivitiesFromLastWeek(filteredActivities)
const forMarkdown = lastWeeksActivities.map(({ startTimeGMT, distance }) => ({
    startTimeGMT,
    distance: parseFloat((distance / 1000).toFixed(2))
}))

writeJson('weekly-report',lastWeeksActivities);
await generateWeeklyReport(forMarkdown)