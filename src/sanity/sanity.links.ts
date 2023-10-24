export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'homePage':
      return '/';
    // case 'aboutPage':
    //   return '/about';
    // case 'founderPage':
    //   return '/founder';
    // case 'partnersPage':
    //   return '/partners';
    // case 'sponsorsPage':
    //   return '/sponsors';
    // case 'calendarPage':
    //   return '/calendar';
    // case 'galleryPage':
    //   return '/gallery';
    // case 'contactPage':
    //   return '/contact';
    // case 'announcement':
    //   return '/';
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}
