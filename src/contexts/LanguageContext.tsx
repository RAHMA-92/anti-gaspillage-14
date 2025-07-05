
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // App
    appTitle: "Anti-Gaspi DZ",
    appSubtitle: "Réduire le gaspillage en Algérie",
    
    // Navigation
    home: "Accueil",
    products: "Produits",
    addProduct: "Ajouter produit",
    messages: "Messages",
    profile: "Profil",
    settings: "Paramètres",
    categories: "Catégories",
    
    // Welcome page
    welcome: "Bienvenue sur Anti-Gaspi DZ",
    welcomeDescription: "Rejoignez notre communauté pour réduire le gaspillage alimentaire en Algérie",
    signIn: "Se connecter",
    signUp: "S'inscrire",
    
    // Sign up
    joinUs: "Rejoignez-nous !",
    createAccountDescription: "Créez votre compte et commencez à partager dès maintenant",
    signUpWithGoogle: "S'inscrire avec Google",
    orCreateAccount: "Ou créer un compte",
    fullName: "Nom complet",
    fullNamePlaceholder: "Ahmed Benali",
    emailPlaceholder: "votre@email.com",
    phonePlaceholder: "+213 555 123 456",
    cityPlaceholder: "Alger",
    addPhoto: "Ajouter une photo",
    changePhoto: "Changer la photo",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    passwordRequirement: "Au moins 8 caractères",
    createFreeAccount: "Créer mon compte gratuitement",
    creatingAccount: "Création du compte...",
    termsAcceptance: "En créant un compte, vous acceptez nos conditions d'utilisation",
    alreadyHaveAccount: "Déjà un compte ?",
    backToHome: "Retour à l'accueil",
    
    // Home page
    heroTitle: "Réduisons le gaspillage ensemble",
    heroDescription: "Donnez une seconde vie à vos produits proches de leur date de péremption. Partagez, échangez et contribuez à un Algérie plus durable.",
    welcomeBack: "Bienvenue",
    readyToShare: "Prêt à faire une différence dans votre communauté ?",
    getStarted: "Commencer",
    browseProducts: "Parcourir les produits",
    howItWorks: "Comment ça marche",
    howItWorksDescription: "Notre plateforme facilite le partage et la réduction du gaspillage en trois étapes simples",
    categoriesDescription: "Explorez les différentes catégories de produits disponibles",
    realTimeImpact: "Impact en temps réel",
    communityImpact: "Voici l'impact de notre communauté",
    
    // How it works
    step1Title: "1. Partagez vos produits",
    step1Description: "Photographiez et décrivez les produits que vous souhaitez partager. Ajoutez la localisation et les détails importants.",
    step2Title: "2. Trouvez et réservez",
    step2Description: "Parcourez les produits disponibles près de chez vous et réservez ceux qui vous intéressent.",
    step3Title: "3. Échangez et récupérez",
    step3Description: "Contactez les propriétaires pour organiser la récupération et créez des liens dans votre communauté.",
    
    // Stats
    sharedProducts: "Produits partagés",
    totalAvailableWeight: "Poids total disponible",
    activeUsers: "Utilisateurs actifs",
    wasteAvoided: "Gaspillage évité",
    reservedProducts: "Produits réservés",
    
    // Categories
    preparedMeals: "Plats préparés",
    pastries: "Pâtisseries",
    bakery: "Boulangeries",
    restaurants: "Restaurants",
    cosmetics: "Cosmétiques et produits parapharmaceutiques",
    pharmacy: "Produits pharmaceutiques",
    school: "Fournitures scolaires",
    tableware: "Vaisselles",
    clothing: "Vêtements",
    rawMaterials: "Matières premières",
    donations: "Objets à donner ou dons solidaires",
    
    // Add Product
    addProductDescription: "Partagez vos produits pour éviter le gaspillage",
    newProduct: "Nouveau produit",
    fillProductInfo: "Remplissez les informations de votre produit",
    productName: "Nom du produit",
    productNamePlaceholder: "Ex: Pain artisanal, Légumes frais...",
    category: "Catégorie",
    selectCategory: "Sélectionner une catégorie",
    expiryDate: "Date de péremption",
    location: "Localisation",
    locationPlaceholder: "Ex: Alger Centre, Oran...",
    price: "Prix",
    optional: "optionnel",
    pricePlaceholder: "Ex: Gratuit, 50 DA...",
    description: "Description",
    descriptionPlaceholder: "Décrivez votre produit (optionnel)",
    image: "Image",
    clickToAddPhoto: "Cliquez pour ajouter une photo",
    photoFormat: "JPG, PNG ou GIF (max. 5MB)",
    cancel: "Annuler",
    publish: "Publier",
    selectWilaya: "Sélectionnez votre wilaya",
    
    // Products page
    discoverProducts: "Découvrez les produits disponibles",
    discoverProductsDescription: "Trouvez des produits près de chez vous et contribuez à réduire le gaspillage",
    search: "Rechercher des produits...",
    allCategories: "Toutes les catégories",
    allProducts: "Tous les produits",
    filter: "Filtrer",
    reserve: "Réserver",
    contact: "Contacter",
    expiresOn: "Expire le",
    noProductsFound: "Aucun produit trouvé",
    tryModifyingFilters: "Essayez de modifier vos critères de recherche",
    clearFilters: "Effacer les filtres",
    freeDonations: "Dons gratuits disponibles",
    donationsAvailable: "dons disponibles",
    viewDonations: "Voir les dons",
    closeList: "Fermer la liste",
    yourProduct: "Votre produit",
    product: "Produit",
    
    // Contact dialog
    contactOwner: "Contacter le propriétaire",
    owner: "Propriétaire",
    messageContent: "Contenu du message",
    sendMessage: "Envoyer le message",
    
    // Profile
    personalInfo: "Informations personnelles",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    city: "Ville",
    saveChanges: "Enregistrer les modifications",
    mySharedProducts: "Mes partages",
    myDonations: "Mes dons",
    noSharedProducts: "Aucun produit partagé",
    noDonations: "Aucun don effectué",
    shareFirstProduct: "Partagez votre premier produit pour aider la communauté !",
    makeDonation: "Partagez un produit gratuit pour aider quelqu'un !",
    goToProducts: "Aller aux produits",
    startSharing: "Commencer à partager",
    
    // Settings
    settingsTitle: "Paramètres",
    settingsDescription: "Gérez vos préférences et paramètres de compte",
    language: "Langue",
    french: "Français",
    arabic: "العربية",
    notifications: "Notifications",
    newProducts: "Nouveaux produits",
    expirationReminders: "Rappels d'expiration",
    account: "Compte",
    exportData: "Exporter mes données",
    deleteAccount: "Supprimer le compte",
    help: "Aide et Support",
    helpCenter: "Centre d'aide",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    chooseLanguage: "Choisissez votre langue préférée",
    interfaceLanguage: "Langue de l'interface",
    manageNotifications: "Gérez vos préférences de notifications",
    newProductsDesc: "Recevez des notifications pour les nouveaux produits dans votre région",
    messagesNotif: "Messages",
    messagesDesc: "Recevez des notifications pour les nouveaux messages",
    expiryReminders: "Rappels d'expiration",
    expiryRemindersDesc: "Recevez des rappels avant l'expiration de vos produits",
    privacy: "Confidentialité",
    privacyDesc: "Contrôlez vos informations personnelles et leur visibilité",
    locationSharing: "Partage de localisation",
    locationSharingDesc: "Autorisez l'application à utiliser votre localisation pour améliorer l'expérience",
    contactPermission: "Permission de contact",
    contactPermissionDesc: "Permettez aux autres utilisateurs de vous contacter via l'application",
    profileVisibility: "Visibilité du profil",
    profileVisibilityDesc: "Contrôlez qui peut voir vos informations de profil",
    helpSupport: "Aide et Support",
    contactUs: "Nous contacter",
    accountActions: "Actions du compte",
    
    // Messages
    messagesTitle: "Messages",
    searchConversations: "Rechercher des conversations...",
    noConversations: "Aucune conversation",
    startConversation: "Commencez une nouvelle conversation en contactant un propriétaire de produit",
    typeMessage: "Tapez votre message...",
    send: "Envoyer",
    you: "Vous",
    
    // Reserved Products
    reservedProductsTitle: "Mes produits réservés",
    reservedProductsDesc: "Suivez vos réservations et organisez la récupération de vos produits",
    noReservedProducts: "Aucun produit réservé",
    noReservedProductsDesc: "Vous n'avez pas encore réservé de produits. Parcourez notre catalogue pour découvrir des produits disponibles.",
    reserved: "Réservé",
    sharedBy: "Partagé par",
    reservedOn: "Réservé le",
    expiryLimit: "Date limite",
    
    // Toast messages and errors
    reservedSuccess: "a été réservé avec succès",
    productReservedSuccess: "Vous pouvez maintenant contacter le propriétaire pour organiser la récupération",
    messageSent: "Message envoyé",
    messageDelivered: "Votre message a été délivré",
    messageRequired: "Veuillez saisir un message",
    imageAdded: "Image ajoutée",
    addedSuccessfully: "ajoutée avec succès",
    error: "Erreur",
    fillRequiredFields: "Veuillez remplir tous les champs obligatoires",
    productAdded: "Produit ajouté !",
    productPublishedSuccess: "Votre produit a été publié avec succès",
    errorAddingProduct: "Une erreur est survenue lors de l'ajout du produit",
    profileUpdated: "Profil mis à jour",
    profileUpdateSuccess: "Vos informations ont été mises à jour avec succès",
    free: "Gratuit",
    loginRequired: "Connexion requise",
    loginRequiredDescription: "Vous devez être connecté pour effectuer cette action",
    cannotReserveOwnProduct: "Action impossible",
    cannotReserveOwnProductDescription: "Vous ne pouvez pas réserver votre propre produit",
    alreadyReserved: "Déjà réservé",
    productAlreadyReserved: "Ce produit a déjà été réservé par quelqu'un d'autre",
    cannotContactYourself: "Action impossible",
    cannotContactYourselfDescription: "Vous ne pouvez pas vous contacter vous-même",
    reservationMessage: "Bonjour ! Je suis intéressé(e) par votre produit '{productName}'. Quand puis-je le récupérer ?",
    quickActions: "Actions Rapides",
    addProductButton: "Ajouter un produit",
    addProductDesc: "Partagez vos produits avec la communauté",
    myMessagesButton: "Mes Messages",
    myMessagesDesc: "Communiquez avec les autres utilisateurs",
  },
  ar: {
    // App
    appTitle: "مكافح الهدر الجزائر",
    appSubtitle: "تقليل الهدر في الجزائر",
    
    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    addProduct: "إضافة منتج",
    messages: "الرسائل",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    categories: "الفئات",
    
    // Welcome page
    welcome: "مرحباً بكم في مكافح الهدر الجزائر",
    welcomeDescription: "انضموا إلى مجتمعنا لتقليل هدر الطعام في الجزائر",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    
    // Sign up
    joinUs: "انضم إلينا !",
    createAccountDescription: "أنشئ حسابك وابدأ المشاركة الآن",
    signUpWithGoogle: "التسجيل بواسطة جوجل",
    orCreateAccount: "أو إنشاء حساب",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أحمد بن علي",
    emailPlaceholder: "email@example.com",
    phonePlaceholder: "+213 555 123 456",
    cityPlaceholder: "الجزائر",
    addPhoto: "إضافة صورة",
    changePhoto: "تغيير الصورة",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    passwordRequirement: "8 أحرف على الأقل",
    createFreeAccount: "إنشاء حسابي مجاناً",
    creatingAccount: "جاري إنشاء الحساب...",
    termsAcceptance: "بإنشاء حساب، أنت توافق على شروط الاستخدام",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    backToHome: "العودة للرئيسية",
    
    // Home page
    heroTitle: "لنقلل الهدر معاً",
    heroDescription: "أعطِ حياة ثانية لمنتجاتك القريبة من تاريخ انتهاء الصلاحية. شارك، تبادل وساهم في جزائر أكثر استدامة.",
    welcomeBack: "مرحباً بعودتك",
    readyToShare: "مستعد لإحداث فرق في مجتمعك؟",
    getStarted: "ابدأ الآن",
    browseProducts: "تصفح المنتجات",
    howItWorks: "كيف يعمل",
    howItWorksDescription: "منصتنا تسهل المشاركة وتقليل الهدر في ثلاث خطوات بسيطة",
    categoriesDescription: "استكشف الفئات المختلفة للمنتجات المتاحة",
    realTimeImpact: "التأثير في الوقت الفعلي",
    communityImpact: "هذا هو تأثير مجتمعنا",
    
    // How it works
    step1Title: "1. شارك منتجاتك",
    step1Description: "صوّر ووصف المنتجات التي تريد مشاركتها. أضف الموقع والتفاصيل المهمة.",
    step2Title: "2. ابحث واحجز",
    step2Description: "تصفح المنتجات المتاحة بالقرب منك واحجز ما يهمك.",
    step3Title: "3. تبادل واستلم",
    step3Description: "تواصل مع المالكين لتنظيم الاستلام وأنشئ روابط في مجتمعك.",
    
    // Stats
    sharedProducts: "المنتجات المشتركة",
    totalAvailableWeight: "إجمالي الوزن المتاح",
    activeUsers: "المستخدمون النشطون",
    wasteAvoided: "الهدر المتجنب",
    reservedProducts: "المنتجات المحجوزة",
    
    // Categories
    food: "الأغذية والمشروبات",
    preparedMeals: "وجبات محضرة",
    bakery: "مخبزة",
    butchery: "جزارة",
    rawMaterials: "مواد خام",
    tableware: "أواني",
    hygiene: "النظافة والجمال",
    household: "منتجات منزلية",
    school: "لوازم مدرسية",
    pharmacy: "منتجات صيدلانية",
    local: "منتجات محلية طازجة",
    
    // Add Product
    addProductTitle: "إضافة منتج",
    addProductDescription: "شارك منتجاتك لتجنب الهدر",
    newProduct: "منتج جديد",
    fillProductInfo: "املأ معلومات منتجك",
    productName: "اسم المنتج",
    productNamePlaceholder: "مثال: خبز حرفي، خضار طازجة...",
    category: "الفئة",
    selectCategory: "اختر فئة",
    expiryDate: "تاريخ انتهاء الصلاحية",
    location: "الموقع",
    locationPlaceholder: "مثال: الجزائر الوسط، وهران...",
    price: "السعر",
    optional: "اختياري",
    pricePlaceholder: "مثال: مجاني، 50 دج...",
    description: "الوصف",
    descriptionPlaceholder: "صف منتجك (اختياري)",
    image: "الصورة",
    clickToAddPhoto: "انقر لإضافة صورة",
    photoFormat: "JPG، PNG أو GIF (حد أقصى 5 ميجابايت)",
    cancel: "إلغاء",
    publish: "نشر",
    selectWilaya: "اختر ولايتك",
    
    // Products page
    discoverProducts: "اكتشف المنتجات المتاحة",
    discoverProductsDescription: "ابحث عن منتجات بالقرب منك وساهم في تقليل الهدر",
    search: "البحث عن المنتجات...",
    allCategories: "جميع الفئات",
    allProducts: "جميع المنتجات",
    filter: "تصفية",
    reserve: "حجز",
    contact: "تواصل",
    expiresOn: "تنتهي صلاحيته في",
    noProductsFound: "لم يتم العثور على منتجات",
    tryModifyingFilters: "حاول تعديل معايير البحث",
    clearFilters: "مسح المرشحات",
    donations: "التبرعات",
    freeDonations: "التبرعات المجانية المتاحة",
    donationsAvailable: "تبرعات متاحة",
    viewDonations: "عرض التبرعات",
    closeList: "إغلاق القائمة",
    yourProduct: "منتجك",
    product: "المنتج",
    
    // Contact dialog
    contactOwner: "تواصل مع المالك",
    owner: "المالك",
    messageContent: "محتوى الرسالة",
    sendMessage: "إرسال الرسالة",
    
    // Profile
    personalInfo: "المعلومات الشخصية",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    city: "المدينة",
    saveChanges: "حفظ التغييرات",
    mySharedProducts: "مشاركاتي",
    myDonations: "تبرعاتي",
    noSharedProducts: "لا توجد منتجات مشتركة",
    noDonations: "لا توجد تبرعات",
    shareFirstProduct: "شارك أول منتج لك لمساعدة المجتمع!",
    makeDonation: "شارك منتجاً مجانياً لمساعدة شخص ما!",
    goToProducts: "اذهب إلى المنتجات",
    startSharing: "ابدأ المشاركة",
    
    // Settings
    settingsTitle: "الإعدادات",
    settingsDescription: "إدارة تفضيلاتك وإعدادات حسابك",
    language: "اللغة",
    french: "Français",
    arabic: "العربية",
    notifications: "الإشعارات",
    newProducts: "منتجات جديدة",
    expirationReminders: "تذكيرات انتهاء الصلاحية",
    account: "الحساب",
    exportData: "تصدير بياناتي",
    deleteAccount: "حذف الحساب",
    help: "المساعدة والدعم",
    helpCenter: "مركز المساعدة",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    chooseLanguage: "اختر لغتك المفضلة",
    interfaceLanguage: "لغة الواجهة",
    manageNotifications: "إدارة تفضيلات الإشعارات",
    newProductsDesc: "احصل على إشعارات للمنتجات الجديدة في منطقتك",
    messagesNotif: "الرسائل",
    messagesDesc: "احصل على إشعارات للرسائل الجديدة",
    expiryReminders: "تذكيرات انتهاء الصلاحية",
    expiryRemindersDesc: "احصل على تذكيرات قبل انتهاء صلاحية منتجاتك",
    privacy: "الخصوصية",
    privacyDesc: "تحكم في معلوماتك الشخصية ومدى ظهورها",
    locationSharing: "مشاركة الموقع",
    locationSharingDesc: "السماح للتطبيق باستخدام موقعك لتحسين التجربة",
    contactPermission: "إذن التواصل",
    contactPermissionDesc: "السماح للمستخدمين الآخرين بالتواصل معك عبر التطبيق",
    profileVisibility: "ظهور الملف الشخصي",
    profileVisibilityDesc: "تحكم فيمن يمكنه رؤية معلومات ملفك الشخصي",
    helpSupport: "المساعدة والدعم",
    contactUs: "اتصل بنا",
    accountActions: "إجراءات الحساب",
    
    // Messages
    messagesTitle: "الرسائل",
    searchConversations: "البحث في المحادثات...",
    noConversations: "لا توجد محادثات",
    startConversation: "ابدأ محادثة جديدة عن طريق التواصل مع مالك منتج",
    typeMessage: "اكتب رسالتك...",
    send: "إرسال",
    you: "أنت",
    
    // Reserved Products
    reservedProductsTitle: "منتجاتي المحجوزة",
    reservedProductsDesc: "تتبع حجوزاتك ونظم استلام منتجاتك",
    noReservedProducts: "لا توجد منتجات محجوزة",
    noReservedProductsDesc: "لم تحجز أي منتجات بعد. تصفح كتالوجنا لاكتشاف المنتجات المتاحة.",
    reserved: "محجوز",
    sharedBy: "مشارك بواسطة",
    reservedOn: "تم الحجز في",
    expiryLimit: "الحد النهائي",
    
    // Toast messages and errors
    reservedSuccess: "تم حجزه بنجاح",
    productReservedSuccess: "يمكنك الآن التواصل مع المالك لتنظيم الاستلام",
    messageSent: "تم إرسال الرسالة",
    messageDelivered: "تم تسليم رسالتك",
    messageRequired: "يرجى كتابة رسالة",
    imageAdded: "تمت إضافة الصورة",
    addedSuccessfully: "تمت الإضافة بنجاح",
    error: "خطأ",
    fillRequiredFields: "يرجى ملء جميع الحقول المطلوبة",
    productAdded: "تمت إضافة المنتج!",
    productPublishedSuccess: "تم نشر منتجك بنجاح",
    errorAddingProduct: "حدث خطأ أثناء إضافة المنتج",
    profileUpdated: "تم تحديث الملف الشخصي",
    profileUpdateSuccess: "تم تحديث معلوماتك بنجاح",
    free: "مجاني",
    loginRequired: "تسجيل الدخول مطلوب",
    loginRequiredDescription: "يجب أن تكون مسجلاً للدخول لتنفيذ هذا الإجراء",
    cannotReserveOwnProduct: "إجراء غير ممكن",
    cannotReserveOwnProductDescription: "لا يمكنك حجز منتجك الخاص",
    alreadyReserved: "محجوز بالفعل",
    productAlreadyReserved: "تم حجز هذا المنتج بالفعل من قبل شخص آخر",
    cannotContactYourself: "إجراء غير ممكن",
    cannotContactYourselfDescription: "لا يمكنك التواصل مع نفسك",
    reservationMessage: "مرحباً! أنا مهتم بمنتجك '{productName}'. متى يمكنني استلامه؟",
    quickActions: "إجراءات سريعة",
    addProductButton: "إضافة منتج",
    addProductDesc: "شارك منتجاتك مع المجتمع",
    myMessagesButton: "رسائلي",
    myMessagesDesc: "تواصل مع المستخدمين الآخرين",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
