const CLIENT_ID = '1088410431934185472';
const CLIENT_SECRET = 'K0qrUAX2eoWitRSHR3VKD-umap5NoEhK';
const REDIRECT_URI = 'https://your-vercel-project.vercel.app/api/callback';

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).send('❌ لا يوجد كود تسجيل الدخول');

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('scope', 'identify');

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  const tokenData = await tokenRes.json();
  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const user = await userRes.json();
  res.setHeader('Content-Type', 'text/html');
  res.write(`<h1>مرحبًا ${user.username}#${user.discriminator}</h1>`);
  res.write(`<img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" width="100" />`);
  res.write(`<p>ID: ${user.id}</p>`);
  res.write(`<p>ربط ناجح 🎉</p>`);
  res.end();
}
