
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  user: string;
  image: string;
  expiryDate: string;
  reserved: boolean;
  reservedDate?: string;
  category: string;
  condition: string;
  isDonation: boolean;
  isFlashOffer?: boolean;
  weight?: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  reserveProduct: (id: number) => void;
  unreserveProduct: (id: number) => void;
  reservedProducts: Product[];
  getUserProducts: (userName: string) => Product[];
  getUserDonations: (userName: string) => Product[];
  getStatistics: () => {
    totalProducts: number;
    totalWeight: number;
    reservedProducts: number;
    reservedWeight: number;
  };
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialProducts: Product[] = [
  // Plats préparés
  {
    id: 1,
    name: "Couscous traditionnel fait maison",
    description: "Couscous aux légumes et viande d'agneau, préparé avec amour selon la recette de ma grand-mère. Parfait pour 4-6 personnes.",
    price: "800 DA",
    location: "Alger Centre",
    user: "Fatima Benaissa",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Plats préparés",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 2,
    name: "Tajine de poulet aux olives",
    description: "Délicieux tajine de poulet mijoté aux olives et citrons confits. Prêt à réchauffer et déguster.",
    price: "1200 DA", 
    location: "Oran",
    user: "Amina Cherif",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
    expiryDate: "2025-12-30",
    reserved: false,
    category: "Plats préparés",
    condition: "Très bon",
    isDonation: false
  },
  {
    id: 3,
    name: "Chorba traditionnelle",
    description: "Soupe traditionnelle algérienne aux légumes et viande, parfaite pour les soirées froides.",
    price: "600 DA",
    location: "Constantine",
    user: "Khadija Mansouri",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
    expiryDate: "2025-12-29",
    reserved: false,
    category: "Restaurants",
    condition: "Excellent",
    isDonation: false
  },

  // Matières premières
  {
    id: 4,
    name: "Fruits de saison bio",
    description: "Mélange de fruits frais de saison : pommes, poires, oranges. Parfait pour une alimentation saine.",
    price: "800 DA",
    location: "Blida",
    user: "Ferme Bio Karim",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
    expiryDate: "2025-12-28",
    reserved: false,
    category: "Matières premières",
    condition: "Excellent",
    isDonation: false,
    isFlashOffer: true
  },
  {
    id: 5,
    name: "Légumes frais du potager",
    description: "Assortiment de légumes frais : tomates, courgettes, aubergines. Cultivés sans pesticides.",
    price: "600 DA",
    location: "Tizi Ouzou",
    user: "Jardin Vert",
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&h=300&fit=crop",
    expiryDate: "2025-12-27",
    reserved: false,
    category: "Matières premières",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 6,
    name: "Épices traditionnelles",
    description: "Mélange d'épices algériennes authentiques : ras el hanout, harissa, zaatar.",
    price: "1200 DA",
    location: "Béjaïa",
    user: "Épicerie du Terroir",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    expiryDate: "2025-06-26",
    reserved: false,
    category: "Matières premières",
    condition: "Neuf",
    isDonation: false
  },
  {
    id: 22,
    name: "Olives artisanales de Kabylie",
    description: "Olives noires et vertes marinées selon la tradition kabyle, parfaites pour l'apéritif.",
    price: "950 DA",
    location: "Tizi Ouzou",
    user: "Coopérative Amazigh",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop",
    expiryDate: "2025-03-15",
    reserved: false,
    category: "Matières premières",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 23,
    name: "Miel naturel de montagne",
    description: "Miel pur récolté dans les montagnes de l'Atlas, goût authentique et bienfaits naturels.",
    price: "2800 DA",
    location: "Blida",
    user: "Apiculture Atlas",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop",
    expiryDate: "2026-12-31",
    reserved: false,
    category: "Matières premières",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 25,
    name: "Huile d'olive extra vierge",
    description: "Huile d'olive première pression à froid, produite localement dans les collines d'Alger.",
    price: "1800 DA",
    location: "Alger",
    user: "Moulin Traditionnel",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
    expiryDate: "2025-08-30",
    reserved: false,
    category: "Matières premières",
    condition: "Excellent",
    isDonation: false
  },

  // Pâtisseries
  {
    id: 7,
    name: "Baklava aux amandes",
    description: "Délicieux baklava croustillant aux amandes et miel, préparé selon la tradition orientale.",
    price: "2000 DA",
    location: "Annaba",
    user: "Pâtisserie Orientale",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    expiryDate: "2025-01-05",
    reserved: false,
    category: "Pâtisseries",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 8,
    name: "Makroudh aux dattes",
    description: "Pâtisserie traditionnelle algérienne fourrée aux dattes, un délice authentique.",
    price: "1200 DA",
    location: "Sétif",
    user: "Halima Bakery",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    expiryDate: "2025-01-03",
    reserved: false,
    category: "Pâtisseries",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 9,
    name: "Chouarak brioche",
    description: "Pain brioché moelleux parfumé à la fleur d'oranger, parfait pour le petit-déjeuner.",
    price: "800 DA",
    location: "Mostaganem",
    user: "Boulangerie du Soleil",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop",
    expiryDate: "2025-01-02",
    reserved: false,
    category: "Boulangeries",
    condition: "Très bon",
    isDonation: false
  },

  // Vêtements
  {
    id: 10,
    name: "Robe traditionnelle Karakou",
    description: "Magnifique robe traditionnelle algéroise brodée à la main, portée une seule fois.",
    price: "15000 DA",
    location: "Alger",
    user: "Leila Boutique",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    expiryDate: "2025-06-30",
    reserved: false,
    category: "Vêtements",
    condition: "Comme neuf",
    isDonation: false
  },
  {
    id: 11,
    name: "Veste en cuir vintage",
    description: "Veste en cuir véritable des années 90, style intemporel et toujours à la mode.",
    price: "8000 DA",
    location: "Oran",
    user: "Vintage Store",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Vêtements",
    condition: "Très bon",
    isDonation: false
  },
  {
    id: 12,
    name: "Lot de vêtements enfants",
    description: "Collection de vêtements pour enfants de 3-5 ans, très bon état, marques de qualité.",
    price: "0 DA",
    location: "Constantine",
    user: "Maman Solidaire",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a9?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Dons solidaires",
    condition: "Bon",
    isDonation: true
  },

  // Vaisselles
  {
    id: 13,
    name: "Service à thé en porcelaine",
    description: "Élégant service à thé en porcelaine fine avec motifs dorés, parfait pour les invités.",
    price: "5000 DA",
    location: "Tlemcen",
    user: "Antiquités du Maghreb",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Vaisselles",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 14,
    name: "Set d'assiettes artisanales",
    description: "Belles assiettes en céramique faites à la main, décoration berbère authentique.",
    price: "3500 DA",
    location: "Ghardaïa",
    user: "Artisan Touareg",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Vaisselles",
    condition: "Neuf",
    isDonation: false
  },
  {
    id: 15,
    name: "Verres à thé traditionnels",
    description: "Set de 12 verres à thé algériens traditionnels avec plateau en métal argenté.",
    price: "2500 DA",
    location: "Laghouat",
    user: "Tradition & Modernité",
    image: "https://images.unsplash.com/photo-1571931195914-3b9ae89cda4d?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Vaisselles",
    condition: "Très bon",
    isDonation: false
  },

  // Cosmétiques
  {
    id: 16,
    name: "Huile d'argan pure du Maroc",
    description: "Huile d'argan 100% naturelle, excellente pour la peau et les cheveux. Bouteille 100ml.",
    price: "2200 DA",
    location: "Alger",
    user: "Beauté Naturelle",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=300&fit=crop",
    expiryDate: "2025-08-30",
    reserved: false,
    category: "Cosmétiques",
    condition: "Neuf",
    isDonation: false
  },
  {
    id: 17,
    name: "Savon noir beldi authentique",
    description: "Savon noir traditionnel du Maghreb pour hammam, exfoliant naturel et purifiant.",
    price: "800 DA",
    location: "Tlemcen",
    user: "Hammam Traditions",
    image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&h=300&fit=crop",
    expiryDate: "2026-01-15",
    reserved: false,
    category: "Cosmétiques",
    condition: "Neuf",
    isDonation: false
  },
  {
    id: 18,
    name: "Crème hydratante à l'aloé vera",
    description: "Crème apaisante et hydratante à base d'aloé vera bio, idéale pour peaux sensibles.",
    price: "1500 DA",
    location: "Oran",
    user: "Green Cosmetics",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    expiryDate: "2025-09-20",
    reserved: false,
    category: "Cosmétiques",
    condition: "Neuf",
    isDonation: false
  },

  // Fournitures scolaires
  {
    id: 19,
    name: "Collection Tahar Djaout",
    description: "Œuvres complètes du célèbre écrivain algérien, état impeccable, éditions originales.",
    price: "4500 DA",
    location: "Alger",
    user: "Librairie du Savoir",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Fournitures scolaires",
    condition: "Excellent",
    isDonation: false
  },
  {
    id: 20,
    name: "Manuels scolaires lycée",
    description: "Collection complète de manuels pour terminale scientifique, programme algérien actuel.",
    price: "0 DA",
    location: "Constantine",
    user: "Association Éducative",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Dons solidaires",
    condition: "Bon",
    isDonation: true
  },
  {
    id: 21,
    name: "Dictionnaire français-arabe",
    description: "Grand dictionnaire bilingue français-arabe, indispensable pour les étudiants.",
    price: "3000 DA",
    location: "Batna",
    user: "Étudiant Motivé",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Fournitures scolaires",
    condition: "Très bon",
    isDonation: false
  },

  // Produits pharmaceutiques et dons solidaires
  {
    id: 24,
    name: "Couvertures en laine",
    description: "Couvertures traditionnelles en laine pure, parfaites pour l'hiver. Lot de 3 pièces.",
    price: "0 DA",
    location: "Constantine",
    user: "Association Solidarité",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Dons solidaires",
    condition: "Très bon",
    isDonation: true
  },
  {
    id: 26,
    name: "Cahiers et fournitures scolaires",
    description: "Lot complet de fournitures scolaires : cahiers, stylos, crayons pour élèves du primaire.",
    price: "0 DA",
    location: "Oran",
    user: "École Publique",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    expiryDate: "2025-12-31",
    reserved: false,
    category: "Dons solidaires",
    condition: "Neuf",
    isDonation: true
  },
  {
    id: 27,
    name: "Plantes aromatiques en pot",
    description: "Collection de plantes aromatiques : menthe, basilic, persil, coriandre en pots recyclés.",
    price: "400 DA",
    location: "Sétif",
    user: "Jardin Écologique",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    expiryDate: "2025-01-15",
    reserved: false,
    category: "Matières premières",
    condition: "Excellent",
    isDonation: false,
    isFlashOffer: true
  },
  {
    id: 28,
    name: "Shampooing naturel artisanal",
    description: "Shampooing fait maison à base d'ingrédients naturels, sans sulfates ni parabens.",
    price: "1200 DA",
    location: "Béjaïa",
    user: "Cosmétiques Bio",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    expiryDate: "2025-04-20",
    reserved: false,
    category: "Produits pharmaceutiques",
    condition: "Neuf",
    isDonation: false
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [reservedProducts, setReservedProducts] = useState<Product[]>([]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      reserved: false,
      condition: 'Excellent',
      isDonation: product.price === 'Gratuit' || product.price === '0 DA' || product.price === '',
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const reserveProduct = (id: number) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, reserved: true, reservedDate: new Date().toISOString() }
        : product
    ));
    
    const product = products.find(p => p.id === id);
    if (product) {
      setReservedProducts(prev => [...prev, { ...product, reserved: true, reservedDate: new Date().toISOString() }]);
    }
  };

  const unreserveProduct = (id: number) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, reserved: false, reservedDate: undefined }
        : product
    ));
    
    setReservedProducts(prev => prev.filter(product => product.id !== id));
  };

  const getUserProducts = (userName: string) => {
    return products.filter(product => product.user === userName && !product.isDonation);
  };

  const getUserDonations = (userName: string) => {
    return products.filter(product => product.user === userName && product.isDonation);
  };

  const getStatistics = () => {
    const totalProducts = products.filter(p => !p.reserved).length;
    const totalWeight = products.filter(p => !p.reserved).reduce((sum, p) => sum + (p.weight || 1), 0);
    const reservedProductsCount = products.filter(p => p.reserved).length;
    const reservedWeight = products.filter(p => p.reserved).reduce((sum, p) => sum + (p.weight || 1), 0);
    
    return {
      totalProducts,
      totalWeight,
      reservedProducts: reservedProductsCount,
      reservedWeight
    };
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      reserveProduct,
      unreserveProduct,
      reservedProducts,
      getUserProducts,
      getUserDonations,
      getStatistics
    }}>
      {children}
    </ProductContext.Provider>
  );
};
