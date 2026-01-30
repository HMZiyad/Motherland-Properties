export type Language = 'en' | 'bn';

export type TranslationKey =
  | 'nav.home' | 'nav.projects' | 'nav.emi' | 'nav.amenities' | 'nav.trust' | 'nav.about' | 'nav.contact' | 'nav.nrb'
  | 'nav.career' | 'nav.news' | 'nav.gallery'
  | 'hero.title' | 'hero.subtitle' | 'hero.cta' | 'hero.explore'
  | 'stats.plots' | 'stats.customers' | 'stats.years' | 'stats.projects'
  | 'projects.title' | 'projects.subtitle' | 'projects.nimtola' | 'projects.purbachal' | 'projects.viewDetails'
  | 'projects.available' | 'projects.booked' | 'projects.sold' | 'projects.filterTitle'
  | 'emi.title' | 'emi.subtitle' | 'emi.plotValue' | 'emi.downPayment' | 'emi.tenure' | 'emi.months'
  | 'emi.calculate' | 'emi.monthly' | 'emi.total' | 'emi.print' | 'emi.share'
  | 'amenities.title' | 'amenities.subtitle' | 'amenities.schools' | 'amenities.mosques' | 'amenities.parks'
  | 'amenities.healthcare' | 'amenities.markets' | 'amenities.transport'
  | 'trust.title' | 'trust.subtitle' | 'trust.rajuk' | 'trust.rehab' | 'trust.environmental' | 'trust.records'
  | 'trust.timeline' | 'trust.booking' | 'trust.downpayment' | 'trust.registration' | 'trust.handover'
  | 'about.title' | 'about.subtitle' | 'about.vision' | 'about.mission' | 'about.whyUs' | 'about.history'
  | 'contact.title' | 'contact.subtitle' | 'contact.name' | 'contact.email' | 'contact.phone' | 'contact.message'
  | 'contact.send' | 'contact.inquiry' | 'contact.nrbTitle' | 'contact.nrbSubtitle'
  | 'nrb.title' | 'nrb.subtitle' | 'nrb.virtualTour' | 'nrb.specialPayment' | 'nrb.dedicatedSupport'
  | 'footer.rights' | 'footer.address' | 'footer.followUs'
  | 'common.learnMore' | 'common.viewAll' | 'common.backToTop';

type Translations = {
  [key in Language]: {
    [k in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.emi': 'EMI Calculator',
    'nav.amenities': 'Amenities',
    'nav.trust': 'Trust Center',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.nrb': 'NRB Corner',
    'nav.career': 'Career',
    'nav.news': 'News & Events',
    'nav.gallery': 'Gallery',

    // Hero
    'hero.title': 'Build Your Dream Home',
    'hero.subtitle': 'Premium residential plots in Dhaka\'s most promising locations with RAJUK approval and complete legal documentation',
    'hero.cta': 'Explore Projects',
    'hero.explore': 'Calculate EMI',

    // Stats
    'stats.plots': 'Plots Sold',
    'stats.customers': 'Happy Families',
    'stats.years': 'Years of Trust',
    'stats.projects': 'Active Projects',

    // Projects
    'projects.title': 'Our Projects',
    'projects.subtitle': 'Discover premium residential plots in prime locations',
    'projects.nimtola': 'Nimtola Smart City',
    'projects.purbachal': 'Purbachal Iconic Lake City',
    'projects.viewDetails': 'View Details',
    'projects.available': 'Available',
    'projects.booked': 'Booked',
    'projects.sold': 'Sold',
    'projects.filterTitle': 'Filter Plots',

    // EMI Calculator
    'emi.title': 'EMI Calculator',
    'emi.subtitle': 'Calculate your monthly installments',
    'emi.plotValue': 'Plot Value (BDT)',
    'emi.downPayment': 'Down Payment (%)',
    'emi.tenure': 'Installment Period',
    'emi.months': 'months',
    'emi.calculate': 'Calculate',
    'emi.monthly': 'Monthly EMI',
    'emi.total': 'Total Amount',
    'emi.print': 'Print Quote',
    'emi.share': 'Share',

    // Amenities
    'amenities.title': 'Civic Amenities',
    'amenities.subtitle': 'Everything you need within reach',
    'amenities.schools': 'Schools & Colleges',
    'amenities.mosques': 'Mosques & Prayer Spaces',
    'amenities.parks': 'Parks & Lake Views',
    'amenities.healthcare': 'Healthcare Facilities',
    'amenities.markets': 'Shopping & Markets',
    'amenities.transport': 'Transport Links',

    // Trust Center
    'trust.title': 'Trust & Documentation',
    'trust.subtitle': 'Complete legal transparency',
    'trust.rajuk': 'RAJUK Approved',
    'trust.rehab': 'REHAB Member',
    'trust.environmental': 'Environmental Clearance',
    'trust.records': 'Land Records (CS, RS, BS)',
    'trust.timeline': 'Purchase Timeline',
    'trust.booking': 'Booking',
    'trust.downpayment': 'Down Payment',
    'trust.registration': 'Registration',
    'trust.handover': 'Handover',

    // About
    'about.title': 'About Motherland Properties',
    'about.subtitle': 'Building dreams since 2010',
    'about.vision': 'Our Vision',
    'about.mission': 'Our Mission',
    'about.whyUs': 'Why Choose Us',
    'about.history': 'Our Journey',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'We\'re here to help you find your perfect plot',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.inquiry': 'Inquiry Type',
    'contact.nrbTitle': 'NRB Dedicated Support',
    'contact.nrbSubtitle': 'Special assistance for overseas Bangladeshis',

    // NRB
    'nrb.title': 'NRB Corner',
    'nrb.subtitle': 'Special services for Non-Resident Bangladeshis',
    'nrb.virtualTour': 'Virtual Site Visit',
    'nrb.specialPayment': 'Flexible Payment Options',
    'nrb.dedicatedSupport': '24/7 Dedicated Support',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.address': 'Dhaka, Bangladesh',
    'footer.followUs': 'Follow Us',

    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.backToTop': 'Back to Top',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.projects': 'প্রকল্প সমূহ',
    'nav.emi': 'কিস্তি ক্যালকুলেটর',
    'nav.amenities': 'নাগরিক সুবিধা',
    'nav.trust': 'আইনি নথিপত্র',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.contact': 'যোগাযোগ',
    'nav.nrb': 'প্রবাসী কর্নার',
    'nav.career': 'ক্যারিয়ার',
    'nav.news': 'সংবাদ ও ইভেন্ট',
    'nav.gallery': 'গ্যালারি',

    // Hero
    'hero.title': 'আপনার স্বপ্নের বাড়ি তৈরি করুন',
    'hero.subtitle': 'রাজউক অনুমোদিত এবং সম্পূর্ণ আইনি ডকুমেন্টেশন সহ ঢাকার সবচেয়ে সম্ভাবনাময় অবস্থানে প্রিমিয়াম আবাসিক প্লট',
    'hero.cta': 'প্রকল্প দেখুন',
    'hero.explore': 'কিস্তি হিসাব করুন',

    // Stats
    'stats.plots': 'প্লট বিক্রি হয়েছে',
    'stats.customers': 'সুখী পরিবার',
    'stats.years': 'বছরের বিশ্বাস',
    'stats.projects': 'চলমান প্রকল্প',

    // Projects
    'projects.title': 'আমাদের প্রকল্প সমূহ',
    'projects.subtitle': 'প্রাইম লোকেশনে প্রিমিয়াম আবাসিক প্লট আবিষ্কার করুন',
    'projects.nimtola': 'নিমতলা স্মার্ট সিটি',
    'projects.purbachal': 'পূর্বাচল আইকনিক লেক সিটি',
    'projects.viewDetails': 'বিস্তারিত দেখুন',
    'projects.available': 'খালি আছে',
    'projects.booked': 'বুকড',
    'projects.sold': 'বিক্রি হয়েছে',
    'projects.filterTitle': 'প্লট ফিল্টার করুন',

    // EMI Calculator
    'emi.title': 'কিস্তি ক্যালকুলেটর',
    'emi.subtitle': 'আপনার মাসিক কিস্তি হিসাব করুন',
    'emi.plotValue': 'প্লটের মূল্য (টাকা)',
    'emi.downPayment': 'ডাউন পেমেন্ট (%)',
    'emi.tenure': 'কিস্তির মেয়াদ',
    'emi.months': 'মাস',
    'emi.calculate': 'হিসাব করুন',
    'emi.monthly': 'মাসিক কিস্তি',
    'emi.total': 'মোট পরিমাণ',
    'emi.print': 'প্রিন্ট করুন',
    'emi.share': 'শেয়ার',

    // Amenities
    'amenities.title': 'নাগরিক সুবিধা',
    'amenities.subtitle': 'আপনার প্রয়োজনীয় সবকিছু হাতের নাগালে',
    'amenities.schools': 'স্কুল ও কলেজ',
    'amenities.mosques': 'মসজিদ ও নামাজের স্থান',
    'amenities.parks': 'পার্ক ও লেক ভিউ',
    'amenities.healthcare': 'স্বাস্থ্যসেবা কেন্দ্র',
    'amenities.markets': 'শপিং ও বাজার',
    'amenities.transport': 'পরিবহন সংযোগ',

    // Trust Center
    'trust.title': 'বিশ্বাস ও ডকুমেন্টেশন',
    'trust.subtitle': 'সম্পূর্ণ আইনি স্বচ্ছতা',
    'trust.rajuk': 'রাজউক অনুমোদিত',
    'trust.rehab': 'রিহ্যাব সদস্য',
    'trust.environmental': 'পরিবেশ ছাড়পত্র',
    'trust.records': 'জমির রেকর্ড (সিএস, আরএস, বিএস)',
    'trust.timeline': 'ক্রয় টাইমলাইন',
    'trust.booking': 'বুকিং',
    'trust.downpayment': 'ডাউন পেমেন্ট',
    'trust.registration': 'রেজিস্ট্রেশন',
    'trust.handover': 'হস্তান্তর',

    // About
    'about.title': 'মাদারল্যান্ড প্রপার্টিজ সম্পর্কে',
    'about.subtitle': '২০১০ সাল থেকে স্বপ্ন বাস্তবায়ন করছি',
    'about.vision': 'আমাদের ভিশন',
    'about.mission': 'আমাদের মিশন',
    'about.whyUs': 'কেন আমাদের বেছে নেবেন',
    'about.history': 'আমাদের যাত্রা',

    // Contact
    'contact.title': 'যোগাযোগ করুন',
    'contact.subtitle': 'আপনার পারফেক্ট প্লট খুঁজে পেতে আমরা এখানে আছি',
    'contact.name': 'আপনার নাম',
    'contact.email': 'ইমেইল ঠিকানা',
    'contact.phone': 'ফোন নম্বর',
    'contact.message': 'আপনার বার্তা',
    'contact.send': 'বার্তা পাঠান',
    'contact.inquiry': 'জিজ্ঞাসার ধরন',
    'contact.nrbTitle': 'প্রবাসী ডেডিকেটেড সাপোর্ট',
    'contact.nrbSubtitle': 'বিদেশে থাকা বাংলাদেশিদের জন্য বিশেষ সহায়তা',

    // NRB
    'nrb.title': 'প্রবাসী কর্নার',
    'nrb.subtitle': 'প্রবাসী বাংলাদেশিদের জন্য বিশেষ সেবা',
    'nrb.virtualTour': 'ভার্চুয়াল সাইট ভিজিট',
    'nrb.specialPayment': 'নমনীয় পেমেন্ট অপশন',
    'nrb.dedicatedSupport': '২৪/৭ ডেডিকেটেড সাপোর্ট',

    // Footer
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত',
    'footer.address': 'ঢাকা, বাংলাদেশ',
    'footer.followUs': 'আমাদের অনুসরণ করুন',

    // Common
    'common.learnMore': 'আরও জানুন',
    'common.viewAll': 'সব দেখুন',
    'common.backToTop': 'উপরে যান',
  },
};
