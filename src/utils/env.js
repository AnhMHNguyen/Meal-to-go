const liveHost = "https://us-central1-mealstogo-4ff73.cloudfunctions.net";
const localHost = "http://localhost:5001/mealstogo-4ff73/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";

// export const host = isDevelopment ? localHost : liveHost;
export const host = liveHost;