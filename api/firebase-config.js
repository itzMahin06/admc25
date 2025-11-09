export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }));
}
