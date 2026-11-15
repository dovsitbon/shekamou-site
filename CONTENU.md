# Shekamou : contenu du site

Tous les textes et la carte, pour validation. Ce qui est marqué « À REMPLIR » manque encore : voir INFOS-A-DEMANDER.md.

Relevé le 2026-11-15 à partir de son Instagram (@shekamoufr : 162 publications et les stories à la une « Boissons », « Sandwich », « Brunch », « Gâteaux », « Spécialités iraniennes »), de sa fiche Google (4.8/5, plus de 1200 avis) et de specialtycoffee.paris (ouverture en février 2025, grains Terres de Café, prix des cafés).

Les textes se corrigent dans `locales/fr.json`, `locales/en.json`, `locales/fa.json` ; la carte dans `data/carte.json` ; les horaires dans `data/horaires.json` ; le bandeau dans `data/annonces.json`. Puis `npm run contenu` pour régénérer ce fichier.

## Titre du hero : trois propositions

1. **« Le café des gourmands. »** (retenu) : clin d'œil au nom, *shekamou* (شکمو) voulant dire « gourmand » en persan.
2. « Latte art et âsh-e reshteh. » : les deux mondes de la maison en quatre mots.
3. « Paris le matin, Téhéran à midi. » : le rythme de la journée, du café de spécialité au bol d'âsh.

## Référencement (balises title et description)

- **Title de l'accueil**
  - FR : Café et coffee shop iranien à Paris 15, rue des Entrepreneurs | Shekamou
  - EN : Iranian café and coffee shop in Paris 15, rue des Entrepreneurs | Shekamou
  - FA : کافه و کافی‌شاپ ایرانی در پاریس ۱۵، خیابان آنتروپرونور | شکمو
- **Description de l'accueil**
  - FR : Shekamou, café de spécialité et cuisine iranienne maison au 42 rue des Entrepreneurs (Paris 15). Latte art, ube latte, focaccias, âsh-e reshteh. Ouvert 7 j/7 dès 8 h, sur place ou à emporter.
  - EN : Shekamou, specialty coffee and home-made Iranian food at 42 rue des Entrepreneurs (Paris 15). Latte art, ube latte, focaccias, ash reshteh. Open 7 days a week from 8 am, eat in or take away.
  - FA : شکمو، قهوهٔ تخصصی و غذای ایرانی خانگی در شمارهٔ ۴۲ خیابان آنتروپرونور (پاریس ۱۵). لاته‌آرت، اوبه لاته، فوکاچا، آش رشته. هر روز هفته از ساعت ۸ باز است، سرو در کافه یا بیرون‌بر.
- **Title · La carte**
  - FR : Carte et prix : cafés, ube latte, brunch, plats iraniens | Shekamou Paris 15
  - EN : Menu and prices: coffee, ube latte, brunch, Iranian dishes | Shekamou Paris 15
  - FA : منو و قیمت‌ها: قهوه، اوبه لاته، برانچ، غذای ایرانی | شکمو پاریس ۱۵
- **Description · La carte**
  - FR : La carte de Shekamou, rue des Entrepreneurs : espresso, flat white, ube latte, matcha mangue, brunch, sandwichs focaccia, âsh-e reshteh, haleem, gâteau au safran. Commande à emporter.
  - EN : Shekamou's menu, rue des Entrepreneurs: espresso, flat white, ube latte, mango matcha, brunch, focaccia sandwiches, ash reshteh, haleem, saffron cake. Order to take away.
  - FA : منوی شکمو در خیابان آنتروپرونور: اسپرسو، فلت وایت، اوبه لاته، ماچا انبه، برانچ، ساندویچ فوکاچا، آش رشته، حلیم، کیک زعفرانی. سفارش بیرون‌بر.
- **Title · Commander à emporter**
  - FR : Commander à emporter chez Shekamou, Paris 15
  - EN : Order to take away at Shekamou, Paris 15
  - FA : سفارش بیرون‌بر از شکمو، پاریس ۱۵
- **Description · Commander à emporter**
  - FR : Commandez vos cafés, sandwichs et plats iraniens à emporter chez Shekamou, 42 rue des Entrepreneurs. Choisissez l'heure de retrait, payez au comptoir.
  - EN : Order coffee, sandwiches and Iranian dishes to take away from Shekamou, 42 rue des Entrepreneurs. Choose your pick-up time, pay at the counter.
  - FA : قهوه، ساندویچ و غذای ایرانی را از شکمو، ۴۲ خیابان آنتروپرونور، بیرون‌بر سفارش دهید. ساعت تحویل را انتخاب کنید و پشت پیشخوان پرداخت کنید.
- **Title · Plateaux bureaux & fêtes**
  - FR : Plateaux petit-déjeuner, sandwichs et douceurs pour bureaux et fêtes | Shekamou Paris 15
  - EN : Breakfast, sandwich and cake platters for offices and parties | Shekamou Paris 15
  - FA : سینی صبحانه، ساندویچ و کیک برای اداره و مهمانی | شکمو پاریس ۱۵
- **Description · Plateaux bureaux & fêtes**
  - FR : Petit-déjeuner d'équipe, réunion, anniversaire ou fête persane : demandez vos plateaux de cafés, viennoiseries, focaccias, plats iraniens et gâteaux à Shekamou, Paris 15.
  - EN : Team breakfast, meeting, birthday or Persian celebration: request platters of coffee, pastries, focaccias, Iranian dishes and cakes from Shekamou, Paris 15.
  - FA : صبحانهٔ همکاران، جلسه، تولد یا جشن ایرانی: سینی قهوه، کروسان، فوکاچا، غذای ایرانی و کیک را از شکمو، پاریس ۱۵ درخواست کنید.
- **Title · Café iranien à Paris**
  - FR : Café iranien à Paris : âsh reshteh, haleem, bandari | Shekamou, Paris 15
  - EN : Iranian café in Paris: ash reshteh, haleem, bandari | Shekamou, Paris 15
  - FA : کافهٔ ایرانی در پاریس: آش رشته، حلیم، بندری | شکمو، پاریس ۱۵
- **Description · Café iranien à Paris**
  - FR : Shekamou, café iranien rue des Entrepreneurs (Paris 15) : âsh-e reshteh, haleem le week-end, adasi, sandwich bandari, gâteau au safran et pistache. Sur place ou à emporter.
  - EN : Shekamou, an Iranian café on rue des Entrepreneurs (Paris 15): ash reshteh, weekend haleem, adasi, bandari sandwich, saffron and pistachio cake. Eat in or take away.
  - FA : شکمو، کافهٔ ایرانی در خیابان آنتروپرونور (پاریس ۱۵): آش رشته، حلیم آخر هفته، عدسی، ساندویچ بندری، کیک زعفران و پسته. سرو در کافه یا بیرون‌بر.
- **Title · Coffee shop à Paris 15**
  - FR : Coffee shop à Paris 15 : café de spécialité et brunch, rue des Entrepreneurs | Shekamou
  - EN : Coffee shop in Paris 15: specialty coffee and brunch, rue des Entrepreneurs | Shekamou
  - FA : کافی‌شاپ در پاریس ۱۵: قهوهٔ تخصصی و برانچ، خیابان آنتروپرونور | شکمو
- **Description · Coffee shop à Paris 15**
  - FR : Shekamou, coffee shop du 15e arrondissement : grains Terres de Café, latte art, ube latte, matcha, brunch et focaccias. Wi-Fi gratuit, ouvert 7 j/7 dès 8 h. Métro Charles Michels.
  - EN : Shekamou, a coffee shop in the 15th arrondissement: Terres de Café beans, latte art, ube latte, matcha, brunch and focaccias. Free Wi-Fi, open daily from 8 am. Charles Michels metro.
  - FA : شکمو، کافی‌شاپ منطقهٔ ۱۵ پاریس: دانهٔ Terres de Café، لاته‌آرت، اوبه لاته، ماچا، برانچ و فوکاچا. وای‌فای رایگان، هر روز از ساعت ۸. متروی شارل میشل.
- **Title · Mentions légales**
  - FR : Mentions légales | Shekamou
  - EN : Legal notice | Shekamou
  - FA : اطلاعات حقوقی | شکمو
- **Description · Mentions légales**
  - FR : Mentions légales du site de Shekamou, café au 42 rue des Entrepreneurs, Paris 15.
  - EN : Legal notice for the website of Shekamou, café at 42 rue des Entrepreneurs, Paris 15.
  - FA : اطلاعات حقوقی وب‌سایت شکمو، کافه در ۴۲ خیابان آنتروپرونور، پاریس ۱۵.

## Bandeau du haut

- **Par défaut** : Ouvert 7 j/7 dès 8 h · Sur place ou à emporter / Open 7 days a week from 8 am · Eat in or take away / هر روز هفته از ساعت ۸ باز هستیم · سرو در کافه یا بیرون‌بر
- **yalda-2026** (du 2026-12-15 au 2026-12-22) : Shab-e Yalda, la plus longue nuit de l'année, approche : bonne fête à tous les gourmands. / Shab-e Yalda, the longest night of the year, is coming: happy Yalda to all our regulars. / شب یلدا، بلندترین شب سال، نزدیک است. یلدایتان شیرین!
- **nowruz-2027** (du 2027-03-14 au 2027-03-27) : Norouz, le Nouvel An persan, c'est le 20 mars : bonne année à vous. / Nowruz, the Persian New Year, falls on 20 March: happy new year. / نوروزتان پیروز! سال نو مبارک.
- **boisson-ube-automne-2026** (du 2026-11-01 au 2026-12-14) : Boisson du moment : l'ube latte, violet, doux et onctueux. / Drink of the moment: the ube latte, purple, mellow and creamy. / نوشیدنی این روزها: اوبه لاته، بنفش، ملایم و خامه‌ای.

## Accueil

- **Petite ligne**
  - FR : Coffee shop · Cuisine iranienne · Rue des Entrepreneurs
  - EN : Coffee shop · Iranian kitchen · Rue des Entrepreneurs
  - FA : کافی‌شاپ · آشپزخانهٔ ایرانی · خیابان آنتروپرونور
- **Titre**
  - FR : Le café des gourmands.
  - EN : The café for food lovers.
  - FA : کافهٔ شکموها.
- **Sous-titre**
  - FR : Café de spécialité, boissons colorées et plats iraniens faits maison. Au cœur du petit Téhéran de Paris.
  - EN : Specialty coffee, colourful drinks and home-made Iranian dishes. Right in the heart of Paris's little Tehran.
  - FA : قهوهٔ تخصصی، نوشیدنی‌های رنگی و غذای ایرانی خانگی. در دل تهرانِ کوچکِ پاریس.

### Tuiles

- **cafes**
  - FR : Cafés de spécialité
  - EN : Specialty coffee
  - FA : قهوهٔ تخصصی
- **boissons**
  - FR : Ube, matcha & smoothies
  - EN : Ube, matcha & smoothies
  - FA : اوبه، ماچا و اسموتی
- **brunch**
  - FR : Brunch & focaccias
  - EN : Brunch & focaccias
  - FA : برانچ و فوکاچا
- **sandwichs**
  - FR : Sandwichs
  - EN : Sandwiches
  - FA : ساندویچ
- **iranien**
  - FR : Plats iraniens
  - EN : Iranian dishes
  - FA : غذای ایرانی
- **douceurs**
  - FR : Douceurs
  - EN : Sweets
  - FA : شیرینی و کیک

### Services (4 pictos)

- **Picto 1**
  - FR : Ouvert 7 j/7 dès 8 h — Jusqu'à 20 h, et 21 h le samedi.
  - EN : Open daily from 8 am — Until 8 pm, 9 pm on Saturdays.
  - FA : هر روز از ساعت ۸ — تا ساعت ۲۰، شنبه‌ها تا ۲۱.
- **Picto 2**
  - FR : Sur place — Wi-Fi gratuit, on s'installe.
  - EN : Eat in — Free Wi-Fi, make yourself at home.
  - FA : سرو در کافه — وای‌فای رایگان، راحت بنشینید.
- **Picto 3**
  - FR : À emporter — Commandez en ligne, passez prendre.
  - EN : Take away — Order online, pick it up.
  - FA : بیرون‌بر — آنلاین سفارش دهید، سر راه بردارید.
- **Picto 4**
  - FR : Iranien, fait maison — Âsh, haleem, adasi, bandari.
  - EN : Iranian, home-made — Ash, haleem, adasi, bandari.
  - FA : ایرانی و خانگی — آش، حلیم، عدسی، بندری.

### Carte (intro)

- **Titre**
  - FR : Du premier café au goûter.
  - EN : From first coffee to afternoon cake.
  - FA : از قهوهٔ صبح تا عصرانه.
- **Texte**
  - FR : Choisissez, ajoutez, passez prendre. Les plats iraniens ont un petit mot d'explication, pour ceux qui découvrent.
  - EN : Pick, add, pick up. Iranian dishes come with a short note for anyone trying them for the first time.
  - FA : انتخاب کنید، اضافه کنید، سر راه بردارید. کنار غذاهای ایرانی توضیح کوتاهی هم برای دوستان فرانسوی‌مان گذاشته‌ایم.

### Blocs alternés

- **Bloc 1 · titre**
  - FR : Le latte art, notre petit plaisir.
  - EN : Latte art is our little treat.
  - FA : لاته‌آرت، دلخوشی کوچک ما.
- **Bloc 1 · texte**
  - FR : Des grains torréfiés à Paris par Terres de Café, une machine Conti rouge vif, et du temps pour bien faire. Espresso, flat white, filtre V60. Et un cœur dessiné sur le lait.
  - EN : Beans roasted in Paris by Terres de Café, a bright red Conti machine, and time to do it properly. Espresso, flat white, V60 filter. And a heart drawn in the milk.
  - FA : دانه‌هایی که Terres de Café در پاریس رُست می‌کند، یک دستگاه Conti قرمز، و حوصله برای درست انجام دادن کار. اسپرسو، فلت وایت، دمی V60. و یک قلب روی شیر.
- **Bloc 1 · bouton**
  - FR : Voir la carte
  - EN : See the menu
  - FA : دیدن منو
- **Bloc 2 · titre**
  - FR : Un bol d'âsh, et la journée change.
  - EN : One bowl of ash and the day looks better.
  - FA : یک کاسه آش، و حال روز عوض می‌شود.
- **Bloc 2 · texte**
  - FR : Âsh-e reshteh aux herbes et aux nouilles, haleem du week-end, adasi, sandwich bandari. Les recettes de la maison, servies comme là-bas. Vous découvrez ? On vous explique tout.
  - EN : Herb and noodle ash reshteh, weekend haleem, adasi, bandari sandwich. House recipes, served the way they are back home. New to it? We'll walk you through.
  - FA : آش رشته با سبزی و رشته، حلیم آخر هفته، عدسی، ساندویچ بندری. دستور پخت‌های خانگی، همان‌طور که در ایران سرو می‌شود.
- **Bloc 2 · bouton**
  - FR : Découvrir
  - EN : Discover
  - FA : بیشتر بدانید
- **Bloc 3 · titre**
  - FR : Au cœur du petit Téhéran.
  - EN : In the heart of little Tehran.
  - FA : در دل تهرانِ کوچک.
- **Bloc 3 · texte**
  - FR : Épiceries persanes, pâtisseries, restaurants : la rue des Entrepreneurs a un accent iranien. Shekamou s'y est installé en février 2025, à une minute du métro Charles Michels.
  - EN : Persian grocers, pastry shops, restaurants: rue des Entrepreneurs has an Iranian accent. Shekamou moved in in February 2025, one minute from Charles Michels metro.
  - FA : سوپرمارکت‌های ایرانی، شیرینی‌فروشی‌ها، رستوران‌ها: خیابان آنتروپرونور لهجهٔ ایرانی دارد. شکمو از فوریهٔ ۲۰۲۵ اینجاست، یک دقیقه از متروی شارل میشل.
- **Bloc 3 · bouton**
  - FR : Itinéraire
  - EN : Directions
  - FA : مسیریابی

### Plateaux

- **Titre**
  - FR : Des plateaux pour tout le monde.
  - EN : Platters for everyone.
  - FA : سینی‌های پذیرایی برای همه.
- **Texte**
  - FR : Un petit-déjeuner d'équipe, une réunion, un anniversaire, une fête persane : dites-nous combien vous serez et ce qui vous ferait plaisir. On vous répond avec une proposition.
  - EN : A team breakfast, a meeting, a birthday, a Persian celebration: tell us how many you'll be and what you'd enjoy. We'll come back with a proposal.
  - FA : صبحانهٔ همکاران، جلسه، تولد، جشن ایرانی: بگویید چند نفرید و چه دوست دارید. ما با یک پیشنهاد جواب می‌دهیم.
- **Mention**
  - FR : Les plateaux se font sur demande : formules et prix vous sont confirmés par le café.
  - EN : Platters are made to order: the café confirms options and prices.
  - FA : سینی‌ها سفارشی آماده می‌شوند: گزینه‌ها و قیمت را کافه تأیید می‌کند.

### Avis

Aucun avis inventé : trois emplacements « Avis client à venir » tant que `data/avis.json` est vide.
- **Titre**
  - FR : Ce qu'en disent les gourmands.
  - EN : What the food lovers say.
  - FA : شکموها چه می‌گویند.
- **Texte**
  - FR : Plus de 1 200 avis sur Google, 4,8 sur 5. On reprendra ici, avec leur accord, quelques mots de clients.
  - EN : Over 1,200 reviews on Google, 4.8 out of 5. With their permission, we'll share a few customers' words here.
  - FA : بیش از ۱۲۰۰ نظر در گوگل، امتیاز ۴٫۸ از ۵. به‌زودی، با اجازهٔ خودشان، چند جمله از مشتری‌ها را اینجا می‌آوریم.

### FAQ

- **Q1**
  - FR : Faut-il réserver ?
  - EN : Do I need to book?
  - FA : باید رزرو کنم؟
- **R1**
  - FR : Non, on ne prend pas de réservation : passez quand vous voulez, 7 jours sur 7. Pour un groupe ou des plateaux, envoyez-nous une demande depuis la page Plateaux.
  - EN : No, we don't take bookings: drop in whenever you like, 7 days a week. For a group or platters, send us a request from the Platters page.
  - FA : نه، رزرو نمی‌گیریم: هر وقت خواستید بیایید، هر روز هفته. برای گروه یا سینی پذیرایی، از صفحهٔ «سینی‌ها» درخواست بفرستید.
- **Q2**
  - FR : Y a-t-il des options végétariennes ou vegan ?
  - EN : Are there vegetarian or vegan options?
  - FA : غذای گیاهی یا وگان دارید؟
- **R2**
  - FR : Oui. L'âsh-e reshteh est entièrement végétarien, comme le sandwich aux aubergines grillées, les toasts aux œufs, les smoothies et la plupart des douceurs. Pour une version sans produit animal, demandez au comptoir : on vous dit ce qui est possible le jour même.
  - EN : Yes. Ash reshteh is fully vegetarian, as are the grilled aubergine sandwich, the egg toasts, the smoothies and most of the sweets. For something free of animal products, ask at the counter: we'll tell you what's possible that day.
  - FA : بله. آش رشته کاملاً گیاهی است، همین‌طور ساندویچ بادمجان کبابی، تُست تخم‌مرغ، اسموتی‌ها و بیشتر کیک‌ها. برای غذای بدون هیچ محصول حیوانی، از پیشخوان بپرسید.
- **Q3**
  - FR : Avez-vous des laits végétaux ?
  - EN : Do you have plant-based milk?
  - FA : شیر گیاهی دارید؟
- **R3**
  - FR : Oui, tous les cafés, lattes, matcha et ube latte peuvent se faire avec un lait végétal. Précisez-le en commandant.
  - EN : Yes, every coffee, latte, matcha and ube latte can be made with plant milk. Just mention it when you order.
  - FA : بله، همهٔ قهوه‌ها، لاته‌ها، ماچا و اوبه لاته را می‌شود با شیر گیاهی سفارش داد.
- **Q4**
  - FR : Peut-on commander à emporter ?
  - EN : Can I order to take away?
  - FA : می‌توانم بیرون‌بر سفارش بدهم؟
- **R4**
  - FR : Oui : composez votre commande sur la carte, choisissez l'heure de retrait et payez au comptoir en passant. Vous pouvez aussi appeler le 09 56 70 91 12. Shekamou est également présent sur Deliveroo.
  - EN : Yes: build your order from the menu, pick a collection time and pay at the counter when you arrive. You can also call +33 9 56 70 91 12. Shekamou is on Deliveroo too.
  - FA : بله: سفارش را از منو بسازید، ساعت تحویل را انتخاب کنید و هنگام تحویل پرداخت کنید. می‌توانید با ‎09 56 70 91 12 هم تماس بگیرید. شکمو در Deliveroo هم هست.
- **Q5**
  - FR : Peut-on travailler sur place ?
  - EN : Can I work from the café?
  - FA : می‌شود در کافه کار کرد؟
- **R5**
  - FR : En semaine, avec plaisir : Wi-Fi gratuit et ordinateurs bienvenus. Le week-end, à l'heure du brunch, la salle est très demandée et les règles peuvent changer : demandez au comptoir.
  - EN : On weekdays, gladly: free Wi-Fi and laptops welcome. At weekend brunch time the room is busy and the rules may differ, so ask at the counter.
  - FA : در روزهای کاری، با کمال میل: وای‌فای رایگان و لپ‌تاپ آزاد. آخر هفته‌ها، ساعت برانچ، سالن شلوغ است و ممکن است شرایط فرق کند؛ از پیشخوان بپرسید.
- **Q6**
  - FR : Quand y a-t-il du haleem ?
  - EN : When is haleem served?
  - FA : حلیم کی دارید؟
- **R6**
  - FR : Le samedi et le dimanche, préparé frais pour le week-end. L'âsh-e reshteh et l'adasi dépendent du jour : appelez-nous si vous venez exprès.
  - EN : On Saturdays and Sundays, made fresh for the weekend. Ash reshteh and adasi depend on the day: give us a call if you're coming especially.
  - FA : شنبه و یکشنبه، تازه برای آخر هفته. آش رشته و عدسی بستگی به روز دارد؛ اگر مخصوصاً برای آن می‌آیید، زنگ بزنید.
- **Q7**
  - FR : Quels moyens de paiement acceptez-vous ?
  - EN : How can I pay?
  - FA : چطور پرداخت کنم؟
- **R7**
  - FR : Le paiement se fait au comptoir, sur place ou au retrait de votre commande. Pour une commande de plateaux, le café vous indique les modalités avec sa proposition.
  - EN : You pay at the counter, whether you eat in or collect an order. For platters, the café explains payment along with its proposal.
  - FA : پرداخت پشت پیشخوان انجام می‌شود، چه در کافه بنشینید چه سفارش را بردارید. برای سینی‌ها، کافه نحوهٔ پرداخت را همراه پیشنهادش اعلام می‌کند.

### Pied de page

- **Phrase**
  - FR : L'art du bon café, rue des Entrepreneurs. Shekamou, en persan, c'est celui qui aime manger.
  - EN : The art of good coffee, rue des Entrepreneurs. In Persian, a shekamou is someone who loves to eat.
  - FA : هنر قهوهٔ خوب، در خیابان آنتروپرونور. شکمو یعنی کسی که عاشق خوردن است.

## Pages


### Café iranien à Paris

- **Titre**
  - FR : Café iranien à Paris
  - EN : Iranian café in Paris
  - FA : کافهٔ ایرانی در پاریس
- **Intro**
  - FR : En persan, shekamou (شکمو), c'est celui qui aime manger. Le café de spécialité le matin, les plats de Téhéran à midi, et toujours un peu de safran.
  - EN : In Persian, shekamou (شکمو) means someone who loves to eat. Specialty coffee in the morning, Tehran dishes at lunch, and always a little saffron.
  - FA : قهوهٔ تخصصی صبح‌ها، غذاهای تهران ظهرها، و همیشه کمی زعفران.
- **Section 1 · titre**
  - FR : Un café parisien, une cuisine iranienne
  - EN : A Parisian café, an Iranian kitchen
  - FA : کافهٔ پاریسی، آشپزخانهٔ ایرانی
- **Section 1 · texte**
  - FR : Shekamou a ouvert en février 2025 au 42 rue des Entrepreneurs. Côté comptoir, un vrai coffee shop : espresso, flat white, latte art, ube latte. Côté cuisine, les plats qu'on mange en Iran, préparés sur place. On y entend parler persan, français, anglais. Et tout le monde finit par commander un bol d'âsh.
  - EN : Shekamou opened in February 2025 at 42 rue des Entrepreneurs. At the counter, a proper coffee shop: espresso, flat white, latte art, ube latte. In the kitchen, the dishes people eat in Iran, made on site. You'll hear Persian, French and English. And everyone ends up ordering a bowl of ash.
  - FA : شکمو از فوریهٔ ۲۰۲۵ در شمارهٔ ۴۲ خیابان آنتروپرونور باز است. پشت پیشخوان، یک کافی‌شاپ واقعی: اسپرسو، فلت وایت، لاته‌آرت، اوبه لاته. در آشپزخانه، غذاهایی که در ایران می‌خوریم، همین‌جا پخته می‌شود. اینجا فارسی، فرانسوی و انگلیسی می‌شنوید. و آخرش همه یک کاسه آش سفارش می‌دهند.
- **Section 2 · titre**
  - FR : Le petit Téhéran du 15e
  - EN : The little Tehran of the 15th
  - FA : تهرانِ کوچکِ منطقهٔ ۱۵
- **Section 2 · texte**
  - FR : Autour de la rue des Entrepreneurs, les épiceries persanes, les pâtisseries et les restaurants iraniens se suivent depuis des années. Shekamou en est le coffee shop : on y prend un café avant d'aller faire ses courses, ou un âsh après. Métro Charles Michels (ligne 10) à une minute, Commerce (ligne 8) à sept.
  - EN : Around rue des Entrepreneurs, Persian grocers, pastry shops and Iranian restaurants have lined the streets for years. Shekamou is its coffee shop: a coffee before the shopping, a bowl of ash after. Charles Michels metro (line 10) is one minute away, Commerce (line 8) seven.
  - FA : اطراف خیابان آنتروپرونور سال‌هاست پر از سوپرمارکت ایرانی، شیرینی‌فروشی و رستوران ایرانی است. شکمو کافی‌شاپ این محله است: قهوه‌ای پیش از خرید، کاسه‌ای آش بعدش. متروی شارل میشل (خط ۱۰) یک دقیقه، و کومرس (خط ۸) هفت دقیقه پیاده.
- **Section 3 · titre**
  - FR : Safran, pistache, rose
  - EN : Saffron, pistachio, rose
  - FA : زعفران، پسته، گل محمدی
- **Section 3 · texte**
  - FR : Les douceurs gardent l'accent : gâteau au safran et aux pétales de rose, gâteau à la pistache, jus de grenade. À accompagner d'un thé, ou d'un latte.
  - EN : The sweets keep the accent: saffron cake with rose petals, pistachio cake, pomegranate juice. With a glass of tea, or a latte.
  - FA : شیرینی‌ها هم لهجه دارند: کیک زعفرانی با گلبرگ گل محمدی، کیک پسته، آب انار. با یک استکان چای، یا یک لاته.

### Coffee shop à Paris 15

- **Titre**
  - FR : Coffee shop à Paris 15
  - EN : Coffee shop in Paris 15
  - FA : کافی‌شاپ در پاریس ۱۵
- **Intro**
  - FR : Café de spécialité, boissons colorées et brunch, à une minute du métro Charles Michels. Ouvert tous les jours, dès 8 h.
  - EN : Specialty coffee, colourful drinks and brunch, one minute from Charles Michels metro. Open every day from 8 am.
  - FA : قهوهٔ تخصصی، نوشیدنی‌های رنگی و برانچ، یک دقیقه از متروی شارل میشل. هر روز از ساعت ۸ صبح.
- **Section 1 · titre**
  - FR : Un café de spécialité, rue des Entrepreneurs
  - EN : Specialty coffee on rue des Entrepreneurs
  - FA : قهوهٔ تخصصی در خیابان آنتروپرونور
- **Section 1 · texte**
  - FR : Les grains viennent de Terres de Café, torréfacteur parisien, et passent dans une machine Conti. Espresso à 3 €, flat white, cappuccino, filtre V60, et un décaféiné pour l'après-midi. Le latte art fait partie du service : cœur, tulipe ou rosace, selon l'humeur du barista.
  - EN : The beans come from Terres de Café, a Paris roaster, and go through a Conti machine. Espresso at €3, flat white, cappuccino, V60 filter, and decaf for the afternoon. Latte art comes with it: heart, tulip or rosetta, depending on the barista's mood.
  - FA : دانه‌ها از Terres de Café، رُستری پاریسی، می‌آیند و با دستگاه Conti دم می‌شوند. اسپرسو ۳ یورو، فلت وایت، کاپوچینو، دمی V60 و قهوهٔ بدون کافئین برای عصر. لاته‌آرت هم بخشی از سرو است: قلب، لاله یا برگ، بسته به حال باریستا.
- **Section 2 · titre**
  - FR : Du petit-déjeuner au goûter
  - EN : From breakfast to afternoon tea
  - FA : از صبحانه تا عصرانه
- **Section 2 · texte**
  - FR : Le matin, croissant et café. À midi, sandwich sur focaccia maison : pastrami, poulet croustillant, aubergine grillée. Pour le brunch, petit-déjeuner anglais et assiettes d’œufs. L'après-midi, ube latte, matcha mangue ou smoothie, avec une part de gâteau au safran.
  - EN : Morning: croissant and coffee. Lunch: a sandwich on home-made focaccia, pastrami, crispy chicken or grilled aubergine. For brunch, English breakfast and egg plates. Afternoon: ube latte, mango matcha or a smoothie, with a slice of saffron cake.
  - FA : صبح: کروسان و قهوه. ظهر: ساندویچ با فوکاچای خانگی، پاسترامی، مرغ سوخاری یا بادمجان کبابی. برای برانچ، صبحانهٔ انگلیسی و بشقاب تخم‌مرغ. عصر: اوبه لاته، ماچا انبه یا اسموتی، با یک برش کیک زعفرانی.
- **Section 3 · titre**
  - FR : Travailler, se retrouver, emporter
  - EN : Work, meet, take away
  - FA : کار، دیدار، بیرون‌بر
- **Section 3 · texte**
  - FR : Wi-Fi gratuit et ordinateurs bienvenus en semaine. Pour aller plus vite, commandez en ligne et passez prendre à l'heure choisie.
  - EN : Free Wi-Fi, laptops welcome on weekdays. In a hurry? Order online and pick up at the time you chose.
  - FA : وای‌فای رایگان، در روزهای کاری با لپ‌تاپ هم خوش آمدید. عجله دارید؟ آنلاین سفارش دهید و سر ساعت بردارید.

### La carte

- **Intro**
  - FR : Cafés, boissons colorées, brunch, sandwichs sur focaccia maison, plats iraniens et douceurs. Ajoutez à votre commande et passez prendre.
  - EN : Coffee, colourful drinks, brunch, sandwiches on home-made focaccia, Iranian dishes and sweets. Add to your order and pick it up.
  - FA : قهوه، نوشیدنی‌های رنگی، برانچ، ساندویچ با فوکاچای خانگی، غذای ایرانی و شیرینی. به سفارش اضافه کنید و سر راه بردارید.

### Commander à emporter

- **Intro**
  - FR : Votre panier, l'heure de retrait, votre nom : c'est tout. Paiement au comptoir quand vous passez.
  - EN : Your basket, a pick-up time, your name: that's it. Pay at the counter when you come by.
  - FA : سبد خرید، ساعت تحویل و نام شما: همین. پرداخت هنگام تحویل.

### Plateaux bureaux & fêtes

- **Intro**
  - FR : Cafés, viennoiseries, focaccias, plats iraniens et gâteaux, à partager. Dites-nous la date et le nombre de personnes, on vous propose le reste.
  - EN : Coffee, pastries, focaccias, Iranian dishes and cakes, to share. Tell us the date and how many of you there are, we'll suggest the rest.
  - FA : قهوه، کروسان، فوکاچا، غذای ایرانی و کیک، برای جمع. تاریخ و تعداد نفرات را بگویید، بقیه‌اش را ما پیشنهاد می‌دهیم.

## La carte (data/carte.json)

Prix connus : cafés d'après specialtycoffee.paris, sandwichs d'après la carte visible sur ses photos (Pastrami 12,90 €, Jambon de poulet 8,90 €, Tuna 8,90 €, Bandari 9,90 €). Tout est à confirmer avec le gérant ; les autres prix sont à remplir.

### Cafés · Coffee · قهوه

| Article | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Espresso / Espresso / اسپرسو | 3,00 € | Court et rond, grains torréfiés par Terres de Café. |  | à prendre |
| Americano / Americano / آمریکانو | 3,90 € | Un espresso allongé d'eau chaude. |  | à prendre |
| Cappuccino / Cappuccino / کاپوچینو | 5,20 € | Espresso et lait monté en mousse épaisse. |  | oui |
| Café latte / Caffè latte / کافه لاته | 5,20 € | Beaucoup de lait velouté, et le latte art qui va avec. | signature | oui |
| Flat white / Flat white / فلت وایت | 5,90 € | Double espresso, fine couche de lait micro-moussé. |  | oui |
| Café filtre V60 / V60 filter coffee / قهوهٔ دمی V60 | **À REMPLIR** | Méthode douce, pour goûter l'origine du grain. |  | à prendre |
| Chai latte / Chai latte / چای لاته | 6,90 € | Thé noir aux épices et lait chaud. |  | à prendre |
| Americano glacé / Iced americano / آمریکانو سرد | **À REMPLIR** | Sur glace, nature ou à la vanille. |  | oui |
| Chocolat chaud / Hot chocolate / هات چاکلت | **À REMPLIR** | Épais et onctueux, à la tasse. | végétarien | oui |
| Thé / Tea / چای | 3,90 € | Noir, vert ou infusion, selon l'humeur. | végétarien | à prendre |

### Boissons colorées · Colourful drinks · نوشیدنی‌های رنگی

| Article | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Ube latte / Ube latte / اوبه لاته | **À REMPLIR** | L'ube, patate douce violette des Philippines, mêlé au lait : doux, onctueux, chaud ou glacé. | signature, végétarien | oui |
| Matcha latte / Matcha latte / ماچا لاته | 5,90 € | Matcha fouetté minute, lait au choix. | végétarien | à prendre |
| Matcha mangue / Mango matcha / ماچا انبه | **À REMPLIR** | Purée de mangue, lait, matcha : trois couches à mélanger. | signature, végétarien | oui |
| Espresso banana shake / Espresso banana shake / شیک موز و اسپرسو | **À REMPLIR** | Banane, espresso, lait glacé, chantilly. | végétarien | oui |
| Frappé chocolat / Chocolate frappé / فراپه شکلاتی | **À REMPLIR** | Glacé, sauce chocolat sur les parois, chantilly. | végétarien | oui |
| Smoothie mangue / Mango smoothie / اسموتی انبه | **À REMPLIR** | Mangue mixée, épais et frais. | végétarien | oui |
| Smoothie fraise / Strawberry smoothie / اسموتی توت‌فرنگی | **À REMPLIR** | Fraises mixées, rose et frais. | végétarien | oui |
| Jus pressé / Fresh-pressed juice / آبمیوهٔ تازه | **À REMPLIR** | Orange, carotte, melon… selon la saison. | végétarien | oui |
| Jus de grenade / Pomegranate juice / آب انار | **À REMPLIR** | Rouge profond, acidulé, le fruit de Yalda. | végétarien | oui |

### Brunch · Brunch · برانچ

| Article | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Petit-déjeuner anglais / English breakfast / صبحانهٔ انگلیسی | **À REMPLIR** | Œufs au plat, saucisse, haricots blancs, champignons, focaccia. | signature | oui |
| Œufs, bacon & avocat / Eggs, bacon & avocado / تخم‌مرغ، بیکن و آووکادو | **À REMPLIR** | Deux œufs au plat ou brouillés, bacon (dinde ou porc), avocat, chou rouge, focaccia. |  | oui |
| Assiette brunch / Brunch plate / بشقاب برانچ | **À REMPLIR** | Œufs brouillés, saucisse, avocat, crudités et focaccia grillée. |  | oui |
| Toast aux œufs brouillés / Scrambled eggs on toast / تُست تخم‌مرغ هم‌زده | **À REMPLIR** | Pain grillé, œufs brouillés crémeux, tomates cerises. | végétarien | oui |
| English muffin / English muffin / مافین انگلیسی | **À REMPLIR** | Œuf et cheddar fondu dans un muffin toasté. |  | oui |
| Croissant jambon-comté / Ham & comté croissant / کروسان ژامبون و پنیر کُنته | **À REMPLIR** | Croissant garni, jambon, comté, roquette. |  | oui |
| Bagel jambon / Ham bagel / بیگل ژامبون | **À REMPLIR** | Bagel au pavot, jambon, salade. |  | oui |
| Pancakes / Pancakes / پنکیک | **À REMPLIR** | Pile moelleuse, sauce chocolat, fraise. | végétarien | oui |
| Yaourt, fraises & granola / Yoghurt, strawberries & granola / ماست، توت‌فرنگی و گرانولا | **À REMPLIR** | Yaourt, fraises fraîches, granola croustillant. | végétarien | oui |
| Salade poulet croustillant / Crispy chicken salad / سالاد مرغ سوخاری | **À REMPLIR** | Salade, poulet pané, croûtons, sauce crémeuse. |  | oui |

### Sandwichs · Sandwiches · ساندویچ

| Article | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Pastrami / Pastrami / پاسترامی | 12,90 € | Focaccia maison, pastrami, sauce Dijon, cheddar, cornichon, chou rouge. | signature | oui |
| Poulet croustillant / Crispy chicken / مرغ سوخاری | **À REMPLIR** | Focaccia, poulet pané, sauce blanche, oignons, crudités. |  | oui |
| Jambon de poulet / Chicken ham / ژامبون مرغ | 8,90 € | Jambon de poulet, stracciatella, poivron grillé, oignons rouges, roquette. |  | oui |
| Tuna / Tuna / تُن ماهی | 8,90 € | Thon, sauce mayonnaise, salade au yuzu. |  | oui |
| Aubergine grillée / Grilled aubergine / بادمجان کبابی | **À REMPLIR** | Focaccia, aubergines grillées, stracciatella, poivron, roquette. | végétarien | oui |
| Focaccia du jour / Focaccia of the day / فوکاچای روز | **À REMPLIR** | Celle qui sort du four ce jour-là : demandez au comptoir. | végétarien | oui |

### Plats iraniens · Iranian dishes · غذای ایرانی

| Article | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Âsh-e reshteh / Ash reshteh / آش رشته | **À REMPLIR** | Soupe épaisse aux herbes, haricots, lentilles et nouilles, kashk, oignons frits, menthe. *C'est quoi ? Le grand classique des tables iraniennes, l'hiver et à Norouz. « Reshteh » veut dire nouilles : elles sont censées porter chance. Le kashk, c'est un petit-lait fermenté, crémeux et salé, qu'on verse en spirale par-dessus.* | signature, végétarien | oui |
| Haleem / Haleem / حلیم | **À REMPLIR** | Blé et viande mijotés des heures jusqu'à devenir crème, cannelle et sucre par-dessus. *C'est quoi ? Le petit-déjeuner des matins froids en Iran, qu'on mange salé ou sucré. Chez Shekamou, il est préparé frais pour le samedi et le dimanche.* | week-end | oui |
| Adasi, soupe de lentilles / Adasi, lentil soup / عدسی | **À REMPLIR** | Lentilles mijotées, citron, herbes fraîches. *C'est quoi ? La soupe de lentilles qu'on achète dans la rue, à Téhéran, quand il fait froid. Simple, chaude, qui tient au corps.* |  | oui |
| Sandwich bandari / Bandari sandwich / ساندویچ بندری | 9,90 € | Saucisse marinée aux épices, sauce tomate, morceaux de pommes de terre. *C'est quoi ? Le sandwich de rue des ports du sud de l'Iran (« bandar » veut dire port) : saucisse et pommes de terre sautées dans une sauce tomate épicée.* |  | à prendre |
| Sandwich kalbas / Kalbas sandwich / ساندویچ کالباس | **À REMPLIR** | Kalbas à la persane, tomate, roquette. *C'est quoi ? Le kalbas, c'est la charcuterie des sandwicheries de Téhéran, servie en tranches fines dans un pain moelleux.* | nouveau | à prendre |

### Douceurs · Sweets · شیرینی

| Article | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Gâteau au safran / Saffron cake / کیک زعفرانی | **À REMPLIR** | Mie dorée au safran, éclats de pistache, pétales de rose. | signature, végétarien | oui |
| Gâteau à la pistache / Pistachio cake / کیک پسته | **À REMPLIR** | Glaçage pistache, pétales de rose. | végétarien | oui |
| Roulé fraise-pistache / Strawberry-pistachio roll / رولت توت‌فرنگی و پسته | **À REMPLIR** | Biscuit roulé, crème, fraises, pistache. | végétarien | oui |
| Gâteau au chocolat / Chocolate cake / کیک شکلاتی | **À REMPLIR** | Fondant, très chocolat. | végétarien | oui |
| Cheesecake caramel / Caramel cheesecake / چیزکیک کاراملی | **À REMPLIR** | Base biscuitée, nappage caramel. | végétarien | à prendre |
| Cake du jour / Loaf cake of the day / کیک روز | **À REMPLIR** | Banane, pomme-cannelle… selon la fournée. | végétarien | oui |
| Cookies / Cookies / کوکی | **À REMPLIR** | Pistache, chocolat, fruits rouges : épais et fondants à cœur. | végétarien | oui |
| Croissant / Croissant / کروسان | **À REMPLIR** | Pur beurre, feuilleté. | végétarien | oui |
| Pain au chocolat / Pain au chocolat / نان شکلاتی | **À REMPLIR** | Deux barres de chocolat, pâte feuilletée. | végétarien | oui |

## Infos pratiques

- Adresse : 42 rue des Entrepreneurs, 75015 Paris
- Téléphone : 09 56 70 91 12 (fixe : pas de WhatsApp tant qu'il ne donne pas de portable)
- Instagram : @shekamoufr
- E-mail : **À REMPLIR**
- Horaires :
  - Lundi : 08:00 – 20:00
  - Mardi : 08:00 – 20:00
  - Mercredi : 08:00 – 20:00
  - Jeudi : 08:00 – 20:00
  - Vendredi : 08:00 – 20:00
  - Samedi : 09:00 – 21:00
  - Dimanche : 08:00 – 20:00
- Métro : Charles Michels (Ligne 10, 1 min à pied) ; Commerce (Ligne 8, 7 min à pied)
- Moyens de paiement : **À REMPLIR**
- SIRET : **À REMPLIR**
