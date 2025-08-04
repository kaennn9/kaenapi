const CLIENT_ID = '1088410431934185472';
const REDIRECT_URI = 'https://your-vercel-project.vercel.app/api/callback';

export default async function handler(req, res) {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
  res.redirect(url);
}
