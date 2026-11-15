# Shekamou : infos à demander au gérant

Tout ce qui manque pour finir le site. Chaque réponse se range dans un fichier précis (indiqué entre parenthèses), puis on republie.

## Le café et son histoire
- [ ] **Son prénom**, et qui fait quoi (barista, cuisine) : pour la page « Café iranien » et les mentions légales (`locales/*.json`, `data/site.json → legal.director`).
- [ ] **L'histoire du café et du nom « Shekamou »** : en persan, *shekamou* (شکمو) veut dire « gourmand » ; le site s'appuie déjà dessus (« Le café des gourmands »). Le confirmer et, s'il le veut, raconter pourquoi ce nom en deux ou trois phrases.
- [ ] **Date d'ouverture** : février 2025 d'après specialtycoffee.paris, à confirmer.

## La carte et les prix (`data/carte.json`)
- [ ] **La carte complète et tous les prix.** Connus pour l'instant (à confirmer) : espresso 3 €, americano 3,90 €, cappuccino 5,20 €, latte 5,20 €, flat white 5,90 €, chai latte 6,90 €, thé 3,90 €, matcha latte 5,90 €, Pastrami 12,90 €, Jambon de poulet 8,90 €, Tuna 8,90 €, Bandari 9,90 €. Tout le reste affiche « prix en boutique ».
- [ ] Ube latte, matcha mangue, smoothies, jus : prix et tailles.
- [ ] Brunch : composition exacte et prix (petit-déjeuner anglais, œufs bacon avocat, assiette brunch…). Y a-t-il une formule ?
- [ ] Plats iraniens : âsh-e reshteh tous les jours ou certains jours ? Haleem bien le samedi et le dimanche ? Quelle viande dans le haleem ? Le sandwich kalbas est-il toujours à la carte ? D'autres plats (sholeh zard, kuku, adas polo…) ?
- [ ] Laits végétaux proposés (avoine, amande, soja…) et supplément éventuel.
- [ ] Options vegan réelles.
- [ ] Viande halal ou non (le menu mentionne du bacon de dinde ou de porc) : le site n'en parle pas pour l'instant.

## Commandes et plateaux
- [ ] **Commande à emporter** : délai de préparation minimum (réglé sur 20 min, `data/site.json → order.leadMinutes`), commande possible jusqu'à quelle heure ?
- [ ] **Plateaux pour bureaux et fêtes** : est-ce qu'il en fait ? Formules, prix par personne, nombre minimum (réglé sur 5), livraison ou retrait, délai de commande. Le site parle aujourd'hui de « demande » sans promettre.
- [ ] Deliveroo : lien direct vers sa page (mentionné dans la FAQ).

## Contact
- [ ] **Un portable pour WhatsApp** (le 09 56 70 91 12 est un fixe) : `data/site.json → whatsapp` ; le bouton WhatsApp apparaît alors tout seul.
- [ ] **L'e-mail** qui recevra les commandes et les demandes de plateaux : à brancher avec Resend (`RESEND_API_KEY`, `NOTIFY_EMAIL`, `RESEND_FROM` sur Vercel). En attendant, le client voit son récapitulatif et est invité à appeler.
- [ ] Instagram : @shekamoufr (trouvé et ajouté partout). D'autres réseaux (TikTok, Facebook) ?

## Pratique
- [ ] **Horaires** : du dimanche au vendredi 8 h – 20 h, le samedi 9 h – 21 h. À confirmer, ainsi que les fermetures (jours fériés, vacances) : `data/horaires.json`.
- [ ] **Moyens de paiement** (carte, espèces, titres-restaurant, Swile…) : `data/site.json → paymentMethods`.
- [ ] Wi-Fi et télétravail : règles exactes (specialtycoffee.paris indique « ordinateurs bienvenus, règles différentes le week-end »).
- [ ] Métro : Charles Michels (ligne 10) à 1 min et Commerce (ligne 8) à 7 min, à vérifier.
- [ ] Terrasse ? Accessibilité fauteuil ? Chaises hautes ?

## Fêtes persanes et annonces (`data/annonces.json`)
- [ ] Organise-t-il quelque chose pour **Shab-e Yalda** (21 décembre) et **Norouz** (20 mars) ? Le bandeau affiche pour l'instant de simples vœux.
- [ ] Les soirées âsh du samedi (vues en story) : régulières ? À annoncer ?
- [ ] La boisson du moment à mettre en avant chaque mois.

## Photos et logo
- [ ] **Des photos des boissons, des plats et de la boutique** : la liste précise est dans `assets/A-PHOTOGRAPHIER.md`. Les photos actuelles viennent de son Instagram.
- [ ] Son accord pour utiliser ces photos Instagram sur le site.
- [ ] **Le logo** en fichier d'origine (SVG, PDF ou PNG haute définition) : il a été redessiné d'après son badge (`public/logo.svg`), à remplacer par l'original s'il existe.

## Avis
- [ ] Son accord pour reprendre 3 vrais avis Google (prénom, date) : `data/avis.json`. Aucun avis n'est inventé.

## Légal
- [ ] **SIRET**, raison sociale exacte, nom du directeur de la publication : `data/site.json → legal`.
- [ ] Nom de domaine souhaité (shekamou.fr ?) : le site est pour l'instant sur shekamou-paris.vercel.app. Si le domaine change, relancer `npm run affichette` pour le QR code.
