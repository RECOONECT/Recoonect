export default async (req) => {
  const { prenom, nom, email, pwd, type, refCode } = await req.json();
 const appUrl = 'https://recoonect-huu1rod1h-recoonect.vercel.app';
  const typeLabel = type === 'pro' ? 'Professionnel' : "Apporteur d'affaires";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(90deg,#16427c,#3995b5);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:white;font-size:26px;margin:0;">Recoonect</h1>
        <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;font-style:italic;">Votre réseau, votre succès</p>
      </div>
      <div style="background:#ffffff;padding:32px;border:1px solid #e0eaf4;border-radius:0 0 12px 12px;">
        <h2 style="color:#16427c;">Bienvenue ${prenom} !</h2>
        <p style="color:#4a6080;font-size:15px;line-height:1.6;">Votre compte Recoonect a été créé. Accédez à votre espace membre pour suivre vos gains et partager votre lien de parrainage.</p>
        <div style="background:#f5f8fb;border:1px solid #dce8f4;border-radius:10px;padding:20px;margin:20px 0;">
          <p style="margin:0 0 8px;font-size:13px;color:#6b87a8;font-weight:600;text-transform:uppercase;">Vos identifiants</p>
          <p style="margin:0 0 6px;color:#0e2a4e;"><strong>Email :</strong> ${email}</p>
          <p style="margin:0 0 6px;color:#0e2a4e;"><strong>Mot de passe :</strong> ${pwd}</p>
          <p style="margin:0;color:#0e2a4e;"><strong>Profil :</strong> ${typeLabel}</p>
        </div>
        <div style="background:#f5f8fb;border:1px solid #dce8f4;border-radius:10px;padding:20px;margin:20px 0;">
          <p style="margin:0 0 8px;font-size:13px;color:#6b87a8;font-weight:600;text-transform:uppercase;">Votre lien de parrainage</p>
          <p style="margin:0;font-size:13px;color:#16427c;font-family:monospace;">${appUrl}?ref=${refCode}</p>
        </div>
        <div style="text-align:center;margin:28px 0;">
          <a href="${appUrl}" style="background:linear-gradient(90deg,#16427c,#3995b5);color:white;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;">Accéder à mon espace →</a>
        </div>
      </div>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer re_4CZVGP6s_7NvHv5w9ky1yQeUQLsdbcL57',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Recoonect <noreply@recoonect.fr>',
      to: [email],
      subject: 'Bienvenue sur Recoonect — Vos identifiants',
      html
    })
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
};

export const config = { path: '/api/send-email' };
