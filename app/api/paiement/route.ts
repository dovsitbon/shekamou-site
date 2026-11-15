import site from "@/data/site.json";

// Paiement en ligne de la commande à emporter, prévu mais désactivé : data/site.json → payment.enabled = false.
// Pour l'activer plus tard :
//  1. npm install stripe ;
//  2. sur Vercel : STRIPE_SECRET_KEY ;
//  3. passer payment.enabled à true, décommenter le bloc ci-dessous et ajouter un bouton « Payer en ligne »
//     dans components/Forms.tsx (OrderForm) qui appelle cette route avec le montant de la commande.
// Tant que c'est désactivé, la route répond 404 et aucun bouton de paiement n'apparaît sur le site.

export async function POST(req: Request) {
  if (!site.payment.enabled || !process.env.STRIPE_SECRET_KEY) return Response.json({ ok: false, reason: "disabled" }, { status: 404 });
  const { amount } = (await req.json().catch(() => ({}))) as { amount?: number };
  if (!amount || amount < 1 || amount > 500) return Response.json({ ok: false }, { status: 400 });
  // const Stripe = (await import("stripe")).default;
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   line_items: [{ price_data: { currency: "eur", unit_amount: Math.round(amount * 100), product_data: { name: "Commande à emporter Shekamou" } }, quantity: 1 }],
  //   success_url: `${site.url}/fr/commander?paiement=merci`,
  //   cancel_url: `${site.url}/fr/commander`,
  // });
  // return Response.json({ ok: true, url: session.url });
  return Response.json({ ok: false, reason: "not-implemented" }, { status: 501 });
}
