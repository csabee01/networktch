# Network Technologies Kft — React oldal

## Előfeltételek
- [Node.js](https://nodejs.org/) 18+ telepítve

## Indítás (fejlesztői mód)

```bash
# 1. Másold a mappát helyi gépre (hálózati meghajtóról ne futtasd!)
#    pl. C:\NT-React\

# 2. Másold az asset mappákat a public/ mappába:
#    pics/    → public/pics/
#    galeria/ → public/galeria/
#    docs/    → public/docs/

# 3. Telepítsd a csomagokat
npm install

# 4. Indítsd el fejlesztői módban
npm run dev
# → http://localhost:5173
```

## Build (éles verzió)

```bash
npm run build
# → dist/ mappa tartalmazza a kész weboldalt
```

A `dist/` tartalmát másold a webszerverre (vagy a hálózati mappába az `uj/` mellé).

## Struktúra

```
uj-react/
  public/          ← ide kell másolni: pics/, galeria/, docs/
  src/
    components/
      Nav.jsx
      Hero.jsx
      MarqueeSection.jsx
      Services.jsx
      CameraShowcase.jsx
      Stats.jsx
      About.jsx
      TechStack.jsx
      Process.jsx
      Gallery.jsx
      Contact.jsx
      Footer.jsx
    App.jsx
    main.jsx
    index.css
  index.html
  vite.config.js
  package.json
```
