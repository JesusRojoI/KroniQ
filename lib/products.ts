export interface Product {
  id: string;
  slug: string;
  nameKey: string;
  price: number;
  category: string;
  image: string;
  descriptionKey: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'paquete-de-ilustraciones-digitales-basicas',
    nameKey: 'product1',
    price: 3400,
    category: 'Ilustraciones',
    image: '/images/product1.jpg',
    descriptionKey: 'product1'
  },
  {
    id: '2',
    slug: 'paquete-basico-ads',
    nameKey: 'product2',
    price: 4150,
    category: 'Banners',
    image: '/images/product2.jpg',
    descriptionKey: 'product2'
  },
  {
    id: '3',
    slug: 'paquete-starter-redes-sociales',
    nameKey: 'product3',
    price: 6500,
    category: 'Redes Sociales',
    image: '/images/product3.jpg',
    descriptionKey: 'product3'
  },
  {
    id: '4',
    slug: 'paquete-plantilla-canva-para-marca-personal',
    nameKey: 'product4',
    price: 6650,
    category: 'Plantillas',
    image: '/images/product4.jpg',
    descriptionKey: 'product4'
  },
  {
    id: '5',
    slug: 'paquete-de-ilustraciones-color-vibrante',
    nameKey: 'product5',
    price: 6800,
    category: 'Ilustraciones',
    image: '/images/product5.jpg',
    descriptionKey: 'product5'
  },
  {
    id: '6',
    slug: 'paquete-logotipo-esencial',
    nameKey: 'product6',
    price: 8320,
    category: 'Logotipo',
    image: '/images/product6.jpg',
    descriptionKey: 'product6'
  },
  {
    id: '7',
    slug: 'paquete-presentacion-profesional-basica',
    nameKey: 'product7',
    price: 8520,
    category: 'Presentaciones',
    image: '/images/product7.jpg',
    descriptionKey: 'product7'
  },
  {
    id: '8',
    slug: 'paquete-campana-digital-pro',
    nameKey: 'product8',
    price: 8600,
    category: 'Banners',
    image: '/images/product8.jpg',
    descriptionKey: 'product8'
  },
  {
    id: '9',
    slug: 'paquete-ilustraciones-premium',
    nameKey: 'product9',
    price: 9100,
    category: 'Ilustraciones',
    image: '/images/product9.jpg',
    descriptionKey: 'product9'
  },
  {
    id: '10',
    slug: 'catalogo-corporativo-basico',
    nameKey: 'product10',
    price: 9200,
    category: 'Editorial',
    image: '/images/product10.jpg',
    descriptionKey: 'product10'
  },
  {
    id: '11',
    slug: 'paquete-contenido-social',
    nameKey: 'product11',
    price: 11250,
    category: 'Redes Sociales',
    image: '/images/product11.jpg',
    descriptionKey: 'product11'
  },
  {
    id: '12',
    slug: 'paquete-plantilla-profesional-para-presentaciones-google-slides-canva',
    nameKey: 'product12',
    price: 12450,
    category: 'Plantillas',
    image: '/images/product12.jpg',
    descriptionKey: 'product12'
  },
  {
    id: '13',
    slug: 'catalogo-avanzado',
    nameKey: 'product13',
    price: 13250,
    category: 'Editorial',
    image: '/images/product13.jpg',
    descriptionKey: 'product13'
  },
  {
    id: '14',
    slug: 'paquete-full-performance-ads',
    nameKey: 'product14',
    price: 14300,
    category: 'Banners',
    image: '/images/product14.jpg',
    descriptionKey: 'product14'
  },
  {
    id: '15',
    slug: 'paquete-presentacion-de-impacto',
    nameKey: 'product15',
    price: 15340,
    category: 'Presentaciones',
    image: '/images/product15.jpg',
    descriptionKey: 'product15'
  },
  {
    id: '16',
    slug: 'paquete-landing-page-visual',
    nameKey: 'product16',
    price: 16450,
    category: 'Web UI',
    image: '/images/product16.jpg',
    descriptionKey: 'product16'
  },
  {
    id: '17',
    slug: 'paquete-branding-social-pack-visual',
    nameKey: 'product17',
    price: 17400,
    category: 'Redes Sociales',
    image: '/images/product17.jpg',
    descriptionKey: 'product17'
  },
  {
    id: '18',
    slug: 'paquete-portafolio-digital-pdf-interactivo-personalizado',
    nameKey: 'product18',
    price: 17720,
    category: 'Plantillas',
    image: '/images/product18.jpg',
    descriptionKey: 'product18'
  },
  {
    id: '19',
    slug: 'paquete-identidad-visual-basica',
    nameKey: 'product19',
    price: 18400,
    category: 'Logotipo',
    image: '/images/product19.jpg',
    descriptionKey: 'product19'
  },
  {
    id: '20',
    slug: 'catalogo-fanzine',
    nameKey: 'product20',
    price: 21550,
    category: 'Editorial',
    image: '/images/product20.jpg',
    descriptionKey: 'product20'
  },
  {
    id: '21',
    slug: 'paquete-refresh-visual-basico',
    nameKey: 'product21',
    price: 22150,
    category: 'Rediseño',
    image: '/images/product21.jpg',
    descriptionKey: 'product21'
  },
  {
    id: '22',
    slug: 'paquete-sitio-web-corporativo-ui',
    nameKey: 'product22',
    price: 23520,
    category: 'Web UI',
    image: '/images/product22.jpg',
    descriptionKey: 'product22'
  },
  {
    id: '23',
    slug: 'paquete-pitch-deck-premium-ejecutivo',
    nameKey: 'product23',
    price: 23600,
    category: 'Presentaciones',
    image: '/images/product23.jpg',
    descriptionKey: 'product23'
  },
  {
    id: '24',
    slug: 'paquete-web-ui-premium-ux-basico',
    nameKey: 'product24',
    price: 28540,
    category: 'Web UI',
    image: '/images/product24.jpg',
    descriptionKey: 'product24'
  },
  {
    id: '25',
    slug: 'paquete-gestion-visual-premium-animaciones',
    nameKey: 'product25',
    price: 30420,
    category: 'Redes Sociales',
    image: '/images/product25.jpg',
    descriptionKey: 'product25'
  },
  {
    id: '26',
    slug: 'paquete-branding-esencial',
    nameKey: 'product26',
    price: 30700,
    category: 'Branding',
    image: '/images/product26.jpg',
    descriptionKey: 'product26'
  },
  {
    id: '27',
    slug: 'paquete-rediseno-intermedio-de-marca',
    nameKey: 'product27',
    price: 45200,
    category: 'Rediseño',
    image: '/images/product27.jpg',
    descriptionKey: 'product27'
  },
  {
    id: '28',
    slug: 'paquete-brand-kit-profesional',
    nameKey: 'product28',
    price: 45280,
    category: 'Logotipo',
    image: '/images/product28.jpg',
    descriptionKey: 'product28'
  },
  {
    id: '29',
    slug: 'paquete-branding-corporativo-completo',
    nameKey: 'product29',
    price: 55400,
    category: 'Branding',
    image: '/images/product29.jpg',
    descriptionKey: 'product29'
  },
  {
    id: '30',
    slug: 'paquete-branding-premium-experiencia-de-marca',
    nameKey: 'product30',
    price: 80200,
    category: 'Branding',
    image: '/images/product30.jpg',
    descriptionKey: 'product30'
  },
  {
    id: '31',
    slug: 'paquete-rebranding-integral-estrategia-visual',
    nameKey: 'product31',
    price: 82100,
    category: 'Rediseño',
    image: '/images/product31.jpg',
    descriptionKey: 'product31'
  }
];

export const productCategories = [
  { key: 'all', labelKey: 'all', count: 31 },
  { key: 'Banners', labelKey: 'banners', count: 3 },
  { key: 'Branding', labelKey: 'branding', count: 3 },
  { key: 'Logotipo', labelKey: 'logotipo', count: 3 },
  { key: 'Editorial', labelKey: 'editorial', count: 3 },
  { key: 'Redes Sociales', labelKey: 'redesSociales', count: 4 },
  { key: 'Web UI', labelKey: 'webUI', count: 3 },
  { key: 'Ilustraciones', labelKey: 'ilustraciones', count: 3 },
  { key: 'Plantillas', labelKey: 'plantillas', count: 3 },
  { key: 'Presentaciones', labelKey: 'presentaciones', count: 3 },
  { key: 'Rediseño', labelKey: 'rediseno', count: 3 }
];