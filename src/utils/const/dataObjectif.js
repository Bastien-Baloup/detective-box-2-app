export const dataObjectif = {
	box1: [
		{
			id: 11,
			title: 'La menteuse',
			subtitle: 'Retrouvez les derniers mots de la victime',
			detail: [
				"D'après ce qu'il dit dans ce paragraphe, il faudrait qu'on retrouve les derniers mots de la victime.",
				"Vous parlez d'une histoire glauque..."
			],
			label: 'Réponse',
			errorMessage: "Il y a des points sur lesquels je ne suis pas d'accord, réessayez de nouveau",
			answer: ['jauraisdulasauver', 'jauraidulasauver', 'jauraisdulasauve', 'jauraidulasauve'],
			answertext: [
				'Raphaëlle:',
				"Bien joué, j'ai l'impression que vous avez résolu ce paragraphe du poème. Si je comprends bien, le tueur connaissait sa victime, mais pas l'inverse. Continuons notre enquête.",
				'-',
				'Lauren:',
				"Faire parler sa victime avant de la tuer, c'est un procédé classique de personnalisation. On sent qu'il y prend du plaisir. De même que le petit rituel qu'il lui impose. Je vous invite à analyser à quel type de tueur on a à faire. Je vous envoie pour cela un extrait du livre de profiling que j'ai co-écrit. Dans une affaire de tueur en série, ça ne peut que nous aider ! A quel type de tueur avons-nous donc affaire ?"
			],
			answersrc: 'sounds/104-objectifs-reussis-1.mp3',
			newdetail: ['A quel type de tueur avons nous affaire ?'],
			newlabel: 'Réponse',
			newerrorMessage: 'Non je ne pense pas que ce soit cela.',
			newanswer: ['organise', 'tueurorganise'],
			newanswertext: [
				'Nous avons donc affaire à un tueur organisé...',
				"Gardez bien cela à l'esprit pour le reste de l'enquête."
			],
			newanswersrc: null,
			status: 'open'
		},
		{
			id: 12,
			title: "L'oublié",
			subtitle: "Retrouvez le nom de l'oublié",
			detail: [
				"Ce paragraphe sur l'oublié semble parler de quelqu'un qui a été tué et qui n'a pas été retrouvé.",
				'Retrouvons le nom de cette personne !'
			],
			errorMessage: "Je pense qu'il y a une erreur quelque part.",
			label: 'Réponse',
			answer: ['xaviermonrency'],
			answertext: [
				'Tim:',
				'Punaise vous êtes des rapides, vous !',
				'-',
				'Raphaëlle:',
				"Des années que les décrypteurs du monde entier sont sur ce message... Il y en a beaucoup qui vont être jaloux de vos talents ! D'un autre côté, il leur manquait des documents... mais quand même!",
				"C'est donc Xavier Monrency l'oublié."
			],
			answersrc: 'sounds/104-objectifs-reussis-2.mp3',
			status: 'open'
		},
		{
			id: 13,
			title: "L'orgueilleux",
			subtitle: 'Retrouvez la victime du paragraphe du poème',
			detail: [
				"Il semble que le poème évoque une mort qui n'a pas été mentionnée dans l'affaire et qui n'a aucun lien avec le tarot cette fois-ci.",
				'Quel est le nom de cette personne ?'
			],
			errorMessage: 'Je ne pense pas que ce soit cela.',
			label: 'Réponse',
			answer: ['jacquelinehoudin'],
			answertext: [
				'Raphaëlle:',
				"La personne enlevée était donc la mère de Garraud... Et l'orgueilleux, c'était Charles, qui s'est fait piéger par le tueur... On a affaire à des sacrés tordus quand même... J'espère qu'avec ça on va finir par réussir à l'interroger.",
				'-',
				'Céline:',
				'Je vais voir ce que je peux arranger.'
			],
			answersrc: 'sounds/104-objectifs-reussis-3.mp3',
			status: 'open'
		},
		{
			id: 14,
			title: 'Le chemin de la vérité',
			subtitle: 'Retrouver le lieu du poème',
			detail: [
				'Ok, on a bien avancé pour les trois paragraphes de la lettre.',
				"Il faut qu'on remette à jour notre liste de victimes avec tout ce qu'on a appris avant de continuer.",
				"Et n'oubliez pas le meurtre de Rebecca.",
				'Avant de poursuivre, nous allons procéder au tri des victimes afin de clarifier la situation.',
				"Après analyse, j'ai identifié trois principales catégories de victimes:"
			],
			label: null,
			choices: [
				'-- Choisissez le type de victime --',
				'Victime du Grand Œuvre du tueur au Tarot (tueur organisé)',
				'Victime collatérale du Tueur au Tarot (tueur organisé)',
				'Victime de Charles Garraud (tueur désorganisé)'
			],
			victimes: [
				{ name: 'Elodie Bouchard', img: 'assets/photos-personnages/elodie_bouchard.jpg' },
				{ name: 'Marianne Chauve', img: 'assets/photos-personnages/marianne_chauve.jpg' },
				{ name: 'Xavier Monrency', img: 'assets/photos-personnages/xavier_monrency.jpg' },
				{ name: 'Nicolas Chaussée', img: 'assets/photos-personnages/nicolas_chaussee.jpg' },
				{ name: 'Rebecca Dumont', img: 'assets/photos-personnages/rebecca_dumont.jpg' },
				{ name: 'Jacqueline Houdin', img: 'assets/photos-personnages/Jacqueline-Houdin.jpg' }
			],
			errorMessage:
				"Je crains qu'il y ait une erreur dans votre liste, ou du moins, une possible incohérence que nous devrions examiner de plus près.",
			answer: [
				'Victime du Grand Œuvre du tueur au Tarot (tueur organisé)',
				'Victime du Grand Œuvre du tueur au Tarot (tueur organisé)',
				'Victime du Grand Œuvre du tueur au Tarot (tueur organisé)',
				'Victime de Charles Garraud (tueur désorganisé)',
				'Victime du Grand Œuvre du tueur au Tarot (tueur organisé)',
				'Victime collatérale du Tueur au Tarot (tueur organisé)'
			],
			answertext: [
				"Bravo agent, nous avons progressé dans l'affaire et commençons à y voir plus clair !",
				'Continuons nos recherches.',
				'A chaque paragraphe résolu, on a obtenu un indice. Vous les trouverez dans votre historique.',
				"Maintenant, ce serait peut-être bien d'aller visiter le lieu du quatrième paragraphe du poème, non ?",
				'Dîtes-moi où je dois me rendre.'
			],
			answersrc: null,
			status: 'closed'
		}
	],
	box2: [
		{
			id: 21,
			title: 'Premier tri de la liste des victimes',
			subtitle: 'Dégrossir la liste des victimes potentielles',
			detail: [
				'Notre objectif ici est de dégrossir la liste des victimes potentielles en écartant les profils qui ne sont pas liés au Tueur au Tarot.'
			],
			victimes: [
				{ name: 'Aaron King', img: 'assets/photos-personnages/aaron_king.jpg' },
				{ name: 'Ainmire Oconradh', img: 'assets/photos-personnages/Ainmir-Oconradh.jpg' },
				{ name: 'Annelijn Dikboom', img: 'assets/photos-personnages/Anneljin-Dikboom.jpg' },
				{ name: 'Annina Kurschner', img: 'assets/photos-personnages/annina_kurschner.jpg' },
				{ name: 'Augustas Alsys', img: 'assets/photos-personnages/Augustas-Aslys.jpg' },
				{ name: 'Bogdana Nikol', img: 'assets/photos-personnages/Bogdana Nikol.jpg' },
				{ name: 'Daisy Vandenbulcke', img: 'assets/photos-personnages/Daisy-Vandenbulcke.jpg' },
				{ name: 'Dimosthenis Rigas', img: 'assets/photos-personnages/Dimosthenis-Rigas.jpg' },
				{ name: 'Dominik Jele', img: 'assets/photos-personnages/Dominik-Jelle.jpg' },
				{ name: 'Edvard Kallio', img: 'assets/photos-personnages/Edvard-Kallio.jpg' },
				{ name: 'Elias Varelas', img: 'assets/photos-personnages/Ellias Varelas.jpg' },
				{ name: 'Elimena Furino', img: 'assets/photos-personnages/Elimena-Furino.jpg' },
				{ name: 'Eliza Gaewska', img: 'assets/photos-personnages/Eliza-Gaewska.jpg' },
				{ name: 'Ere Jakobson', img: 'assets/photos-personnages/Ere-Jackobson.jpg' },
				{ name: 'Horasiu Prunea', img: 'assets/photos-personnages/Horasiu-Prunea.jpg' },
				{ name: 'Imelda Tuzzolino', img: 'assets/photos-personnages/Imelda Tuzzolino.jpg' },
				{ name: 'Ivar Mortensen', img: 'assets/photos-personnages/Ivar-Mortensen.jpg' },
				{ name: 'Janina Muster', img: 'assets/photos-personnages/Janina-Muster.jpg' },
				{ name: 'Jörn Frenzel', img: 'assets/photos-personnages/jorn_frenzel.jpg' },
				{ name: 'Karina Galicka', img: 'assets/photos-personnages/Karina-Galicka.jpg' },
				{ name: 'Konstantin Wallner', img: 'assets/photos-personnages/konstantin_wallner.jpg' },
				{ name: 'Lina Syren', img: 'assets/photos-personnages/Lina Syren.jpg' },
				{ name: 'Marian Bilek', img: 'assets/photos-personnages/Marian-Bilek.jpg' },
				{ name: 'Marike Vonbraun', img: 'assets/photos-personnages/Marike-Vonbraun.jpg' },
				{ name: 'Petar Cojocaru', img: 'assets/photos-personnages/Petar-Cojocaru.jpg' },
				{ name: 'Riano Della Valle', img: 'assets/photos-personnages/riano_dellavalle.jpg' },
				{ name: 'Taneli Tuominen', img: 'assets/photos-personnages/Taneli-Tuominen.jpg' },
				{ name: 'Timo Sladie', img: 'assets/photos-personnages/Timo-Sladie.jpg' }
			],
			errorMessage: 'Quelque chose ne va pas dans cette liste',
			answer: [
				'Aaron King',
				'Annina Kurschner',
				'Daisy Vandenbulcke',
				'Elimena Furino',
				'Horasiu Prunea',
				'Jörn Frenzel',
				'Konstantin Wallner',
				'Riano Della Valle'
			],
			answertext: [
				"Bravo Agents, c'est un bon premier tri !",
				'Je vais montrer ça à mon contact à Eurocrim, Samuel Perry.',
				"C'est lui qui m'a aidé à établir la liste, il aura peut-être d'autres éléments pour nous."
			],
			answersrc: 'sounds/204-objectifs-reussis-1.mp3',
			status: 'open'
		},
		{
			id: 22,
			title: 'Le secret de Garraud',
			subtitle: 'Trouver le nom de la théorie du tueur',
			detail: [
				"Avez-vous eu l'occasion d'observer le portrait de la mère de Garraud dans sa cellule ?",
				"Il y mentionne l'existence d'une théorie, présentée comme son secret que lui seul connaissait en plus du tueur.",
				"C'est surement important pour découvrir le modus operandi du tueur.",
				"Trouvons de quelle théorie il s'agit !"
			],
			errorMessage: 'Je ne pense pas que ce soit cela.',
			label: 'Réponse',
			answer: [
				'lilithequilibree',
				'lilithequilibre',
				'lilitequilibree',
				'lilitequilibre',
				'theoriedelilithequilibree',
				'theoriedelilithequilibre'
			],
			answertext: [
				'Bien joués agents, nous avons maintenant le nom de la théorie.',
				'Il nous faut approfondir nos recherches pour comprendre ce dont le tueur parle.'
			],
			answersrc: 'sounds/204-objectifs-reussis-2.mp3',
			newdetail: [
				'Avez-vous examiné tous les messages du forum ? Nous avons maintenant le nom de la théorie, mais il nous faut approfondir nos recherches pour comprendre ce dont le tueur parle. Selon le message, il déclare :',
				"“Le placement de Lilith a donné le pouvoir à mes victimes de changer le monde, mais ils ont refusé, trop petits qu'ils étaient.”",
				"J'ai l'impression qu'il fait référence à la sélection de ses victimes. Nous devrions creuser davantage cette piste.",
				'Quel était le placement de Lilith évoqué par la théorie ?'
			],
			newlabel: 'Réponse',
			newerrorMessage: 'Je ne pense pas que ce soit cela.',
			newanswer: ['balance', 'enbalance', 'lilithenbalance'],
			newanswertext: [
				"Bravo agents, vous êtes parvenus à suivre la piste jusqu'au bout",
				'Lilith en balance, le schéma du tueur se dévoile progressivement.'
			],
			newanswersrc: 'sounds/204-objectifs-reussis-3.mp3',
			status: 'closed'
		},
		{
			id: 23,
			title: 'Modus operandi',
			subtitle: 'Finaliser la liste des victimes',
			detail: [
				'Nous avons effectué une première sélection, cependant, nous devons maintenant réduire le groupe à 5 personnes comme le nombre de cartes de tarot trouvées dans la planque du tueur.',
				'Utilisons les nouvelles informations à notre disposition.'
			],
			victimes: [
				{ name: 'Aaron King', img: 'assets/photos-personnages/aaron_king.jpg' },
				{ name: 'Annina Kurschner', img: 'assets/photos-personnages/annina_kurschner.jpg' },
				{ name: 'Daisy Vandenbulcke', img: 'assets/photos-personnages/Daisy-Vandenbulcke.jpg' },
				{ name: 'Elimena Furino', img: 'assets/photos-personnages/Elimena-Furino.jpg' },
				{ name: 'Horasiu Prunea', img: 'assets/photos-personnages/Horasiu-Prunea.jpg' },
				{ name: 'Jörn Frenzel', img: 'assets/photos-personnages/jorn_frenzel.jpg' },
				{ name: 'Konstantin Wallner', img: 'assets/photos-personnages/konstantin_wallner.jpg' },
				{ name: 'Riano Della Valle', img: 'assets/photos-personnages/riano_dellavalle.jpg' }
			],
			errorMessage: 'Je pense que quelque chose ne va pas dans cette liste',
			answer: ['Aaron King', 'Annina Kurschner', 'Jörn Frenzel', 'Konstantin Wallner', 'Riano Della Valle'],
			answertext: [
				'Bravo ! Vous avez réussi à retrouver toutes les victimes correspondant aux cartes de tarot que le tueur nous avait laissées !',
				"Garraud n'a pas menti, il ne s'était vraiment pas arrêté pendant toutes ces années..."
			],
			answersrc: 'sounds/204-objectifs-reussis-4.mp3',
			status: 'closed'
		},
		{
			id: 24,
			title: 'Le meurtre de Mason Reynolds',
			subtitle: 'A qui appartient le médaillon ?',
			predetail: [
				'Le tueur a de nouveau frappé, à Colchester cette fois, en Angleterre.',
				"Grâce aux contacts de Lauren, nous venons d'obtenir l'autorisation d'aller fouiller la scène par l'intermédiaire de notre partenaire Jaden Gill.",
				'Je compte sur vous pour la passer au peigne fin.'
			],
			detail: [
				'Encore une histoire de médaillon de Lilith !',
				"Il semblerait qu'il s'agisse du même que celui retrouvé dans la malle avec l'organe de Rebecca. C'est trop gros pour être une simple coïncidence.",
				'Qui a bien pu leur offrir ?'
			],
			errorMessage: 'Je ne pense pas que ce soit cela.',
			label: 'Réponse',
			answer: ['stellalouiseberg', 'louisebergstella'],
			answertext: [
				'Sanchez :',
				"Vous l'avez retrouvée, bravo !",
				"Maintenant je suis sûre qu'on doit également pouvoir retrouver l'adresse de cette dénommée Stella.",
				"Dites-moi où je dois me rendre lorsque vous l'aurez trouvée.",
				'-',
				'Lauren :',
				"Raph, je crois que notre tueur a peut-être rencontré une victime avant sa mort, je creuse cette piste et je reviens vers toi dès que j'ai quelque chose de concret..."
			],
			answersrc: 'sounds/204-objectifs-reussis-5.mp3',
			status: 'closed'
		}
	],
	box3: [
		{
			id: 31,
			title: 'Remonter la piste trouvée par Lauren',
			subtitle: 'Où le tueur avait emmené Annina ?',
			detail: [
				"Lauren m'a informée qu'Annina avait rencontré notre tueur au Tarot un mois avant sa mort.",
				"Où l'avait-t-il emmenée ?"
			],
			label: 'Réponse',
			errorMessage: 'Je ne pense pas que ce soit cela.',
			answer: ['dolmenvondegernau', 'dolmendegernau', 'menhirvondegernau', 'degernaumenhir'],
			answertext: [
				'Le Dolmen von Degernau...',
				"C'est donc cela que Lauren avait trouvé, cela doit nous donner une information pour la suite si Lauren y attachait tant d'importance..."
			],
			answersrc: 'sounds/300-commentaires-sanchez-2.mp3',
			status: 'open'
		},
		{
			id: 32,
			title: "L'échantillon",
			subtitle: "Localiser l'échantillon",
			detail: [
				'Il faut essayer de voir où nous amène cet échantillon trouvé dans le bureau de Lauren.',
				"Une fois que vous l'aurez fait, on aura une bonne piste à explorer."
			],
			label: 'Réponse',
			errorMessage: 'Je ne pense pas que ce soit cela.',
			answer: ['dolmendite', 'dolmenite', 'ite', 'ithe', 'dolmendithe', 'dolmenithe'],
			answertext: ["Bien joué agents, le Dolmen d'Ité...", "On devrait s'y rendre"],
			answersrc: null,
			status: 'open'
		},
		{
			id: 33,
			title: 'Les dernières cibles du tueur',
			subtitle: 'Identifier les cibles restantes',
			detail: [
				"Plus que deux sur la liste, enfin une puisque l'un des deux est déjà mort selon le tueur.",
				"Il faut qu'on les retrouve au plus vite…"
			],
			label: 'Réponse',
			errorMessage: 'Je ne pense pas que ce soit cela.',
			answer: [
				'mariagrubergiusepperossi',
				'giusepperossimariagruber',
				'giusepperossietmariagruber',
				'mariagruberetgiusepperossi'
			],
			answertext: [
				'On a réussi à identifier les dernières victimes, mais le pire reste à venir !',
				'Cela veut donc dire que le tueur est... Non je ne veux pas le croire...'
			],
			answersrc: 'sounds/300-commentaires-sanchez-3.mp3',
			status: 'closed'
		},
		{
			id: 34,
			title: 'Le tueur',
			subtitle: 'Identifier le tueur',
			detail: ["Il faut qu'on identifie le tueur pour pouvoir l'arrêter avant que ça ne recommence"],
			label: 'Réponse',
			errorMessage: 'Je ne pense pas que ce soit cela.',
			answer: ['celinevalluy'],
			answertext: [
				"Je n'arrive pas à le croire... Céline la tueuse, alors que je la connais depuis des années !",
				"J'appelle les renforts, on va fouiller chez elle de fond en comble"
			],
			answersrc: 'sounds/300-commentaires-sanchez-4.mp3',
			status: 'closed'
		}
	]
}
