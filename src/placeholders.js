// Short examples for editable text fields, in English, German and Croatian.
const examples={
 name:['Alex Smith','Alex Müller','Alex Horvat'],
 email:['alex@example.com','alex@example.com','alex@example.com'],
 phone:['+49 170 1234567','+49 170 1234567','+385 91 1234567'],
 business:['Studio Bloom','Studio Bloom','Studio Bloom'],
 businessDesc:['A small yoga studio.','Ein kleines Yoga-Studio.','Mali studio za jogu.'],
 description:['A bright, simple site for my studio.','Eine helle, einfache Website für mein Studio.','Svijetla, jednostavna stranica za moj studio.'],
 likes:['Large photos and clear menus.','Große Fotos und klare Menüs.','Velike fotografije i pregledni izbornici.'],
 dislikes:['Dark backgrounds or busy layouts.','Dunkle Hintergründe oder überladene Layouts.','Tamne pozadine ili prenatrpan izgled.'],
 colorDescription:['Warm neutrals with a little green.','Warme Naturtöne mit etwas Grün.','Topli neutralni tonovi s malo zelene.'],
 otherLang:['Italian, French','Italienisch, Französisch','Talijanski, francuski'],
 pageName:['About, Services, Contact','Über mich, Leistungen, Kontakt','O meni, Usluge, Kontakt'],
 pagePurpose:['Introduce my work and experience.','Meine Arbeit und Erfahrung vorstellen.','Predstavi moj rad i iskustvo.'],
 pageHeadline:['A little about me','Ein wenig über mich','Nešto o meni'],
 pageContent:['I help people feel stronger every day.','Ich helfe Menschen, jeden Tag stärker zu werden.','Pomažem ljudima da se svaki dan osjećaju snažnije.'],
 instructions:['Place the photo above the text.','Das Foto über dem Text platzieren.','Postavi fotografiju iznad teksta.'],
 otherFeatures:['A downloadable PDF menu.','Eine Speisekarte als PDF zum Herunterladen.','Jelovnik u PDF-u za preuzimanje.'],
 notes:['I would like to launch in October.','Ich möchte im Oktober starten.','Želim objaviti stranicu u listopadu.'],
 socialUrls:['https://instagram.com/studiobloom','https://instagram.com/studiobloom','https://instagram.com/studiobloom'],
 currentWebsite:['https://example.com','https://example.com','https://example.com'],
 references:['https://example.com/inspiration','https://example.com/inspiration','https://example.com/inspiracija'],
 imageUrls:['https://example.com/photo.jpg','https://example.com/foto.jpg','https://example.com/slika.jpg']
};
export function placeholder(key,lang){return examples[key]?.[['en','de','hr'].indexOf(lang)]||''}
