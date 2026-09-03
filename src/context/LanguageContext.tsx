import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

export type Language = "en" | "am" | "de";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    churchName: "St. Mark Church",
    home: "Home",
    news: "News",
    contact: "Contact",
    welcomeTitle: "Welcome to St. Mark Church",
    welcomeIntro: "A vibrant Ethiopian Orthodox community dedicated to worship, fellowship, and service. We gather together in faith and extend compassion to our neighbors.",
    ourServices: "Our Services",
    servicesIntro: "We offer a variety of programs and services to support your spiritual journey and connect with our community.",
    aboutOurCommunity: "About Our Community",
    watchOurVideo: "Watch Our Services",
    ourFaithTitle: "Our Faith",
    ourFaithBody: "We are part of the Ethiopian Orthodox Tewahedo Church, one of the oldest Christian traditions, with roots dating back to the apostolic age.",
    ourCommunityTitle: "Our Community",
    ourCommunityBody: "St. Mark Church in Wuerzburg is a thriving multicultural community that welcomes all people regardless of their background.",
    sundayWorshipTitle: "Sunday Worship",
    sundayWorshipDesc: "Join us every Sunday at 10:00 AM for our main service. All are welcome.",
    prayerServicesTitle: "Prayer Services",
    prayerServicesDesc: "Midweek prayer meetings and spiritual discussions. Wednesday evenings at 7:00 PM.",
    youthProgramsTitle: "Youth Programs",
    youthProgramsDesc: "Programs for young people to grow in faith and community. Friday at 6:30 PM.",
    communityServiceTitle: "Community Service",
    communityServiceDesc: "We serve the community through various outreach and charitable initiatives.",
    churchNewsAndUpdates: "Church News and Updates",
    searchNews: "Search news...",
    all: "All",
    Events: "Events",
    Community: "Community",
    Youth: "Youth",
    Worship: "Worship",
    noNewsFound: "No news items found.",
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    address: "Address",
    phone: "Phone",
    email: "Email",
    website: "Website",
    serviceTimes: "Service Times",
    sunday: "Sunday",
    wednesday: "Wednesday",
    friday: "Friday",
    sendUsAMessage: "Send us a Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    message: "Message",
    sendMessage: "Send Message",
    sending: "Sending...",
    messageSuccess: "Thank you for your message! We will get back to you soon.",
    messageError: "Sorry, your message could not be sent. Please try again later.",
    loading: "Loading...",
    errorLoadingContact: "Error loading contact information",
    copyright: "© 2026 St. Mark Church Würzburg. All rights reserved.",
    footerWelcome: "Everyone is welcome. 📍 Würzburg, Germany"
  },
  am: {
    churchName: "ቅዱስ ማርቆስ ቤተክርስቲያን",
    home: "ዋና ገጽ",
    news: "ዜና",
    contact: "ያግኙን",
    welcomeTitle: "ወደ ቅዱስ ማርቆስ ቤተክርስቲያን በደህና መጡ",
    welcomeIntro: "ለአምልኮ፣ ለኅብረት እና ለአገልግሎት የተሰጠ ንቁ የኢትዮጵያ ኦርቶዶክስ ማህበረሰብ። በእምነት እንሰበሰባለን እንዲሁም ለጎረቤቶቻችን ርህራሄን እንዘረጋለን።",
    ourServices: "አገልግሎቶቻችን",
    servicesIntro: "መንፈሳዊ ጉዞዎን ለመደገፍ እና ከማህበረሰባችን ጋር ለመገናኘት የተለያዩ ፕሮግራሞችን እና አገልግሎቶችን እናቀርባለን።",
    aboutOurCommunity: "ስለ ማህበረሰባችን",
    watchOurVideo: "አገልግሎቶቻችን ይመልከቱ",
    ourFaithTitle: "እምነታችን",
    ourFaithBody: "እኛ ከሐዋርያት ዘመን ጀምሮ ሥር ካላቸው ጥንታዊ የክርስትና እምነቶች አንዱ የሆነው የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን አካል ነን።",
    ourCommunityTitle: "ማህበረሰባችን",
    ourCommunityBody: "በዉርዝቡርግ የሚገኘው የቅዱስ ማርቆስ ቤተክርስቲያን ማንነታቸው ሳይለይ ሁሉንም ሰው የሚቀበል የበለፀገ የመድብለ ባህል ማህበረሰብ ነው።",
    sundayWorshipTitle: "የእሁድ አምልኮ",
    sundayWorshipDesc: "በየእሁዱ ጠዋት 10:00 ላይ ለዋናው አገልግሎታችን ይቀላቀሉን። ሁሉም እንኳን ደህና መጡ።",
    prayerServicesTitle: "የጸሎት አገልግሎቶች",
    prayerServicesDesc: "የእኩለ ሳምንት የጸሎት ስብሰባዎች እና መንፈሳዊ ውይይቶች። እሮብ ምሽት 7:00 ሰዓት።",
    youthProgramsTitle: "የወጣቶች ፕሮግራሞች",
    youthProgramsDesc: "ወጣቶች በእምነት እና በማህበረሰብ እንዲያድጉ የሚያግዙ ፕሮግራሞች። አርብ ከምሽቱ 12:30 ሰዓት።",
    communityServiceTitle: "የማህበረሰብ አገልግሎት",
    communityServiceDesc: "በተለያዩ የበጎ አድራጎት ስራዎች እና ረድኤት ማህበረሰቡን እናገለግላለን።",
    churchNewsAndUpdates: "የቤተክርስቲያን ዜና እና መረጃዎች",
    searchNews: "ዜና ፈልግ...",
    all: "ሁሉም",
    Events: "ክስተቶች",
    Community: "ማህበረሰብ",
    Youth: "ወጣቶች",
    Worship: "አምልኮ",
    noNewsFound: "ምንም የዜና መረጃ አልተገኘም።",
    contactUs: "ያግኙን",
    getInTouch: "ይገናኙን",
    address: "አድራሻ",
    phone: "ስልክ",
    email: "ኢሜል",
    website: "ድረ-ገጽ",
    serviceTimes: "የአገልግሎት ሰዓታት",
    sunday: "እሁድ",
    wednesday: "ረቡዕ",
    friday: "አርብ",
    sendUsAMessage: "መልዕክት ይላኩልን",
    yourName: "ስምዎ",
    yourEmail: "ኢሜልዎ",
    message: "መልዕክት",
    sendMessage: "መልዕክት ላክ",
    sending: "በመላክ ላይ...",
    messageSuccess: "ለላኩልን መልዕክት እናመሰግናለን! በቅርቡ ምላሽ እንሰጥዎታለን።",
    messageError: "ይቅርታ፣ መልዕክትዎ መላክ አልተቻለም። እባክዎ በኋላ እንደገና ይሞክሩ።",
    loading: "በመጫን ላይ...",
    errorLoadingContact: "የእውቂያ መረጃን መጫን አልተቻለም",
    copyright: "© 2026 የቅዱስ ማርቆስ ቤተክርስቲያን ዉርዝቡርግ። መብቱ በህግ የተጠበቀ ነው።",
    footerWelcome: "ሁሉም ሰው እንኳን ደህና መጣ። 📍 ዉርዝቡርግ፣ ጀርመን"
  },
  de: {
    churchName: "St. Markus Kirche",
    home: "Startseite",
    news: "Neuigkeiten",
    contact: "Kontakt",
    welcomeTitle: "Willkommen in der St. Markus Kirche",
    welcomeIntro: "Eine lebendige äthiopisch-orthodoxe Gemeinde, die sich der Anbetung, Gemeinschaft und dem Dienst widmet. Wir kommen im Glauben zusammen und begegnen unseren Nächsten mit Mitgefühl.",
    ourServices: "Unsere Dienste",
    servicesIntro: "Wir bieten eine Vielzahl von Programmen und Diensten an, um Ihre geistliche Reise zu unterstützen und Sie mit unserer Gemeinde zu verbinden.",
    aboutOurCommunity: "Über unsere Gemeinde",
    watchOurVideo: "Unsere Dienste ansehen",
    ourFaithTitle: "Unser Glaube",
    ourFaithBody: "Wir sind Teil der Äthiopisch-Orthodoxen Tewahedo-Kirche, einer der ältesten christlichen Traditionen, deren Wurzeln bis in die apostolische Zeit zurückreichen.",
    ourCommunityTitle: "Unsere Gemeinschaft",
    ourCommunityBody: "Die St. Markus Kirche in Würzburg ist eine blühende multikulturelle Gemeinschaft, die alle Menschen unabhängig von ihrer Herkunft willkommen heißt.",
    sundayWorshipTitle: "Sonntagsgottesdienst",
    sundayWorshipDesc: "Begleiten Sie uns jeden Sonntag um 10:00 Uhr zu unserem Hauptgottesdienst. Alle sind willkommen.",
    prayerServicesTitle: "Gebetsdienste",
    prayerServicesDesc: "Gebetstreffen und geistliche Gespräche unter der Woche. Mittwochsabends um 19:00 Uhr.",
    youthProgramsTitle: "Jugendprogramme",
    youthProgramsDesc: "Programme für junge Menschen, um im Glauben und in der Gemeinschaft zu wachsen. Freitags um 18:30 Uhr.",
    communityServiceTitle: "Gemeinschaftsdienst",
    communityServiceDesc: "Wir dienen der Gemeinschaft durch verschiedene Hilfs- und Wohltätigkeitsinitiativen.",
    churchNewsAndUpdates: "Kirchennachrichten und Neuigkeiten",
    searchNews: "Neuigkeiten suchen...",
    all: "Alle",
    Events: "Veranstaltungen",
    Community: "Gemeinschaft",
    Youth: "Jugend",
    Worship: "Gottesdienst",
    noNewsFound: "Keine Neuigkeiten gefunden.",
    contactUs: "Kontaktieren Sie uns",
    getInTouch: "In Kontakt treten",
    address: "Adresse",
    phone: "Telefon",
    email: "E-Mail",
    website: "Webseite",
    serviceTimes: "Dienstzeiten",
    sunday: "Sonntag",
    wednesday: "Mittwoch",
    friday: "Freitag",
    sendUsAMessage: "Schreiben Sie uns",
    yourName: "Ihr Name",
    yourEmail: "Ihre E-Mail",
    message: "Nachricht",
    sendMessage: "Nachricht senden",
    sending: "Wird gesendet...",
    messageSuccess: "Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.",
    messageError: "Entschuldigung, Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
    loading: "Wird geladen...",
    errorLoadingContact: "Fehler beim Laden der Kontaktinformationen",
    copyright: "© 2026 St. Markus Kirche Würzburg. Alle Rechte vorbehalten.",
    footerWelcome: "Jeder ist herzlich willkommen. 📍 Würzburg, Deutschland"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("am");

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
