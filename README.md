# Mots - Frans Leren Flashcards

Een eenvoudige en elegante app om Franse woorden te oefenen, gebouwd met React, Vite en Tailwind CSS. Deze app maakt gebruik van het "Natural Tones" design thema voor een rustige leerervaring.

## Kenmerken
- Interactieve flip-cards met 3D-animatie.
- Voortgangsbalk en woordnavigator.
- Rustgevend organisch design.

---

## 🚀 Hoe te publiceren op GitHub Pages (Handleiding)

Volg deze stappen om je eigen versie van deze app online te zetten:

### 1. Voorbereiding op GitHub
1. Log in op je **GitHub** account.
2. Maak een **nieuw repository** aan (bijv. `franse-woordjes`).
3. Houd de URL van je repository bij de hand (bijv. `https://github.com/GEBRUIKERSNAAM/franse-woordjes.git`).

### 2. De code lokaal instellen
Als je de code downloadt uit AI Studio:
1. Open een terminal/opdrachtprompt in de projectmap.
2. Installeer de benodigdheden:
   ```bash
   npm install
   ```

### 3. Verbinden met GitHub
Initialiseer git en koppel je repository:
```bash
git init
git add .
git commit -m "Eerste versie van Mots app"
git remote add origin https://github.com/GEBRUIKERSNAAM/franse-woordjes.git
git branch -M main
git push -u origin main
```

### 4. Deployen (Publiceren)
Nu kun je de app met één commando online zetten:
```bash
npm run deploy
```
*Dit commando bouwt de app (`npm run build`) en pusht de inhoud van de `dist` map naar een speciale branch genaamd `gh-pages`.*

### 5. GitHub Pages activeren
1. Ga in je GitHub repository naar **Settings** > **Pages**.
2. Zorg dat bij **Build and deployment** de bron staat op **Deploy from a branch**.
3. Selecteer bij **Branch** de branch `gh-pages` en de map `/(root)`.
4. Klik op **Save**.

Na een minuutje zal je app live staan op:
`https://GEBRUIKERSNAAM.github.io/franse-woordjes/`

---

## 🛠 Lokaal Ontwikkelen
Wil je verder sleutelen aan de app?
- Start de development server: `npm run dev`
- Bekijk de app op `http://localhost:3000`
