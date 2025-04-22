
export interface TranslationType {
  nav: {
    home: string;
    destinations: string;
    blog: string;
    contact: string;
    bookNow: string;
    login: string;
    logout: string;
    about: string;
    services: string;
    visaProcessing: string;
    visaProcessingDesc: string;
    flights: string;
    flightsDesc: string;
    toursPrograms: string;
    toursProgramsDesc: string;
    galapagos: string;
    galapagosDesc: string;
    exchangePrograms: string;
    exchangeProgramsDesc: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    exploreCta: string;
    featuredDestinations: string;
    viewAllDestinations: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    packagesTitle: string;
    packagesSubtitle: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    subscribeButton: string;
    emailPlaceholder: string;
  };
  visa: {
    heroTitle: string;
    heroSubtitle: string;
    introduction: {
      title: string;
      subtitle: string;
      experience: string;
      personalizedSupport: string;
      timeSaving: string;
      transparency: string;
    };
    visaTypes: {
      title: string;
      tourist: string;
      study: string;
      work: string;
      business: string;
      transit: string;
      other: string;
      requirements: string;
      estimatedTime: string;
      approximateCosts: string;
      applicableCountries: string;
    };
    countries: {
      title: string;
      subtitle: string;
      usa: string;
      canada: string;
      spain: string;
      uk: string;
      australia: string;
      schengen: string;
      otherCountries: string;
    };
    requirements: {
      title: string;
      subtitle: string;
      validPassport: string;
      recentPhoto: string;
      ds160Form: string;
      employmentLetter: string;
      financialProof: string;
      otherDocuments: string;
    };
    process: {
      title: string;
      subtitle: string;
      initialContact: string;
      documentSubmission: string;
      advisoryFormFilling: string;
      feePayment: string;
      appointmentScheduling: string;
      interviewPreparation: string;
      result: string;
      estimatedTimeline: string;
    };
    faq: {
      title: string;
      approval: {
        question: string;
        answer: string;
      };
      processingTime: {
        question: string;
        answer: string;
      };
      denial: {
        question: string;
        answer: string;
      };
      installments: {
        question: string;
        answer: string;
      };
      interviewHelp: {
        question: string;
        answer: string;
      };
      previousDenial: {
        question: string;
        answer: string;
      };
    };
    testimonials: {
      title: string;
      subtitle: string;
    };
    pricing: {
      title: string;
      subtitle: string;
      basicPackage: string;
      standardPackage: string;
      premiumPackage: string;
      includedServices: string;
    };
    contact: {
      title: string;
      subtitle: string;
      form: string;
      whatsapp: string;
      schedule: string;
      businessHours: string;
    };
    guarantee: {
      title: string;
      subtitle: string;
      policy: string;
    };
    notices: {
      title: string;
      subtitle: string;
      recentChanges: string;
      embassyNews: string;
      scamAlerts: string;
    };
    location: {
      title: string;
      subtitle: string;
      physicalOffice: string;
      onlineService: string;
      coverage: string;
    };
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    commentsSectionTitle: string;
    leaveComment: string;
    yourName: string;
    yourEmail: string;
    yourComment: string;
    submitComment: string;
    loadingComments: string;
    noComments: string;
    commentSubmitted: string;
    posting: string;
    searchPlaceholder: string;
    latestStories: string;
    latestStoriesSubtitle: string;
    noResults: string;
    discoverMore: string;
  };
  contact: {
    title: string;
    subtitle: string;
    findUs: string;
    form: {
      title: string;
      description: string;
      fullName: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      success: string;
      submitError: string;
      emailExists: string;
    };
    infoTitle: string;
    infoAddressLabel: string;
    infoEmailLabel: string;
    infoPhoneLabel: string;
    infoSocialLabel: string;
  };
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    confirmPassword: string;
    welcomeBack: string;
    loginDescription: string;
    createAccount: string;
    registerDescription: string;
    loggingIn: string;
    registering: string;
  };
  theme: {
    light: string;
    dark: string;
    toggle: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    popularDestinations: string;
    contactUs: string;
    rights: string;
    terms: string;
    privacy: string;
  };
  language: {
    english: string;
    spanish: string;
  };
}

export type Language = 'en' | 'es';

export interface Translations {
  [key: string]: any;
}
