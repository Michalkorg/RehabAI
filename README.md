# RehabAI – Webowa aplikacja wspomagająca rehabilitację z AI

## Opis projektu
**RehabAI** to aplikacja webowa wspierająca fizjoterapeutów/lekarzy w procesie powrotu do pełnej sprawności po kontuzji.  
Główną funkcjonalnością jest **automatyczna klasyfikacja etapu rehabilitacji** na podstawie danych pacjenta przy użyciu **TensorFlow.js**. Projekt kładzie nacisk na podejście **AI-first**, a reszta aplikacji pełni rolę minimalistycznej powłoki do wprowadzania danych i wyświetlania wyników.

---

## Funkcjonalności MVP
- Formularz do wprowadzania danych pacjenta:
  - Zakres ruchu (ROM)
  - Ból (VAS 0–10)
  - Siła mięśni
  - Asymetria lewa/prawa
  - Liczba dni od urazu
- Predykcja etapu rehabilitacji (`Ostra`, `Odbudowa`, `Funkcjonalna`, `Powrót do sportu`)  
- Wskaźnik pewności predykcji  
- Prosta wizualizacja wyników (wykres słupkowy lub pasek procentowy)  
- Predykcja etapu rehabilitacji (`Ostra`, `Odbudowa`, `Funkcjonalna`, `Powrót do sportu`)
- Wskaźnik pewności predykcji
- Wizualizacja wyników (wykres słupkowy + pasek procentowy)
- Model TensorFlow.js działający w przeglądarce (bez backendu)

---

## Technologie
- **Frontend:** React + TypeScript, Vite  
- **AI:** TensorFlow.js  
- **Wizualizacja:** Chart.js / Recharts  
- **Środowisko developerskie:** VS Code  
- **Opcjonalnie backend:** Node.js + Express / NestJS (dla przechowywania danych pacjentów)
## Stack technologiczny
- **Frontend:** React + TypeScript, Vite
- **AI:** TensorFlow.js
- **Wizualizacja:** Recharts
