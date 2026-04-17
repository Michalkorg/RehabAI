diff --git a/README.md b/README.md
index d99e373909d9877d0560c21e2a752c634eeeaee1..09cbc0e69c20b4d7e842f7eec527fc5e83f0fa88 100644
--- a/README.md
+++ b/README.md
@@ -1,31 +1,105 @@
 # RehabAI – Webowa aplikacja wspomagająca rehabilitację z AI
 
 ## Opis projektu
 **RehabAI** to aplikacja webowa wspierająca fizjoterapeutów/lekarzy w procesie powrotu do pełnej sprawności po kontuzji.  
 Główną funkcjonalnością jest **automatyczna klasyfikacja etapu rehabilitacji** na podstawie danych pacjenta przy użyciu **TensorFlow.js**. Projekt kładzie nacisk na podejście **AI-first**, a reszta aplikacji pełni rolę minimalistycznej powłoki do wprowadzania danych i wyświetlania wyników.
 
 ---
 
-## Funkcjonalności MVP
+## Funkcjonalności MVP+
+- Rejestracja lekarza (imię i nazwisko, login, hasło)
+- Logowanie lekarza loginem i hasłem
 - Formularz do wprowadzania danych pacjenta:
+  - Imię pacjenta
   - Zakres ruchu (ROM)
   - Ból (VAS 0–10)
   - Siła mięśni
   - Asymetria lewa/prawa
   - Liczba dni od urazu
-- Predykcja etapu rehabilitacji (`Ostra`, `Odbudowa`, `Funkcjonalna`, `Powrót do sportu`)  
-- Wskaźnik pewności predykcji  
-- Prosta wizualizacja wyników (wykres słupkowy lub pasek procentowy)  
+- Predykcja etapu rehabilitacji (`Ostra`, `Odbudowa`, `Funkcjonalna`, `Powrót do sportu`)
+- Szacowany czas powrotu do sportu (w dniach) dla etapu `Powrót do sportu`
+- Wskaźnik pewności predykcji
+- Wizualizacja wyników (wykres słupkowy + pasek procentowy)
+- Zapis predykcji do historii zalogowanego lekarza (localStorage)
 - Model TensorFlow.js działający w przeglądarce (bez backendu)
 
 ---
 
-## Technologie
-- **Frontend:** React + TypeScript, Vite  
-- **AI:** TensorFlow.js  
-- **Wizualizacja:** Chart.js / Recharts  
-- **Środowisko developerskie:** VS Code  
-- **Opcjonalnie backend:** Node.js + Express / NestJS (dla przechowywania danych pacjentów)
+## Stack technologiczny
+- **Frontend:** React + TypeScript, Vite
+- **AI:** TensorFlow.js
+- **Wizualizacja:** Recharts
+- **Przechowywanie sesji i historii:** localStorage
 
 ---
 
+## Legenda pól formularza
+
+### 1) Imię pacjenta
+- Pole identyfikacyjne do wyszukiwania wpisów w historii predykcji.
+- Może to być pełne imię i nazwisko lub identyfikator (np. inicjały + numer).
+
+### 2) Zakres ruchu (ROM)
+- Zakres: **0–180** (stopnie).
+- Im wyższa wartość, tym lepsza mobilność stawu.
+- Niskie wartości mogą sugerować wcześniejszy etap rehabilitacji.
+
+### 3) Ból (VAS 0–10)
+- VAS = Visual Analog Scale.
+- **0** = brak bólu, **10** = ból bardzo silny / nie do zniesienia.
+- Wyższa wartość zwykle przesuwa predykcję w stronę wcześniejszych etapów.
+
+### 4) Siła mięśni (0–10)
+- **0** = brak aktywacji mięśniowej, **10** = pełna siła funkcjonalna.
+- Wyższa siła mięśniowa zwykle oznacza bardziej zaawansowany etap rehabilitacji.
+
+### 5) Asymetria lewa/prawa (%)
+- Zakres: **0–100%**.
+- **0%** = pełna symetria stron.
+- Wyższy procent asymetrii wskazuje większą różnicę funkcjonalną między stronami.
+
+### 6) Dni od urazu
+- Liczba dni od momentu kontuzji.
+- Mniejsza liczba dni częściej koreluje z etapami wcześniejszymi, większa z etapami późniejszymi.
+
+---
+
+## Legenda odczytu wyników AI
+
+### Etap rehabilitacji
+Model wybiera 1 z 4 etapów:
+- **Ostra** – wczesny etap po urazie, zwykle wysoki ból i ograniczona funkcja.
+- **Odbudowa** – etap przejściowy, stopniowa poprawa zakresu ruchu i siły.
+- **Funkcjonalna** – wyraźna poprawa parametrów, rosnąca gotowość do obciążeń.
+- **Powrót do sportu** – etap końcowy, wysoka gotowość do pełnej aktywności.
+
+### Pewność predykcji (%)
+- Pokazuje, jak bardzo model „wierzy” w wybrany etap.
+- Im wyższy procent, tym bardziej jednoznaczna decyzja modelu.
+
+### Wykres słupkowy
+- Pokazuje rozkład prawdopodobieństw dla wszystkich 4 etapów jednocześnie.
+- Najwyższy słupek to etap wybrany przez model.
+- Niewielkie różnice między słupkami oznaczają bardziej niejednoznaczny przypadek.
+
+### Szacowany czas powrotu do sportu (dni)
+- Pokazywany tylko, gdy etap to **„Powrót do sportu”**.
+- Jest to estymacja pomocnicza oparta o aktualne parametry wejściowe.
+
+> Uwaga: wynik modelu ma charakter wspomagający i nie zastępuje decyzji klinicznej.
+
+---
+
+## Uruchomienie lokalne
+```bash
+npm install
+npm run dev
+```
+
+Aplikacja uruchomi się domyślnie pod adresem `http://localhost:5173`.
+
+## Build produkcyjny
+```bash
+npm run build
+npm run preview
+```
