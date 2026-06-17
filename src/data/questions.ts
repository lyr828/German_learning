import type { ListeningQuestion, ReadingQuestion, WritingQuestion, SpeakingQuestion } from '@/types'

export const listeningQuestions: ListeningQuestion[] = [
  {
    id: 'listening-1',
    title: 'Telefonanruf',
    description: 'Hören Sie einen Telefonanruf zwischen einem Kunden und einer Mitarbeiterin einer Reiseagentur.',
    examType: 'goethe',
    difficulty: 1,
    duration: 3,
    questions: [
      {
        id: 'lq-1-1',
        question: 'Was möchte der Kunde?',
        options: ['Eine Flugbuchung nach Paris', 'Eine Hotelreservierung in Berlin', 'Eine Zugkarte nach München'],
        correctAnswer: 'Eine Flugbuchung nach Paris'
      },
      {
        id: 'lq-1-2',
        question: 'Wann möchte der Kunde abreisen?',
        options: ['Am nächsten Montag', 'Am nächsten Freitag', 'Am nächsten Sonntag'],
        correctAnswer: 'Am nächsten Freitag'
      },
      {
        id: 'lq-1-3',
        question: 'Wie viel kostet die Flugbuchung?',
        options: ['450 Euro', '550 Euro', '650 Euro'],
        correctAnswer: '550 Euro'
      }
    ]
  },
  {
    id: 'listening-2',
    title: 'Radiointerview',
    description: 'Hören Sie ein Radiointerview mit einem Umweltaktivisten.',
    examType: 'daf',
    difficulty: 2,
    duration: 5,
    questions: [
      {
        id: 'lq-2-1',
        question: 'Was ist das Thema des Interviews?',
        options: ['Klimawandel', 'Energieversorgung', 'Waldschutz'],
        correctAnswer: 'Klimawandel'
      },
      {
        id: 'lq-2-2',
        question: 'Welche Maßnahme schlägt der Aktivist vor?',
        options: ['Mehr Windkraftanlagen', 'Reduzierung des Autoverkehrs', 'Erhöhung der Kohleproduktion'],
        correctAnswer: 'Reduzierung des Autoverkehrs'
      },
      {
        id: 'lq-2-3',
        question: 'Wie viele Jahre hat der Aktivist in dieser Arbeit?',
        options: ['5 Jahre', '10 Jahre', '15 Jahre'],
        correctAnswer: '10 Jahre'
      }
    ]
  },
  {
    id: 'listening-3',
    title: 'Gespräch im Café',
    description: 'Zwei Freunde treffen sich in einem Café und sprechen über ihren Urlaub.',
    examType: 'goethe',
    difficulty: 1,
    duration: 4,
    questions: [
      {
        id: 'lq-3-1',
        question: 'Wo war Anna im Urlaub?',
        options: ['In Italien', 'In Spanien', 'In Griechenland'],
        correctAnswer: 'In Spanien'
      },
      {
        id: 'lq-3-2',
        question: 'Wie lange war sie dort?',
        options: ['Zwei Wochen', 'Drei Wochen', 'Vier Wochen'],
        correctAnswer: 'Drei Wochen'
      },
      {
        id: 'lq-3-3',
        question: 'Was hat sie am meisten gefallen?',
        options: ['Die Strände', 'Die Küche', 'Die Menschen'],
        correctAnswer: 'Die Küche'
      }
    ]
  },
  {
    id: 'listening-4',
    title: 'Podcast über Kunst',
    description: 'Ein Podcast über moderne Kunst und Künstler.',
    examType: 'daf',
    difficulty: 3,
    duration: 6,
    questions: [
      {
        id: 'lq-4-1',
        question: 'Welchen Künstler diskutieren sie?',
        options: ['Picasso', 'Van Gogh', 'Banksy'],
        correctAnswer: 'Banksy'
      },
      {
        id: 'lq-4-2',
        question: 'Was ist charakteristisch für seine Werke?',
        options: ['Ölgemälde', 'Street Art', 'Sculpturen'],
        correctAnswer: 'Street Art'
      },
      {
        id: 'lq-4-3',
        question: 'Wo wurde sein letztes Werk entdeckt?',
        options: ['In London', 'In Paris', 'In Berlin'],
        correctAnswer: 'In London'
      }
    ]
  },
  {
    id: 'listening-5',
    title: 'Ankündigung im Zug',
    description: 'Eine Ankündigung des Zugpersonal über Verspätung.',
    examType: 'goethe',
    difficulty: 1,
    duration: 2,
    questions: [
      {
        id: 'lq-5-1',
        question: 'Warum hat der Zug Verspätung?',
        options: ['Wetterprobleme', 'Technischer Defekt', 'Personalmangel'],
        correctAnswer: 'Technischer Defekt'
      },
      {
        id: 'lq-5-2',
        question: 'Um wie viel Uhr soll der Zug nun ankommen?',
        options: ['14:30', '15:00', '15:30'],
        correctAnswer: '15:30'
      }
    ]
  }
]

export const readingQuestions: ReadingQuestion[] = [
  {
    id: 'reading-1',
    title: 'Bewerbungsschreiben',
    description: 'Lesen Sie ein Bewerbungsschreiben für eine Stelle als Softwareentwickler.',
    examType: 'goethe',
    difficulty: 2,
    duration: 8,
    passage: `Sehr geehrte Damen und Herren,

ich bewerbe mich hiermit um die Stelle als Junior-Softwareentwickler, die ich auf Ihrer Website entdeckt habe.

Im Jahr 2020 habe ich meinen Bachelor in Informatik an der Universität Berlin abgeschlossen. Während meines Studiums habe ich mich intensiv mit Programmierung auseinandergesetzt, besonders mit Java und Python. Ich habe auch Erfahrungen mit Webentwicklung gesammelt, darunter HTML, CSS und JavaScript.

In meiner letzten Praktikum bei der Firma TechSolutions habe ich an einem Projekt zur Optimierung von Datenbankabfragen gearbeitet. Dort habe ich gelernt, wie man in einem Team arbeitet und wie man komplexe Probleme löst.

Ich bin ein Teamplayer mit guten Kommunikationsfähigkeiten und habe Freude am Lernen neuer Technologien. Ich bin überzeugt, dass ich mit meinen Kenntnissen und meiner Motivation einen wertvollen Beitrag zu Ihrem Team leisten kann.

Ich freue mich auf die Möglichkeit, mich persönlich vorzustellen und weitere Fragen zu beantworten.

Mit freundlichen Grüßen,
Max Mustermann`,
    questions: [
      {
        id: 'rq-1-1',
        question: 'Welche Stelle beworbt sich Max Mustermann?',
        options: ['Senior-Softwareentwickler', 'Junior-Softwareentwickler', 'Projektmanager'],
        correctAnswer: 'Junior-Softwareentwickler'
      },
      {
        id: 'rq-1-2',
        question: 'Welche Programmiersprachen beherrscht er?',
        options: ['Java und Python', 'C++ und C#', 'Ruby und PHP'],
        correctAnswer: 'Java und Python'
      },
      {
        id: 'rq-1-3',
        question: 'Wo hat er sein Praktikum gemacht?',
        options: ['Bei TechSolutions', 'Bei Google', 'Bei Microsoft'],
        correctAnswer: 'Bei TechSolutions'
      }
    ]
  },
  {
    id: 'reading-2',
    title: 'Reisebericht',
    description: 'Ein Reisebericht über eine Reise nach Österreich.',
    examType: 'daf',
    difficulty: 2,
    duration: 10,
    passage: `Im letzten Sommer habe ich eine Woche lang in Österreich verbracht. Mein Ziel war es, die Alpen zu erkunden und die österreichische Kultur kennenzulernen.

Zuerst bin ich nach Salzburg gefahren, der Heimatstadt von Mozart. Die Stadt ist wunderschön mit ihren barocken Gebäuden und dem Salzach-Fluss. Ich habe das Geburtshaus von Mozart besucht und ein Konzert in der Mozartkirche gehört.

Danach bin ich in die Alpen gefahren, genauer gesagt nach Kitzbühel. Dort habe ich Wanderungen gemacht und die atemberaubende Landschaft bewundert. Am Abend habe ich in einem traditionellen Gasthof gegessen und österreichische Spezialitäten wie Wiener Schnitzel und Apfelstrudel probiert.

Ein Highlight war der Besuch eines Bauernhofs, wo ich lernen konnte, wie man Käse herstellt. Die österreichische Gastfreundschaft hat mich besonders beeindruckt - überall wurden wir herzlich empfangen.

Ich kann Österreich jedem empfehlen, der die Natur und Kultur liebt. Ich komme bestimmt wieder!`,
    questions: [
      {
        id: 'rq-2-1',
        question: 'Wie lange war der Autor in Österreich?',
        options: ['Eine Woche', 'Zwei Wochen', 'Drei Wochen'],
        correctAnswer: 'Eine Woche'
      },
      {
        id: 'rq-2-2',
        question: 'Welche Stadt ist die Heimatstadt von Mozart?',
        options: ['Wien', 'Salzburg', 'Innsbruck'],
        correctAnswer: 'Salzburg'
      },
      {
        id: 'rq-2-3',
        question: 'Was hat der Autor auf dem Bauernhof gelernt?',
        options: ['Wie man Käse herstellt', 'Wie man Wein macht', 'Wie man Brot backt'],
        correctAnswer: 'Wie man Käse herstellt'
      }
    ]
  },
  {
    id: 'reading-3',
    title: 'Artikel über Umwelt',
    description: 'Ein Artikel über die Bedeutung des Umweltschutzes.',
    examType: 'daf',
    difficulty: 3,
    duration: 12,
    passage: `Der Klimawandel ist eine der größten Herausforderungen unserer Zeit. Die Erderwärmung führt zu erheblichen Veränderungen in der Umwelt: Gletscher schmelzen, Meeresspiegel steigen und Extreme Wetterereignisse wie Stürme und Dürren werden häufiger.

Um diesem Trend entgegenzuwirken, müssen wir sofort handeln. Ein wichtiger Schritt ist die Reduzierung der CO2-Emissionen. Dazu können wir zum Beispiel weniger Auto fahren und mehr öffentliche Verkehrsmittel nutzen. Auch die Nutzung von erneuerbaren Energien wie Wind- und Solarenergie ist entscheidend.

Aber nicht nur die Politik und die Industrie haben eine Verantwortung, auch jeder Einzelne kann etwas tun. Kleine Maßnahmen wie das Recycling von Abfall, das Sparen von Wasser und Energie oder der Kauf von regionalen Produkten können einen Unterschied machen.

Es ist wichtig, dass wir schon heute handeln, um zukünftigen Generationen eine lebenswerte Umwelt zu hinterlassen. Jeder Schritt zählt!`,
    questions: [
      {
        id: 'rq-3-1',
        question: 'Was ist eine Folge des Klimawandels?',
        options: ['Gletscher schmelzen', 'Regenfälle werden seltener', 'Temperaturen sinken'],
        correctAnswer: 'Gletscher schmelzen'
      },
      {
        id: 'rq-3-2',
        question: 'Wie können CO2-Emissionen reduziert werden?',
        options: ['Mehr Auto fahren', 'Weniger öffentliche Verkehrsmittel nutzen', 'Erneuerbare Energien nutzen'],
        correctAnswer: 'Erneuerbare Energien nutzen'
      },
      {
        id: 'rq-3-3',
        question: 'Was kann jeder Einzelne tun?',
        options: ['Mehr Plastik verwenden', 'Recycling von Abfall', 'Mehr Energie verschwenden'],
        correctAnswer: 'Recycling von Abfall'
      }
    ]
  },
  {
    id: 'reading-4',
    title: 'Geschichte eines Unternehmens',
    description: 'Die Geschichte eines deutschen Technologieunternehmens.',
    examType: 'goethe',
    difficulty: 2,
    duration: 10,
    passage: `Die Firma "DigitalTech" wurde im Jahr 2005 von zwei Ingenieuren, Thomas Müller und Anna Schmidt, gegründet. Anfangs arbeiteten sie nur mit fünf Mitarbeitern in einem kleinen Büro in Hamburg.

Ihr erstes Projekt war die Entwicklung einer Software für kleine Unternehmen. Die Software war ein großer Erfolg, und schon nach zwei Jahren konnten sie ihr Team auf 20 Mitarbeiter erweitern.

Im Jahr 2010 eröffnete DigitalTech eine Zweigstelle in Berlin. Dort konzentrierten sie sich auf die Entwicklung von Apps für mobile Geräte. Ihre Apps wurden in über 50 Ländern heruntergeladen.

Heute hat DigitalTech mehr als 200 Mitarbeiter und ist ein führendes Unternehmen in der Branche. Thomas Müller und Anna Schmidt sind stolz auf das, was sie erreicht haben. "Es war eine lange Reise, aber wir haben nie aufgegeben", sagt Müller.`,
    questions: [
      {
        id: 'rq-4-1',
        question: 'Wann wurde DigitalTech gegründet?',
        options: ['2000', '2005', '2010'],
        correctAnswer: '2005'
      },
      {
        id: 'rq-4-2',
        question: 'Wie viele Mitarbeiter hatten sie am Anfang?',
        options: ['5', '10', '20'],
        correctAnswer: '5'
      },
      {
        id: 'rq-4-3',
        question: 'Wo eröffnete sie eine Zweigstelle im Jahr 2010?',
        options: ['Hamburg', 'München', 'Berlin'],
        correctAnswer: 'Berlin'
      }
    ]
  },
  {
    id: 'reading-5',
    title: 'Gesundheitsartikel',
    description: 'Ein Artikel über die Bedeutung von Sport für die Gesundheit.',
    examType: 'goethe',
    difficulty: 1,
    duration: 8,
    passage: `Sport ist nicht nur gut für die Figur, sondern auch für die Gesundheit. Untersuchungen zeigen, dass regelmäßige körperliche Aktivität das Risiko von Herzerkrankungen, Diabetes und bestimmten Krebsarten senkt.

Aber Sport hat auch positive Auswirkungen auf die Psyche. Durch körperliche Bewegung werden Endorphine freigesetzt, die Stimmung heben und Stress reduzieren. Viele Menschen berichten, dass sie nach einem Sporttraining besser schlafen und sich insgesamt energiegeladener fühlen.

Damit Sport effektiv ist, sollte man mindestens 150 Minuten pro Woche moderate Bewegung oder 75 Minuten intensive Bewegung machen. Das kann zum Beispiel ein Spaziergang, Radfahren, Schwimmen oder Joggen sein.

Wichtig ist, dass man Sport macht, der einem Spaß macht. Nur dann bleibt man langfristig motiviert. Also: Raus aus dem Sessel und los!`,
    questions: [
      {
        id: 'rq-5-1',
        question: 'Welches Risiko senkt regelmäßige körperliche Aktivität?',
        options: ['Herzerkrankungen', 'Grippe', 'Allergien'],
        correctAnswer: 'Herzerkrankungen'
      },
      {
        id: 'rq-5-2',
        question: 'Wie viele Minuten moderate Bewegung sollte man pro Woche machen?',
        options: ['100', '150', '200'],
        correctAnswer: '150'
      },
      {
        id: 'rq-5-3',
        question: 'Was wird durch Bewegung freigesetzt?',
        options: ['Insulin', 'Endorphine', 'Adrenalin'],
        correctAnswer: 'Endorphine'
      }
    ]
  }
]

export const writingQuestions: WritingQuestion[] = [
  {
    id: 'writing-1',
    title: 'Einladung zu einem Geburtstag',
    description: 'Schreiben Sie eine E-Mail, um einen Freund zu einem Geburtstag einzuladen.',
    examType: 'goethe',
    difficulty: 1,
    duration: 20,
    wordCount: 80,
    prompt: 'Sie möchten Ihren Freund Lukas zu Ihrem 25. Geburtstag am 15. Mai einladen. Die Party findet in Ihrem Haus ab 18:00 Uhr statt.',
    requirements: [
      'Beginnen Sie mit einer freundlichen Begrüßung',
      'Nennen Sie den Anlass (Geburtstag)',
      'Geben Sie Datum und Uhrzeit an',
      'Bitten Sie ihn, zu bestätigen, ob er kommen kann',
      'Enden Sie mit einem freundlichen Schluss'
    ]
  },
  {
    id: 'writing-2',
    title: 'Beschwerde an einen Hotelier',
    description: 'Schreiben Sie eine Beschwerde an einen Hotelier über die Unterkunft.',
    examType: 'goethe',
    difficulty: 2,
    duration: 30,
    wordCount: 120,
    prompt: 'Sie waren letzte Woche in einem Hotel und waren mit der Unterkunft nicht zufrieden: Das Zimmer war schmutzig, die Heizung funktionierte nicht und das Frühstück war begrenzt.',
    requirements: [
      'Nennen Sie den Grund für die Beschwerde',
      'Beschreiben Sie die Probleme detailliert',
      'Fordern Sie eine Entschädigung',
      'Halten Sie einen höflichen Ton',
      'Geben Sie Ihre Kontaktdaten an'
    ]
  },
  {
    id: 'writing-3',
    title: 'Bericht über ein Projekt',
    description: 'Schreiben Sie einen Bericht über ein Schulprojekt.',
    examType: 'daf',
    difficulty: 3,
    duration: 45,
    wordCount: 150,
    prompt: 'Sie haben im Rahmen eines Schulprojekts eine Umfrage zum Thema "Internetnutzung bei Jugendlichen" durchgeführt. 50 Schüler haben teilgenommen.',
    requirements: [
      'Beschreiben Sie das Projekt',
      'Präsentieren Sie die wichtigsten Ergebnisse',
      'Erklären Sie, was Sie gelernt haben',
      'Machen Sie Vorschläge für zukünftige Projekte',
      'Halten Sie einen formellen Ton'
    ]
  },
  {
    id: 'writing-4',
    title: 'Argumentation zum Thema Sport',
    description: 'Schreiben Sie eine Argumentation zum Thema "Sollte Sport in der Schule verpflichtend sein?"',
    examType: 'daf',
    difficulty: 3,
    duration: 45,
    wordCount: 200,
    prompt: 'Diskutieren Sie die Vor- und Nachteile von verpflichtendem Sport in der Schule und geben Sie Ihre Meinung an.',
    requirements: [
      'Präsentieren Sie Argumente für verpflichtenden Sport',
      'Präsentieren Sie Argumente gegen verpflichtenden Sport',
      'Geben Sie Ihre eigene Meinung an',
      'Halten Sie einen strukturierten Aufbau',
      'Verwenden Sie verschiedene Satzstrukturen'
    ]
  },
  {
    id: 'writing-5',
    title: 'Reisebeschreibung',
    description: 'Schreiben Sie eine Reisebeschreibung über einen Ihrer Urlaube.',
    examType: 'goethe',
    difficulty: 2,
    duration: 30,
    wordCount: 100,
    prompt: 'Beschreiben Sie einen Urlaub, den Sie gemacht haben. Nennen Sie Ort, Zeit und Highlights.',
    requirements: [
      'Nennen Sie Ort und Zeit des Urlaubs',
      'Beschreiben Sie die wichtigsten Aktivitäten',
      'Erklären Sie, was Ihnen am besten gefallen hat',
      'Geben Sie Gründe, warum Sie diesen Urlaub empfehlen',
      'Verwenden Sie beschreibende Sprache'
    ]
  }
]

export const speakingQuestions: SpeakingQuestion[] = [
  {
    id: 'speaking-1',
    title: 'Vorstellung',
    description: 'Stellen Sie sich selbst vor.',
    examType: 'goethe',
    difficulty: 1,
    duration: 5,
    parts: [
      {
        type: 'Selbstvorstellung',
        preparationTime: 1,
        speakingTime: 2,
        prompt: 'Stellen Sie sich vor: Name, Alter, Herkunft, Beruf/Schule, Hobbys'
      },
      {
        type: 'Fragebeantwortung',
        preparationTime: 0,
        speakingTime: 3,
        prompt: 'Beantworten Sie folgende Fragen: Was ist Ihr Lieblingsessen? Warum?',
        notes: ['Begründen Sie Ihre Antwort', 'Erzählen Sie ein kurzes Beispiel']
      }
    ]
  },
  {
    id: 'speaking-2',
    title: 'Bildbeschreibung',
    description: 'Beschreiben Sie ein Bild.',
    examType: 'goethe',
    difficulty: 2,
    duration: 8,
    parts: [
      {
        type: 'Bildbeschreibung',
        preparationTime: 2,
        speakingTime: 3,
        prompt: 'Beschreiben Sie das Bild: eine Familie beim Picknick im Park',
        notes: ['Nennen Sie die Personen', 'Beschreiben Sie die Umgebung', 'Erzählen Sie, was passiert']
      },
      {
        type: 'Diskussion',
        preparationTime: 1,
        speakingTime: 4,
        prompt: 'Diskutieren Sie: Wie wichtig ist es, mit der Familie Zeit zu verbringen?',
        notes: ['Geben Sie Gründe', 'Erzählen Sie von Ihrer Erfahrung']
      }
    ]
  },
  {
    id: 'speaking-3',
    title: 'Meinung äußern',
    description: 'Äußern Sie Ihre Meinung zu einem Thema.',
    examType: 'daf',
    difficulty: 3,
    duration: 10,
    parts: [
      {
        type: 'Themenpräsentation',
        preparationTime: 3,
        speakingTime: 4,
        prompt: 'Präsentieren Sie das Thema: "Die Bedeutung von Social Media im heutigen Leben"',
        notes: ['Vorteile von Social Media', 'Nachteile von Social Media', 'Ihre persönliche Meinung']
      },
      {
        type: 'Fragebeantwortung',
        preparationTime: 0,
        speakingTime: 6,
        prompt: 'Beantworten Sie Fragen zum Thema',
        notes: ['Reagieren Sie auf Fragen', 'Erklären Sie Ihre Position']
      }
    ]
  },
  {
    id: 'speaking-4',
    title: 'Rollenspiel',
    description: 'Machen Sie ein Rollenspiel.',
    examType: 'daf',
    difficulty: 3,
    duration: 12,
    parts: [
      {
        type: 'Rollenspiel',
        preparationTime: 2,
        speakingTime: 6,
        prompt: 'Sie sind ein Kunde in einem Restaurant. Sie möchten etwas bestellen und haben eine Allergie gegen Nüsse.',
        notes: ['Bestellen Sie ein Essen', 'Informieren Sie den Kellner über Ihre Allergie', 'Fragen Sie nach Empfehlungen']
      },
      {
        type: 'Zusammenfassung',
        preparationTime: 1,
        speakingTime: 4,
        prompt: 'Zusammenfassen Sie, was passiert ist',
        notes: ['Nennen Sie die wichtigsten Punkte', 'Erklären Sie, wie Sie mit der Situation umgegangen sind']
      }
    ]
  },
  {
    id: 'speaking-5',
    title: 'Erzählung',
    description: 'Erzählen Sie eine Geschichte.',
    examType: 'goethe',
    difficulty: 2,
    duration: 8,
    parts: [
      {
        type: 'Erzählung',
        preparationTime: 2,
        speakingTime: 4,
        prompt: 'Erzählen Sie eine Geschichte über einen unvergesslichen Tag',
        notes: ['Beginnen Sie mit dem Anfang', 'Beschreiben Sie die wichtigsten Ereignisse', 'Enden Sie mit dem Ende']
      },
      {
        type: 'Reflexion',
        preparationTime: 1,
        speakingTime: 3,
        prompt: 'Warum war dieser Tag unvergesslich für Sie?',
        notes: ['Geben Sie Gründe', 'Erklären Sie, was Sie gelernt haben']
      }
    ]
  }
]