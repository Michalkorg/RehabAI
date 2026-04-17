diff --git a/README.md b/README.md
index d99e373909d9877d0560c21e2a752c634eeeaee1..709546f10ca1282075a00b931f0a978917b71ae0 100644
--- a/README.md
+++ b/README.md
@@ -1,31 +1,122 @@
 # RehabAI – Webowa aplikacja wspomagająca rehabilitację z AI
 
 ## Opis projektu
-**RehabAI** to aplikacja webowa wspierająca fizjoterapeutów/lekarzy w procesie powrotu do pełnej sprawności po kontuzji.  
-Główną funkcjonalnością jest **automatyczna klasyfikacja etapu rehabilitacji** na podstawie danych pacjenta przy użyciu **TensorFlow.js**. Projekt kładzie nacisk na podejście **AI-first**, a reszta aplikacji pełni rolę minimalistycznej powłoki do wprowadzania danych i wyświetlania wyników.
+**RehabAI** to aplikacja webowa wspierająca fizjoterapeutów/lekarzy w procesie powrotu do sprawności po kontuzji.
+Główną funkcjonalnością jest **automatyczna klasyfikacja etapu rehabilitacji** na podstawie danych pacjenta.
+
+Model działa po stronie przeglądarki (TensorFlow.js), a aplikacja nie wymaga backendu.
 
 ---
 
-## Funkcjonalności MVP
-- Formularz do wprowadzania danych pacjenta:
+## Funkcjonalności MVP+
+- Rejestracja lekarza (imię i nazwisko, login, hasło)
+- Logowanie lekarza loginem i hasłem
+- Formularz danych pacjenta:
+  - Imię pacjenta
   - Zakres ruchu (ROM)
   - Ból (VAS 0–10)
-  - Siła mięśni
-  - Asymetria lewa/prawa
-  - Liczba dni od urazu
-- Predykcja etapu rehabilitacji (`Ostra`, `Odbudowa`, `Funkcjonalna`, `Powrót do sportu`)  
-- Wskaźnik pewności predykcji  
-- Prosta wizualizacja wyników (wykres słupkowy lub pasek procentowy)  
-- Model TensorFlow.js działający w przeglądarce (bez backendu)
+  - Siła mięśni (0–10)
+  - Asymetria lewa/prawa (%)
+  - Dni od urazu
+- Predykcja etapu rehabilitacji:
+  - `Ostra`
+  - `Odbudowa`
+  - `Funkcjonalna`
+  - `Powrót do sportu`
+- Szacowany czas powrotu do sportu (dni) dla etapu `Powrót do sportu`
+- Wskaźnik pewności predykcji
+- Wykres słupkowy prawdopodobieństw klas
+- Historia predykcji lekarza zapisana lokalnie (localStorage)
 
 ---
 
-## Technologie
-- **Frontend:** React + TypeScript, Vite  
-- **AI:** TensorFlow.js  
-- **Wizualizacja:** Chart.js / Recharts  
-- **Środowisko developerskie:** VS Code  
-- **Opcjonalnie backend:** Node.js + Express / NestJS (dla przechowywania danych pacjentów)
+## Czy potrzebny jest token?
+**Nie.**
+
+Ta wersja aplikacji:
+- **nie korzysta** z zewnętrznego API AI,
+- **nie wymaga** tokena (`Bearer`, `apiKey`, itp.),
+- działa jako aplikacja frontendowa.
 
 ---
 
+## Jak działa AI lokalnie?
+1. Aplikacja używa `@tensorflow/tfjs` w przeglądarce.
+2. Model jest bootstrapowany i uczony na syntetycznych danych opartych o heurystyki.
+3. Po wpisaniu parametrów pacjenta wykonywana jest predykcja etapu rehabilitacji.
+4. Wynik + pewność + rozkład klas są wyświetlane w UI.
+5. Dane konta lekarza i historia predykcji są trzymane w `localStorage`.
+
+> Uwaga: model ma charakter wspomagający i nie zastępuje decyzji klinicznej.
+
+---
+
+## Legenda pól formularza
+
+### 1) Imię pacjenta
+- Pole identyfikacyjne do wyszukiwania wpisów w historii.
+- Może być to imię i nazwisko lub ID pacjenta.
+
+### 2) Zakres ruchu (ROM)
+- Zakres: **0–180** (stopnie).
+- Wyższa wartość zwykle oznacza lepszą mobilność.
+
+### 3) Ból (VAS 0–10)
+- **0** = brak bólu.
+- **10** = ból bardzo silny.
+
+### 4) Siła mięśni (0–10)
+- **0** = brak aktywacji.
+- **10** = pełna siła funkcjonalna.
+
+### 5) Asymetria lewa/prawa (%)
+- Zakres: **0–100%**.
+- **0%** = pełna symetria.
+
+### 6) Dni od urazu
+- Liczba dni od momentu kontuzji.
+
+---
+
+## Legenda odczytu wyników AI
+
+### Etap rehabilitacji
+Model wybiera jeden z 4 etapów:
+- **Ostra** – wczesna faza po urazie.
+- **Odbudowa** – poprawa funkcji i kontroli.
+- **Funkcjonalna** – wyższa gotowość do obciążeń.
+- **Powrót do sportu** – etap końcowy, najwyższa gotowość.
+
+### Pewność predykcji (%)
+- Im wyższy procent, tym bardziej jednoznaczna decyzja modelu.
+
+### Wykres słupkowy
+- Pokazuje prawdopodobieństwa wszystkich klas.
+- Najwyższy słupek = klasa wybrana przez model.
+
+### Szacowany czas powrotu do sportu (dni)
+- Wyświetlany tylko dla etapu **„Powrót do sportu”**.
+
+---
+
+## Stack technologiczny
+- **Frontend:** React + TypeScript + Vite
+- **AI:** TensorFlow.js (lokalnie w przeglądarce)
+- **Wizualizacja:** Recharts
+- **Pamięć danych:** localStorage
+
+---
+
+## Uruchomienie lokalne
+```bash
+npm install
+npm run dev
+```
+
+Domyślny adres: `http://localhost:5173`
+
+## Build produkcyjny
+```bash
+npm run build
+npm run preview
+```
