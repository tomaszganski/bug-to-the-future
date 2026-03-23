# Bug to the Future 🌱

**Białko przyszłości** - Landing page do zbierania danych ankietowych pre/post z krótką interwencją edukacyjną o alternatywnych źródłach białka.

## 🎯 Cel projektu

- Zebranie danych ankietowych pre–post
- Przeprowadzenie użytkownika przez krótką interwencję edukacyjną
- Neutralne poznawczo doświadczenie (bez presji ideologicznej)

## 🚀 Uruchomienie

Projekt używa [just](https://github.com/casey/just) jako command runner.

```bash
# Pokaż dostępne komendy
just

# Instalacja zależności
just install

# Uruchomienie serwera deweloperskiego
just dev

# Build produkcyjny
just build

# Podgląd builda
just preview
```

## 📦 Deploy na GitHub Pages

```bash
# Deploy (buduje i publikuje na gh-pages branch)
just deploy

# Deploy z własną wiadomością commita
just deploy-msg "Moja wiadomość"
```

Po deployu:
1. Wejdź w Settings → Pages w swoim repozytorium
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Strona będzie dostępna pod: `https://[username].github.io/bug-to-the-future/`

## 🎨 Paleta kolorów

| Kolor | Hex | Użycie |
|-------|-----|--------|
| Mięta | `#B9F5D8` | Dominujący |
| Jasna zieleń | `#A3E7C2` | Dominujący |
| Piaskowy beż | `#F7F1E1` | Tło |
| Jasnozłoty | `#FFD479` | Akcent (CTA) |

## 📱 Struktura aplikacji

1. **Hero** - Strona główna z CTA
2. **Pre-Survey** - Ankieta przed edukacją (6 pytań)
3. **Education** - Krótki intro (popup) i materiał wideo o białku przyszłości
4. **Post-Survey** - Ankieta po edukacji (4 pytania)
5. **Closing** - Podziękowanie i opcja udostępnienia

## 🛠 Technologie

- **React 19** - Framework UI
- **Vite** - Build tool
- **Framer Motion** - Animacje
- **Zustand** - Stan aplikacji
- **react-i18next** - Internacjonalizacja
- **CSS Modules** - Style

## 🧹 Inne komendy

```bash
# Czyszczenie builda
just clean

# Pełne czyszczenie (z node_modules)
just clean-all

# Reinstalacja zależności
just reinstall

# Linter
just lint
```

---

Projekt stworzony dla badania nad percepcją alternatywnych źródeł białka wśród młodych konsumentów.
