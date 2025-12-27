# Astro Tauri

Applicazione desktop multi-piattaforma costruita con Astro e Tauri, contenente una serie di micro-app utili.

## 🚀 Tecnologie

- **Frontend**: Astro 5, React 19, Tailwind CSS 4
- **Backend**: Tauri 2, Rust
- **Database**: SQLite (rusqlite)

## 📋 Prerequisiti

- **Node.js 25.1.0** (specificato in `.nvmrc`)
- **npm** o altro package manager
- **Rust** - [Installa Rust](https://www.rust-lang.org/tools/install)

## 🛠️ Installazione

```bash
# 1. Installa Rust (se non già installato)
# Visita https://www.rust-lang.org/tools/install
# oppure esegui: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Se usi nvm, attiva la versione corretta di Node.js
nvm use

# 3. Installa le dipendenze
npm install

# 4. Verifica che tutto funzioni
npm run tauri:dev
```

## 🎯 Comandi Disponibili

### Sviluppo

```bash
# Avvia l'app in modalità sviluppo (Astro + Tauri)
npm run tauri:dev

# Solo Astro (per sviluppo frontend)
npm run dev
```

### Build

```bash
# Build per produzione
npm run tauri:build
```

### Code Quality

```bash
# Lint e fix automatico
npm run fix

# Solo lint
npm run lint

# Solo format
npm run format

# Verifica formattazione
npm run format:check
```

## 📁 Struttura Progetto

```
├── src/
│   ├── components/     # Componenti React e Astro
│   ├── hooks/          # React hooks personalizzati
│   ├── lib/            # Utilities e API
│   ├── layouts/        # Layout Astro
│   ├── pages/          # Pagine Astro
│   └── styles/         # Stili globali
├── src-tauri/          # Backend Rust/Tauri
│   ├── src/
│   │   ├── commands/   # Comandi Tauri
│   │   ├── db/         # Database e schema
│   │   ├── models/     # Modelli dati
│   │   ├── repositories/# Accesso ai dati
│   │   └── services/   # Logica di business
│   └── Cargo.toml
└── package.json
```

## 🎨 Micro-App Disponibili

- **Todo App**: Gestione attività con persistenza SQLite (Tauri) o localStorage (browser)
- **Base64 Encoder/Decoder**: Codifica e decodifica Base64

## 🐳 Deploy Frontend (Docker)

Il frontend può essere deployato come sito statico senza Tauri:

### Con Docker Compose (Consigliato)

```bash
# 1. Build e avvia il container in background
docker compose up -d --build

# 2. Verifica che il container sia in esecuzione
docker compose ps

# 3. Apri il browser su http://localhost:3000
#    (la porta 3000 dell'host è mappata alla porta 80 del container)

# 4. Per vedere i log del container
docker compose logs -f

# 5. Per fermare il container
docker compose down

# 6. Per fermare e rimuovere anche i volumi (se presenti)
docker compose down -v
```

### Build e Test Locale (Docker diretto)

```bash
# 1. Build dell'immagine Docker
docker build -t astro-tauri-frontend .

# 2. Esegui il container in background
#    -p 3000:80 mappa la porta 3000 dell'host alla porta 80 del container
#    (Nginx ascolta sulla porta 80 nel container)
docker run -d -p 3000:80 --name astro-frontend astro-tauri-frontend

# 3. Verifica che il container sia in esecuzione
docker ps

# 4. Apri il browser su http://localhost:3000
#    (la porta 3000 dell'host è mappata alla porta 80 del container)

# 5. Per vedere i log del container
docker logs astro-frontend

# 6. Per fermare il container
docker stop astro-frontend

# 7. Per rimuovere il container
docker rm astro-frontend
```

**Nota**: Puoi cambiare la porta dell'host se preferisci. Ad esempio:

- `-p 8080:80` → accedi su `http://localhost:8080`
- `-p 80:80` → accedi su `http://localhost` (richiede permessi root)

### Test dei React Islands

Dopo aver avviato il container, verifica:

1. **Homepage**: `http://localhost:3000` - dovrebbe mostrare la lista delle micro-app
2. **Base64 App**: `http://localhost:3000/apps/base64/` - dovrebbe funzionare (solo JavaScript lato client)
3. **Todo App**: `http://localhost:3000/apps/todo/` - l'UI React dovrebbe caricare e funzionare usando localStorage come fallback

**Nota**: Le route devono avere il trailing slash (`/`) per funzionare correttamente. Se accedi senza trailing slash, nginx reindirizzerà automaticamente.

**Nota**: La Todo App rileva automaticamente se Tauri è disponibile:

- **Con Tauri**: usa SQLite per la persistenza
- **Senza Tauri (browser)**: usa localStorage automaticamente come fallback

## 📝 Note

- Il database SQLite viene creato automaticamente nella directory dell'app (solo in versione desktop)
- Le configurazioni di lint e format sono già configurate (ESLint + Prettier)
- Il frontend può essere deployato come sito statico usando Docker
