import getData from "../getData";

let data: Record<string, string>[] | null = null;

// To avoid nextjs fetching the sheet data on every render (~1-2s) we cache it
export const getCachedData = async (sheetId: string) => {
  if (data) {
    return data;
  }
  data = await getData(sheetId);
  setTimeout(() => {
    data = null
  }, 360_000);
  return data;
};
