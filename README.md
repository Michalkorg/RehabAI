diff --git a/README.md b/README.md
index d99e373909d9877d0560c21e2a752c634eeeaee1..ce45952a66ad735a7e3bbca5893d15abdf9ea007 100644
--- a/README.md
+++ b/README.md
@@ -1,31 +1,47 @@
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
