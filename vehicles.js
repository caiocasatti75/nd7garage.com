/**
 * ND7 GARAGE - CatÃ¡logo Oficial de VeÃ­culos
 * Sincronizado com CarroSP e Instagram @nd7garage
 * Atualizado com fotos em alta definiÃ§Ã£o, especificaÃ§Ãµes completas e links diretos
 */

const VEHICLES_DATA = [
    {
        "id":  "carrosp_7489693",
        "carrospId":  "7489693",
        "name":  "CHEVROLET 3100 3.9 I6 Deluxe",
        "brand":  "CHEVROLET",
        "model":  "3100",
        "version":  "3.9 I6 Deluxe",
        "year":  "1954",
        "price":  280000,
        "priceFormatted":  "R$ 280.000",
        "km":  "Consulte",
        "kmNumber":  0,
        "transmission":  "Manual",
        "fuel":  "Gasolina",
        "color":  "Cinza",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/chevrolet-3100-3.9-i-7489693-69743051.webp",
        "category":  "Picape",
        "categoryLabel":  "Picape",
        "url":  "https://carrosp.com.br/comprar/picape/chevrolet/3100/3.9-i6-deluxe/1954/7489693/",
        "visible":  true,
        "featured":  true,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7628279",
        "carrospId":  "7628279",
        "name":  "CHEVROLET Astra Sedan 2.0 4P Advantage",
        "brand":  "CHEVROLET",
        "model":  "Astra Sedan",
        "version":  "2.0 4P Advantage",
        "year":  "2007",
        "price":  33900,
        "priceFormatted":  "R$ 33.900",
        "km":  "Consulte",
        "kmNumber":  0,
        "transmission":  "Manual",
        "fuel":  "Flex",
        "color":  "Prata",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/chevrolet-astra-seda-7628279-73004556.webp",
        "category":  "Sedan",
        "categoryLabel":  "Sedan",
        "url":  "https://carrosp.com.br/comprar/sedan/chevrolet/astra-sedan/2.0-4p-advantage/2007/7628279/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7681308",
        "carrospId":  "7681308",
        "name":  "HONDA CB 300 F Twister Flex CBS",
        "brand":  "HONDA",
        "model":  "CB 300 F Twister",
        "version":  "Flex CBS",
        "year":  "2025",
        "price":  25900,
        "priceFormatted":  "R$ 25.900",
        "km":  "7.000 km",
        "kmNumber":  7000,
        "transmission":  "Manual",
        "fuel":  "Flex",
        "color":  "Preto Fosco",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/honda-cb-300-f-twist-7681308-74239430.webp",
        "category":  "SUV",
        "categoryLabel":  "SUV",
        "url":  "https://carrosp.com.br/comprar/honda/cb-300-f-twister/flex-cbs/2025/7681308/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7681313",
        "carrospId":  "7681313",
        "name":  "HONDA CG 125 Titan ES",
        "brand":  "HONDA",
        "model":  "CG 125",
        "version":  "Titan ES",
        "year":  "1999",
        "price":  11900,
        "priceFormatted":  "R$ 11.900",
        "km":  "73.000 km",
        "kmNumber":  73000,
        "transmission":  "Manual",
        "fuel":  "Gasolina",
        "color":  "Azul",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/honda-cg-125-titan-e-7681313-74239463.webp",
        "category":  "SUV",
        "categoryLabel":  "SUV",
        "url":  "https://carrosp.com.br/comprar/honda/cg-125/titan-es/1999/7681313/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7672460",
        "carrospId":  "7672460",
        "name":  "HONDA Civic 2.0 16V 4P Sport Flex",
        "brand":  "HONDA",
        "model":  "Civic",
        "version":  "2.0 16V 4P Sport Flex",
        "year":  "2017",
        "price":  99900,
        "priceFormatted":  "R$ 99.900",
        "km":  "91.000 km",
        "kmNumber":  91000,
        "transmission":  "Manual",
        "fuel":  "Flex",
        "color":  "Preto",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/honda-civic-2.0-16v-7672460-73988126.webp",
        "category":  "Sedan",
        "categoryLabel":  "Sedan",
        "url":  "https://carrosp.com.br/comprar/sedan/honda/civic/2.0-16v-4p-sport-flex/2017/7672460/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7672469",
        "carrospId":  "7672469",
        "name":  "JEEP Commander 2.0 16V 4P Td380 Overland 4X4 Turbo Diesel Automático AT9",
        "brand":  "JEEP",
        "model":  "Commander",
        "version":  "2.0 16V 4P Td380 Overland 4X4 Turbo Diesel Automático AT9",
        "year":  "2022",
        "price":  165900,
        "priceFormatted":  "R$ 165.900",
        "km":  "44.000 km",
        "kmNumber":  44000,
        "transmission":  "AutomÃ¡tico",
        "fuel":  "Diesel",
        "color":  "Branco",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/jeep-commander-2.0-1-7672469-73988116.webp",
        "category":  "SUV",
        "categoryLabel":  "SUV",
        "url":  "https://carrosp.com.br/comprar/suv/jeep/commander/2.0-16v-4p-td380-overland-4x4-turbo-diesel-automatico-at9/2022/7672469/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7708822",
        "carrospId":  "7708822",
        "name":  "TOYOTA Corolla 2.0 16V 4P XEI Flex Automático",
        "brand":  "TOYOTA",
        "model":  "Corolla",
        "version":  "2.0 16V 4P XEI Flex Automático",
        "year":  "2014",
        "price":  70900,
        "priceFormatted":  "R$ 70.900",
        "km":  "110.000 km",
        "kmNumber":  110000,
        "transmission":  "AutomÃ¡tico",
        "fuel":  "Flex",
        "color":  "Preto",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/toyota-corolla-2.0-1-7708822-74945580.webp",
        "category":  "Sedan",
        "categoryLabel":  "Sedan",
        "url":  "https://carrosp.com.br/comprar/sedan/toyota/corolla/2.0-16v-4p-xei-flex-automatico/2014/7708822/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7687741",
        "carrospId":  "7687741",
        "name":  "HONDA Fit 1.4 4P LX",
        "brand":  "HONDA",
        "model":  "Fit",
        "version":  "1.4 4P LX",
        "year":  "2007",
        "price":  36900,
        "priceFormatted":  "R$ 36.900",
        "km":  "218.000 km",
        "kmNumber":  218000,
        "transmission":  "Manual",
        "fuel":  "Gasolina",
        "color":  "Prata",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/honda-fit-1.4-4p-lx-7687741-74417836.webp",
        "category":  "Hatch",
        "categoryLabel":  "Hatch",
        "url":  "https://carrosp.com.br/comprar/hatch/honda/fit/1.4-4p-lx/2007/7687741/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7719696",
        "carrospId":  "7719696",
        "name":  "HONDA Fit 1.5 16V 4P EX Flex Automático",
        "brand":  "HONDA",
        "model":  "Fit",
        "version":  "1.5 16V 4P EX Flex Automático",
        "year":  "2015",
        "price":  68900,
        "priceFormatted":  "R$ 68.900",
        "km":  "85.000 km",
        "kmNumber":  85000,
        "transmission":  "AutomÃ¡tico",
        "fuel":  "Flex",
        "color":  "Prata",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/honda-fit-1.5-16v-4p-7719696-75212229.webp",
        "category":  "Hatch",
        "categoryLabel":  "Hatch",
        "url":  "https://carrosp.com.br/comprar/hatch/honda/fit/1.5-16v-4p-ex-flex-automatico/2015/7719696/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7727827",
        "carrospId":  "7727827",
        "name":  "VOLKSWAGEN Fox 1.6 4P Xtreme Flex",
        "brand":  "VOLKSWAGEN",
        "model":  "Fox",
        "version":  "1.6 4P Xtreme Flex",
        "year":  "2021",
        "price":  78900,
        "priceFormatted":  "R$ 78.900",
        "km":  "66.000 km",
        "kmNumber":  66000,
        "transmission":  "Manual",
        "fuel":  "Flex",
        "color":  "Prata",
        "image":  "https://cdn.carrosp.com.br/temas/front/images/sem-imagem.jpg",
        "category":  "Hatch",
        "categoryLabel":  "Hatch",
        "url":  "https://carrosp.com.br/comprar/hatch/volkswagen/fox/1.6-4p-xtreme-flex/2021/7727827/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7586252",
        "carrospId":  "7586252",
        "name":  "VOLKSWAGEN Gol 1.0 12V 4P Flex MPI G7",
        "brand":  "VOLKSWAGEN",
        "model":  "Gol",
        "version":  "1.0 12V 4P Flex MPI G7",
        "year":  "2023",
        "price":  56900,
        "priceFormatted":  "R$ 56.900",
        "km":  "54.000 km",
        "kmNumber":  54000,
        "transmission":  "Manual",
        "fuel":  "Flex",
        "color":  "Branco",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/volkswagen-gol-1.0-1-7586252-72250038.webp",
        "category":  "Hatch",
        "categoryLabel":  "Hatch",
        "url":  "https://carrosp.com.br/comprar/hatch/volkswagen/gol/1.0-12v-4p-flex-mpi-g7/2023/7586252/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7657048",
        "carrospId":  "7657048",
        "name":  "HYUNDAI HB 20 Hatch 1.6 16V 4P Flex Comfort",
        "brand":  "HYUNDAI",
        "model":  "HB 20 Hatch",
        "version":  "1.6 16V 4P Flex Comfort",
        "year":  "2014",
        "price":  53900,
        "priceFormatted":  "R$ 53.900",
        "km":  "98.000 km",
        "kmNumber":  98000,
        "transmission":  "Manual",
        "fuel":  "Flex",
        "color":  "Branco",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/hyundai-hb-20-hatch-7657048-73585732.webp",
        "category":  "Hatch",
        "categoryLabel":  "Hatch",
        "url":  "https://carrosp.com.br/comprar/hatch/hyundai/hb-20-hatch/1.6-16v-4p-flex-comfort/2014/7657048/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7601246",
        "carrospId":  "7601246",
        "name":  "TOYOTA Hilux SW4 3.0 16V 4P SRV 4X4 7 Lugares Turbo Diesel Automático",
        "brand":  "TOYOTA",
        "model":  "Hilux SW4",
        "version":  "3.0 16V 4P SRV 4X4 7 Lugares Turbo Diesel Automático",
        "year":  "2014",
        "price":  144900,
        "priceFormatted":  "R$ 144.900",
        "km":  "181.000 km",
        "kmNumber":  181000,
        "transmission":  "AutomÃ¡tico",
        "fuel":  "Diesel",
        "color":  "Preto",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/toyota-hilux-sw4-3.0-7601246-72232128.webp",
        "category":  "SUV",
        "categoryLabel":  "SUV",
        "url":  "https://carrosp.com.br/comprar/suv/toyota/hilux-sw4/3.0-16v-4p-srv-4x4-7-lugares-turbo-diesel-automatico/2014/7601246/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7601213",
        "carrospId":  "7601213",
        "name":  "HONDA HR-V 1.8 16V 4P EXL Flex Automático CVT",
        "brand":  "HONDA",
        "model":  "HR-V",
        "version":  "1.8 16V 4P EXL Flex Automático CVT",
        "year":  "2018",
        "price":  95900,
        "priceFormatted":  "R$ 95.900",
        "km":  "94.000 km",
        "kmNumber":  94000,
        "transmission":  "AutomÃ¡tico",
        "fuel":  "Flex",
        "color":  "Cinza",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/honda-hr-v-1.8-16v-4-7601213-72231682.webp",
        "category":  "SUV",
        "categoryLabel":  "SUV",
        "url":  "https://carrosp.com.br/comprar/suv/honda/hr-v/1.8-16v-4p-exl-flex-automatico-cvt/2018/7601213/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7634492",
        "carrospId":  "7634492",
        "name":  "HYUNDAI IX35 2.0 16V 4P GLS Flex Automático",
        "brand":  "HYUNDAI",
        "model":  "IX35",
        "version":  "2.0 16V 4P GLS Flex Automático",
        "year":  "2017",
        "price":  85900,
        "priceFormatted":  "R$ 85.900",
        "km":  "91.000 km",
        "kmNumber":  91000,
        "transmission":  "AutomÃ¡tico",
        "fuel":  "Flex",
        "color":  "Prata",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/hyundai-ix35-2.0-16v-7634492-73024177.webp",
        "category":  "SUV",
        "categoryLabel":  "SUV",
        "url":  "https://carrosp.com.br/comprar/suv/hyundai/ix35/2.0-16v-4p-gls-flex-automatico/2017/7634492/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7691165",
        "carrospId":  "7691165",
        "name":  "FORD Ka Hatch 1.0 12V 4P Flex Ti-vct SE",
        "brand":  "FORD",
        "model":  "Ka Hatch",
        "version":  "1.0 12V 4P Flex Ti-vct SE",
        "year":  "2020",
        "price":  49900,
        "priceFormatted":  "R$ 49.900",
        "km":  "88.000 km",
        "kmNumber":  88000,
        "transmission":  "Manual",
        "fuel":  "Flex",
        "color":  "Branco",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/ford-ka-hatch-1.0-12-7691165-74535871.webp",
        "category":  "Hatch",
        "categoryLabel":  "Hatch",
        "url":  "https://carrosp.com.br/comprar/hatch/ford/ka-hatch/1.0-12v-4p-flex-ti-vct-se/2020/7691165/",
        "visible":  true,
        "featured":  false,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    },
    {
        "id":  "carrosp_7480780",
        "carrospId":  "7480780",
        "name":  "JEEP Wrangler 3.6 V6 4P Unlimited Sahara 4X4 Automático",
        "brand":  "JEEP",
        "model":  "Wrangler",
        "version":  "3.6 V6 4P Unlimited Sahara 4X4 Automático",
        "year":  "2018",
        "price":  399000,
        "priceFormatted":  "R$ 399.000",
        "km":  "38.000 km",
        "kmNumber":  38000,
        "transmission":  "AutomÃ¡tico",
        "fuel":  "Gasolina",
        "color":  "Prata",
        "image":  "https://cdn.carrosp.com.br/img/6/1200/jeep-wrangler-3.6-v6-7480780-69514073.webp",
        "category":  "SUV",
        "categoryLabel":  "SUV",
        "url":  "https://carrosp.com.br/comprar/suv/jeep/wrangler/3.6-v6-4p-unlimited-sahara-4x4-automatico/2018/7480780/",
        "visible":  true,
        "featured":  true,
        "badges":  [
                       "Laudo Cautelar Aprovado",
                       "Garantia ND7",
                       "ProcedÃªncia"
                   ]
    }
];

// Assegura que todos os veÃ­culos possuam a propriedade visible por padrÃ£o
VEHICLES_DATA.forEach(v => {
  if (typeof v.visible === 'undefined') {
    v.visible = true;
  }
});

// Catálogo CarroSP oficial disponível para sincronização instantânea
if (typeof window !== 'undefined') {
  window.CARROSP_LIVE_DATA = VEHICLES_DATA;
}

// Dados PadrÃ£o da Loja
const STORE_INFO = {
  name: "ND7 Garage",
  slogan: "Venda e Consultoria Automotiva",
  tagline: "Seminovos selecionados, 0km de todas as marcas e consultoria automotiva personalizada em Santa BÃ¡rbara d'Oeste e regiÃ£o.",
  phone1: "(19) 3629-3909",
  phone1Raw: "551936293909",
  whatsapp: "(19) 99560-3366",
  whatsappRaw: "5519995603366",
  email: "nd7garage@gmail.com",
  instagram: "@nd7garage",
  instagramUrl: "https://www.instagram.com/nd7garage/",
  carroSpUrl: "https://carrosp.com.br/santa-barbara-doeste-sp/nd7-garage/",
  address: "Rua do Ã“smio, 193 - Jardim Mollon",
  city: "Santa BÃ¡rbara d'Oeste",
  state: "SP",
  cep: "13456-625",
  reference: "PrÃ³ximo ao Tivoli Shopping / Divisa com Americana",
  mapsEmbedUrl: "https://www.google.com/maps?maptype=roadmap&zoom=16&output=embed&language=pt&region=br&q=Rua%20do%20Osmio%2C%20193%2C%20SANTA%20BARBARA%20DOESTE-SP%2C%20Brasil",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rua+do+Osmio,+193+-+Jardim+Mollon,+Santa+B%C3%A1rbara+d'Oeste+-+SP",
  heroTag: "Estoque Exclusivo & ProcedÃªncia Garantida",
  heroTitle: "Encontre o Carro Perfeito na ND7 Garage",
  heroDescription: "Venda e consultoria automotiva personalizada em Santa BÃ¡rbara d'Oeste e Americana. Seminovos criteriosamente periciados, veÃ­culos 0km de todas as marcas e as melhores condiÃ§Ãµes de financiamento do mercado.",
  aboutTitle: "A Escolha Certa para o Seu PrÃ³ximo Carro",
  aboutText: "Localizada estrategicamente no Jardim Mollon em Santa BÃ¡rbara d'Oeste (bem em frente ao Tivoli Shopping, na divisa com Americana), a ND7 Garage nasceu da paixÃ£o por automÃ³veis e do compromisso em entregar negÃ³cios honestos, transparentes e seguros.",
  hours: [
    { days: "Segunda a Sexta", hours: "08:30 Ã s 18:00" },
    { days: "SÃ¡bado", hours: "08:30 Ã s 13:00" },
    { days: "Domingo e Feriados", hours: "Fechado (Atendimento WhatsApp sob consulta)" }
  ]
};

// FunÃ§Ãµes UtilitÃ¡rias de Armazenamento Local (PersistÃªncia)
function getVehicles() {
  try {
    const raw = localStorage.getItem('nd7_vehicles');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Erro ao ler veÃ­culos do localStorage:', err);
  }
  return VEHICLES_DATA;
}

function saveVehicles(vehicles) {
  try {
    localStorage.setItem('nd7_vehicles', JSON.stringify(vehicles));
    return true;
  } catch (err) {
    console.error('Erro ao salvar veÃ­culos no localStorage:', err);
    return false;
  }
}

function getStoreInfo() {
  try {
    const raw = localStorage.getItem('nd7_store_info');
    if (raw) {
      const parsed = JSON.parse(raw);
      return Object.assign({}, STORE_INFO, parsed);
    }
  } catch (err) {
    console.warn('Erro ao ler dados da loja do localStorage:', err);
  }
  return STORE_INFO;
}

function saveStoreInfo(info) {
  try {
    localStorage.setItem('nd7_store_info', JSON.stringify(info));
    return true;
  } catch (err) {
    console.error('Erro ao salvar dados da loja no localStorage:', err);
    return false;
  }
}

function resetToDefaultData() {
  try {
    localStorage.removeItem('nd7_vehicles');
    localStorage.removeItem('nd7_store_info');
    localStorage.removeItem('nd7_leads');
    return true;
  } catch (err) {
    console.error('Erro ao resetar dados:', err);
    return false;
  }
}

// ============================================================================
// BASE DE CONTATOS & LEADS (CRM DE ATENDIMENTO - CAIO & EDUARDO)
// ============================================================================
const DEFAULT_LEADS = [
  {
    id: "lead_01",
    name: "Marcelo Henrique",
    phone: "(19) 99812-4455",
    phoneRaw: "19998124455",
    lookingFor: "Honda Civic 2.0 Sport Flex (2021)",
    budget: "R$ 115.000",
    attendant: "Caio",
    status: "Em Atendimento",
    notes: "Cliente deu entrada em proposta. Tem um Onix 2018 para dar na troca.",
    source: "Site (CatÃ¡logo)",
    createdAt: "15/10/2026 10:30",
    updatedAt: "15/10/2026 14:15"
  },
  {
    id: "lead_02",
    name: "Fernanda Silveira",
    phone: "(19) 98144-8899",
    phoneRaw: "19981448899",
    lookingFor: "Jeep Compass Longitude ou Renegade",
    budget: "R$ 140.000",
    attendant: "Eduardo",
    status: "Visita Agendada",
    notes: "Agendou visita para sÃ¡bado de manhÃ£ com o Eduardo para ver o Compass.",
    source: "WhatsApp Loja",
    createdAt: "14/10/2026 16:40",
    updatedAt: "15/10/2026 09:20"
  },
  {
    id: "lead_03",
    name: "Rodrigo MendonÃ§a",
    phone: "(19) 99763-1200",
    phoneRaw: "19997631200",
    lookingFor: "Picape Hilux ou Toro Diesel",
    budget: "R$ 160.000",
    attendant: "Caio",
    status: "Novo Lead",
    notes: "Procura picape para trabalho e lazer. Pagamento parte em dinheiro, parte financiado.",
    source: "Instagram",
    createdAt: "15/10/2026 15:10",
    updatedAt: "15/10/2026 15:10"
  },
  {
    id: "lead_04",
    name: "Aline Cristina",
    phone: "(19) 99233-5511",
    phoneRaw: "19992335511",
    lookingFor: "SUV automÃ¡tico atÃ© R$ 90 mil (T-Cross, Kicks ou Tracker)",
    budget: "R$ 90.000",
    attendant: "Aguardando",
    status: "Novo Lead",
    notes: "Preencheu formulÃ¡rio no site. Aguardando primeiro contato.",
    source: "Site (FormulÃ¡rio)",
    createdAt: "15/10/2026 17:05",
    updatedAt: "15/10/2026 17:05"
  },
  {
    id: "lead_05",
    name: "Carlos Eduardo Batista",
    phone: "(19) 98877-2233",
    phoneRaw: "19988772233",
    lookingFor: "Toyota Corolla Altis",
    budget: "R$ 130.000",
    attendant: "Eduardo",
    status: "Venda ConcluÃ­da",
    notes: "Financiamento aprovado pelo Santander. VeÃ­culo entregue revisado com garantia.",
    source: "IndicaÃ§Ã£o",
    createdAt: "10/10/2026 11:00",
    updatedAt: "14/10/2026 17:30"
  }
];

function getLeads() {
  try {
    const raw = localStorage.getItem('nd7_leads');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } else {
      localStorage.setItem('nd7_leads', JSON.stringify(DEFAULT_LEADS));
      return DEFAULT_LEADS;
    }
  } catch (err) {
    console.warn('Erro ao ler leads do localStorage:', err);
  }
  return DEFAULT_LEADS;
}

function saveLeads(leads) {
  try {
    localStorage.setItem('nd7_leads', JSON.stringify(leads));
    return true;
  } catch (err) {
    console.error('Erro ao salvar leads no localStorage:', err);
    return false;
  }
}

function addLead(lead) {
  const leads = getLeads();
  leads.unshift(lead);
  saveLeads(leads);
  return leads;
}


