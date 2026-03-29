const pdfGlob = import.meta.glob('../assets/materials/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** Basename (NFC) → i18n key under closing.materials.items */
const BASENAME_TO_I18N_KEY = {
  'Analiza-batonów-proteinowych-novel-food.pdf': 'analizaBatonow',
  'bialko-przyszlosci-wartosc-odzywcza-porownanie-zrodel-bialka.pdf':
    'bialkoPrzyszlosci',
  'Czy-wiesz-ze-10-faktow-o-produktach-z-owadow.pdf': 'czyWiesz10Faktow',
  'Jak-powstaje-bialko-owadzie.pdf': 'jakPowstajeBialkoOwadzie',
  'Mity-i-fakty-o-zywnosci-z-owadow.pdf': 'mityIFakty',
};

const DISPLAY_ORDER = [
  'analizaBatonow',
  'bialkoPrzyszlosci',
  'czyWiesz10Faktow',
  'jakPowstajeBialkoOwadzie',
  'mityIFakty',
];

/** Card grid order (3 + 2 rows); icon names match MaterialCardIcons */
export const MATERIAL_CARD_DEFS = [
  { i18nKey: 'analizaBatonow', icon: 'bar' },
  { i18nKey: 'bialkoPrzyszlosci', icon: 'pie' },
  { i18nKey: 'czyWiesz10Faktow', icon: 'brain' },
  { i18nKey: 'mityIFakty', icon: 'scales' },
  { i18nKey: 'jakPowstajeBialkoOwadzie', icon: 'factory' },
];

export function getMaterialCardsWithHref() {
  const hrefByKey = Object.fromEntries(
    getEducationMaterials().map((m) => [m.i18nKey, m.href]),
  );
  return MATERIAL_CARD_DEFS.map((def) => ({
    ...def,
    href: hrefByKey[def.i18nKey],
  })).filter((x) => x.href);
}

function basenameFromGlobPath(path) {
  const seg = path.split('/');
  return seg[seg.length - 1];
}

/**
 * PDFs from src/assets/materials/, sorted for display, each with href and i18n item key.
 */
export function getEducationMaterials() {
  const items = Object.entries(pdfGlob)
    .map(([path, href]) => {
      const base = basenameFromGlobPath(path).normalize('NFC');
      const i18nKey = BASENAME_TO_I18N_KEY[base];
      if (!i18nKey) {
        console.warn('[materials] Unmapped PDF, add to BASENAME_TO_I18N_KEY:', base);
        return null;
      }
      return { href, i18nKey };
    })
    .filter(Boolean);

  return items.sort(
    (a, b) =>
      DISPLAY_ORDER.indexOf(a.i18nKey) - DISPLAY_ORDER.indexOf(b.i18nKey),
  );
}
