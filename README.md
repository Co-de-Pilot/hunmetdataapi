# HunMetDataAPI 🌦️

Magyar meteorológiai adatokat szolgáltató REST API a Hungaromet hivatalos mérőállomásainak adatai alapján.

**Éles verzió:** [https://hunmetdataapi.hu](https://hunmetdataapi.hu)

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Funkciók

- **Automatikus adatgyűjtés** - Ütemezett letöltés a Hungaromet szerveréről
- **REST API** - Időjárási adatok lekérdezése JSON formátumban
- **Repülőtéri adatok** - Dedikált endpoint légiforgalmi célokra (QFE/QNH, látástávolság)
- **Szűrés és lapozás** - Rugalmas query paraméterek
- **Interaktív térkép** - Mérőállomások vizualizációja
- **Grafikonok** - Időjárási adatok időbeli változása

## 🛠️ Technológiák

| Kategória | Technológia |
|-----------|-------------|
| Runtime | Node.js 20.x |
| Framework | Express.js |
| Adatbázis | MongoDB + Mongoose |
| Ütemezés | node-schedule |
| Adatfeldolgozás | csv-parser, unzipper |
| HTTP kliens | got |
| Frontend | Vanilla JS, Leaflet, Chart.js |

## 🚀 Telepítés

### Előfeltételek

- Node.js 20.x vagy újabb
- MongoDB 7.x vagy újabb
- npm vagy yarn

### Lépések

```bash
# Repó klónozása
git clone https://github.com/Co-de-Pilot/hunmetdataapi.git
cd hunmetdataapi

# Függőségek telepítése
npm install

# Környezeti változók beállítása
cp .env.example .env
# Szerkeszd a .env fájlt a saját MongoDB connection string-eddel

# Szerver indítása
npm start
```

### Környezeti változók

Hozz létre egy `.env` fájlt a projekt gyökerében:

```env
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>
```

## 📡 API Endpoints

### Mérőállomások (Static Data)

| Endpoint | Leírás |
|----------|--------|
| `GET /staticdata` | Összes mérőállomás listája |
| `GET /staticdata/:stationid` | Egy mérőállomás adatai |
| `GET /staticdata/aerodromes` | Repülőtéri állomások |

### Meteorológiai adatok (Met Data)

| Endpoint | Leírás |
|----------|--------|
| `GET /metdata` | Összes mérési adat |
| `GET /metdata/:stationid` | Adott állomás mérései |

### Query paraméterek

```
?sort=utcDataTime        # Rendezés mező szerint
?fields=temp,humidity    # Mezők szűrése
?page=1&limit=100        # Lapozás
?temp[gte]=20            # Szűrés (gte, gt, lte, lt)
```

### Példa lekérdezés

```bash
# Budapest-Ferihegy utolsó 24 óra adatai
curl "https://hunmetdataapi.hu/metdata/12843?sort=-utcDataTime&limit=24"
```

### Példa válasz

```json
{
  "status": "success",
  "results": 24,
  "data": {
    "metdatas": [
      {
        "stationId": 12843,
        "utcDataTime": "2025-01-23T12:00:00.000Z",
        "temperature": 5.2,
        "humidity": 78,
        "pressure": 1013.25,
        "windSpeed": 12,
        "windDirection": 270
      }
    ]
  }
}
```

## 📁 Projekt struktúra

```
hunmetdataapi/
├── index.mjs              # Alkalmazás belépési pont
├── controllers/           # Request handlerek
│   ├── metdatacontroller.mjs
│   ├── staticdatacontroller.mjs
│   └── errorcontroller.mjs
├── models/                # Mongoose sémák
│   ├── metdatamodel.mjs
│   └── staticdatamodel.mjs
├── routes/                # API útvonalak
│   ├── metdataroutes.mjs
│   └── staticdataroutes.mjs
├── utilities/             # Segédfüggvények
│   ├── apifeatures.mjs    # Szűrés, rendezés, lapozás
│   ├── apperror.mjs       # Egyedi hibaosztály
│   └── asynchelpers.mjs   # Async error handling
├── public/                # Frontend
│   └── aerodromes/        # Repülőtéri dashboard
└── .env.example           # Környezeti változók minta
```

## 🗄️ Adatmodell

### Mérőállomás (Staticdata)

```javascript
{
  stationId: Number,       // Egyedi állomás azonosító
  stationname: String,     // Állomás neve
  location: {              // GeoJSON pont
    type: "Point",
    coordinates: [lng, lat]
  }
}
```

### Mérési adat (Metdata)

```javascript
{
  stationId: Number,
  utcDataTime: Date,
  temperature: Number,     // °C
  humidity: Number,        // %
  pressure: Number,        // hPa
  windSpeed: Number,       // km/h
  windDirection: Number,   // fok
  // ... további mezők
}
```

## 🔧 Fejlesztés

```bash
# Fejlesztői mód (hot reload)
npm run dev

# Tesztek futtatása
npm test

# Linting
npm run lint
```

## 🐳 Docker (opcionális)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.mjs"]
```

```bash
# Build és futtatás
docker build -t hunmetdataapi .
docker run -p 3000:3000 --env-file .env hunmetdataapi
```

## 📊 Architektúra

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Hungaromet    │────▶│  HunMetDataAPI  │────▶│    MongoDB      │
│   (ZIP/CSV)     │     │   (Node.js)     │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
              ┌─────▼─────┐           ┌───────▼───────┐
              │  REST API │           │   Frontend    │
              │  (JSON)   │           │  (Leaflet +   │
              └───────────┘           │   Chart.js)   │
                                      └───────────────┘
```

## 🤝 Közreműködés

1. Fork-old a repót
2. Hozz létre egy feature branch-et (`git checkout -b feature/ujfunkcio`)
3. Commit-old a változtatásokat (`git commit -m 'Új funkció hozzáadása'`)
4. Push-old a branch-et (`git push origin feature/ujfunkcio`)
5. Nyiss egy Pull Request-et

## 📝 Licensz

MIT License - lásd a [LICENSE](LICENSE) fájlt.

## 👤 Szerző

**Nógrádi József**

- Website: [hunmetdataapi.hu](https://hunmetdataapi.hu)
- GitHub: [@Co-de-Pilot](https://github.com/Co-de-Pilot)

## 🙏 Köszönetnyilvánítás

- [Hungaromet](https://www.met.hu/) - Meteorológiai adatok forrása
- [Leaflet](https://leafletjs.com/) - Interaktív térkép
- [Chart.js](https://www.chartjs.org/) - Grafikonok

---

⭐ Ha hasznosnak találod a projektet, adj egy csillagot a GitHub-on!
