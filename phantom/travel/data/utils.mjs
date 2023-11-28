import fs from "node:fs/promises";

const TRAVEL_JSON_PATH = "phantom/travel/data/travel.json";
const PCLOUD_PATH =
  "/home/vincentrolfs/pCloudDrive/Public Folder/travel-images";

export async function asyncMap(array, callback) {
  return await Promise.all(array.map(callback));
}

export async function deleteFileIfExists(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

export function getPcloudVisitPath(visit) {
  return `${PCLOUD_PATH}/${visit.tag}`;
}

export async function loadTravelData() {
  return JSON.parse(await fs.readFile(TRAVEL_JSON_PATH, { encoding: "utf8" }));
}

export async function writeTravelData(travelData) {
  travelData.forEach((visit) =>
    visit.images.sort((a, b) => comp(a.name, b.name))
  );
  travelData.sort((a, b) => comp(a.from, b.from));

  const travelString = JSON.stringify(travelData, null, 4);

  await fs.writeFile(TRAVEL_JSON_PATH, travelString);
}

function comp(a, b) {
  if (a < b) {
    return 1;
  }

  if (a > b) {
    return -1;
  }

  return 0;
}
