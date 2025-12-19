import fs from 'fs';

/**
 * DATA
 * =======================
 */

const periods = JSON.parse(fs.readFileSync('periods.json', 'utf8'));
const persons = fs.readFileSync('persons.txt', 'utf8')
  .split('\n')
  .map(t => ({
    nom: t.split(' ').slice(1).join(' '),
    prenom: t.split(' ')[0]
  }));
const questionsWordsIn = fs.readFileSync('questions_words_in.txt', 'utf8').split('\n');
const questionsWordsOut = fs.readFileSync('questions_words_out.txt', 'utf8').split('\n');

/**
 * LIB
 * ============================
 */

const generateBooklet = ({ prenom, nom }) => {
  console.log('generate booklet for %s %s', prenom, nom)
  return `
    <section class="cover">
      <div class="cover-content">
        <div class="cover-content-background type-${parseInt(Math.random() * 6 + 1)}"></div>
        <h2>Université d'Hiver ReSIN – 16-18 décembre 2025 – moulin d’Andé</h2>
        <h1>Compagnon <br/>de rétrospection</h1>
        <h3>${prenom} ${nom}</h3>
        <div class="image-container">
          <img src="assets/resin-logo-noir.jpg" />
        </div>
      </div>
    </section>
    <section class="dashed-page intro">
      <h2>Introduction</h2>
      <blockquote><strong>« Rétrospection », n.f. Action de regarder en arrière, de se reporter dans le passé.</strong></blockquote>
      <p>
        La profusion des discours sur l'IA est marquée par une saturation de promesses et de menaces qui ont en commun de nous projeter continuellement dans le futur. Face à cette situation, il peut parfois être opportun de porter une plus grande attention aux expériences directes et aux enseignements que l'on peut en tirer.
      </p>
      <p>
        Dès lors, à côté de la quête anxieuse des compétences et des outils nécessaires de ne pas « rater le train de l'IA », ou des grands débats fiévreux sur le travail, l'automatisation ou la sauvegarde de l'humanité, on pourrait aussi explorer les questions (souvent modestes) qui poussent déjà à l'ombre des grandes transformations en cours, cultiver les pratiques et les situations qui font sens dans nos contextes locaux, faire attention aux moments qui rattachent notre développement de l'IA à des milieux cohérents.
      </p>
      <p>
  Le présent compagnon n'a pas vocation à se substituer à votre système de prise de note personnel mais plutôt à le compléter en proposant divers outils pour revisiter votre expérience de manière renouvellée, attentive et questionnante. Il est destiné à un usage avant tout personnel, mais pourra aussi être mobilisé lors de l'atelier conclusif de l'Université d'Hiver. Vous serez invitée à en prendre des photos et les envoyer pour une documentation collective si vous y consentez, et même à en découper quelques parties (si vous souhaitez le garder intact vous pourrez aussi recopier ces morceaux afin de ne pas le découper).
  </p>
    <em>Le présent compagnon est notamment inspiré des exercices proposés dans la publication « des écotones, _______* » réalisée par  Benoit Verjat, Nicolas Couturier et Tanguy Wermelinger (hal-04348466), et d'un atelier proposé par Benoît Verjat en 2022 dans le cadre du projet « Sevran Zone Critique – controverses en action ».</em>
  </p>
  </p>
    </section>
    <section class="dashed-page intro">
      <h2>Que contient ce compagnon</h2>
      <p>
        Ce compagnon contient les éléments suivants :
      </p>

      <ul>
        <li>
          <strong>Partitions de (re)lecture de demi-journées</strong> : une double page par session de l'Université d'Hiver qui vous propose de vous la remémorer en vous l'appropriant selon votre perspective et vos expériences personnelles (troubles, épiphanies, madeleines de proust et autres petits moments méritant peut-être qu'on leur accorde de l'attention).
        </li>
        <li>
          <strong>Remise à outils</strong> : un espace de listage pour garder le compte de tous les fantastiques outils glânés au fil de l'université d'Hiver dans les temps formels et informels.
        </li>
        <li>
          <strong>Registre des rencontres</strong> : un espace vous permettant de noter les rencontres interpersonnelles et intellectuelles.
        </li>
        <li>
          <strong>Jardin de questions en permaculture</strong> : un espace pour poser des questions n'appelant pas forcément de réponse, conçu pour vous aider à cultiver un champ de petites questions diversifiées plutôt qu'à produire de grandes questions standardisées.
        </li>
      </ul>
      <h2>Quand utiliser ce compagnon</h2>
      <ul>
        <li>
          <strong>Pendant les sessions de l'université d'hiver</strong>, parallèlement à vos notes principales, pour explorer des manières alternatives et complémentaires de recevoir les expériences proposées.
        </li>
        <li>
          <strong>À la fin de chaque journée</strong>, comme un outil de remémoration des temps forts et des outils et rencontres récoltées.
        </li>
        <li>
          <strong>Lors de l'atelier conclusif</strong>, comme un outil de mise en commun des réflexions et de dialogue autour de notre appropriation collective des technologies d'intelligence artificielle.
        </li>
      </ul>
    </section>
    ${periods.map(periodName => {
    const [day, number, period] = periodName.split(' ');
    return `
        <section class="dashed-page">
          <h2 class="period-name">${day} ${number} <span class="period">${period}</span></h2>
          <div class="period-container">
          ${["titre personnel", "la session en un dessin", "citation mémorable"]
        .map(item => `
            <div class="item-container">
            <h4><span>${item}</span></h4>
            <p></p>
            </div>  
            `).join('\n')
      }
          </div>
        </section>
        <section class="dashed-page">
          <div class="partition-container">
            <h3>Partition de remémoration</h3>
            <div class="columns-headers-container">
              <div class="column">
                <h4>Moments</h4>
                <p>je vois/j'entends/<br/>je fais/je rencontre</p>
              </div>
              <div class="column">
                <h4>Échos</h4>
                <p>j'avais déjà vu/<br/>lu/vécu/fait</p>
              </div>
              <div class="column">
                <h4>Liens</h4>
                <p>le moment implique/dépend<br/>d'une personne/groupe/chose</p>
              </div>
            </div>
            <div class="columns-writing-space">
              <div class="column"></div>
              <div class="column"></div>
              <div class="column"></div>
              <div class="footprint">
                ${[...Array(6).keys()]
        .map(_n => `${prenom} ${nom.charAt(0)}. – ${periodName}`).join(' – ')
      }
              </div>
            </div>
            <div class="columns-footer">
            Ces colonnes sont un espace d'exploration avant tout personnel. Elles n'appellent pas à être toutes remplies. Elles pourront, si vous y consentez, être découpées lors de l'atelier final : attention à garder un espace entre chaque moment !
            </div>
          </div>
        </section>
        <section class="blank-page dashed-page">
          <div class="centered-blank-text">
            <h5>Page laissée intentionnellement vide : lors de la session de rétrospection de l'université d'Hiver, vous pourriez être amenée à découper le verso de cette page !</h5>
          </div>
        </section>
        <section class="blank-page dashed-page">
          <div class="period-container big">
          <div class="item-container">
            <h4><span>Notes libres</span></h4>
            <p></p>
            </div> 
          </div>
        </section>
        `
  }).join('\n')
    }
    <section class="questions-page dashed-page">
      <h2>Jardin de questions en permaculture</h2>
      <p>Cette section vous propose d'explorer l'espace des questions pouvant affecter vos pratiques de l'IA par-delà des questions les plus récurrentes. Ci-dessous quelques propositions à considérer dans les moments où l'impression de tourner en rond dans un espace de questionnement déjà bien balisé se fait sentir.</p>
      <div class="tool-box">
        <p>Proposition : formuler des questions en contournant les mots les plus utilisés pour parler de notre rapport à l'IA.</p>
        <ul>${questionsWordsOut
      .map(m => `<li>${m}</li>`).join('\n')
    }</ul>
      </div>
      <div class="tool-box">
        <p>Proposition : formuler des questions impliquant des mots ou concepts inattendus pour parler de notre rapport à l'IA.</p>
        <ul>${questionsWordsIn
      .map(m => `<li>${m}</li>`).join('\n')
    }</ul>
      </div>
      
      <div class="tool-box">
        <p>Proposition : formuler des questions au passé ou au présent, sans utiliser le futur.</p>
      </div>
    </section>
    <section class="dashed-page">
      
    </section>
    <section class="blank-page dashed-page">
    </section>
    <section class="blank-page dashed-page">
    </section>
    
    <section class="chutier-page dashed-page">
      <h2>Remise à outils</h2>
      <p>Consigner ici sous une forme synthétique et pratique les outils méthodologiques (outils de pensée, guides pour l'action, bonnes pratiques...) glânés pendant l'Université d'Hiver. La colonne « Catégorie » pourrait être investie par des typologies conventionnelles (par ex. recherche d'informations, catégorisation de données et analyse, automatisation de tâches, retranscription, aide à l'écriture...) ou l'occasion d'une réflexion sur vos problématiques spécifiques.</p>
      <div class="chutier-table">
        <div class="column">
          <div class="column-header">
            <h3>nom</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>catégorie</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>pourquoi/pour quoi</h3>
          </div>
          <div></div>
        </div>
      </div>
    </section>
    <section class="chutier-page dashed-page">
      <div class="chutier-table standalone">
        <div class="column">
          <div class="column-header">
            <h3>nom</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>catégorie</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>pourquoi/pour quoi</h3>
          </div>
          <div></div>
        </div>
      </div>
    </section>
    <section class="chutier-page dashed-page">
      <h2>Registre des rencontres</h2>
      <p>Consigner ici sous une forme pratique les rencontres faites ou à faire, qu'il s'agisse de personnes, d'organisations, de textes ou d'autres types de parties...</p>
      <div class="chutier-table">
        <div class="column">
          <div class="column-header">
            <h3>nom</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>catégorie</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>pourquoi/pour quoi</h3>
          </div>
          <div></div>
        </div>
      </div>
    </section>
    <section class="chutier-page dashed-page">
      <div class="chutier-table standalone">
        <div class="column">
          <div class="column-header">
            <h3>nom</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>catégorie</h3>
          </div>
          <div></div>
        </div>
        <div class="column">
          <div class="column-header">
            <h3>pourquoi/pour quoi</h3>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  
    <section class="blank-page dashed-page">
    </section>
    `
};

const generateHTML = (payload, fileName) => {
  console.log('generate %s', `output/${fileName}.html`);
  const html = `<!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${fileName} Compagnons RESIN</title> 
            <link rel="stylesheet" href="/fonts/Edgar/stylesheet.css">
        <link rel="stylesheet" href="/fonts/GeistMono/stylesheet.css">
            <link rel="stylesheet" type="text/css" href="css/pagedjs-interface.css" />
            <link rel="stylesheet" type="text/css" href="css/style.css" />
          </head>
          <body>
            ${payload}    
            <script type="text/javascript" src="js/paged.polyfill.js"></script>
          </body>

        </html>`;
  fs.writeFileSync(`output/${fileName}.html`, html, 'utf8');
  console.log('done !');
}

/**
 * EXECUTION
 * ======================
 */
persons.forEach((person) => generateHTML(generateBooklet(person), `${person.nom} ${person.prenom}`));
generateHTML(persons.map(generateBooklet).join('\n'), 'tout');
