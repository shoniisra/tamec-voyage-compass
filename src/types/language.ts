
export interface TranslationType {
  nav: {
    home: string;
    destinations: string;
    blog: string;
    contact: string;
    bookNow: string;
    login: string;
    logout: string;
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
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    comments: string;
    commentsSectionTitle: string;
    leaveComment: string;
    yourName: string;
    yourEmail: string;
    yourComment: string;
    submitComment: string;
    loadingComments: string;
    noComments: string;
    commentSubmitted: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
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
