# Frontend – Virtual Try-On

This `frontend` app is a standalone React + Vite implementation of the AI Fashion Futures Virtual Try-On experience. It runs entirely on the client using mock data and local 3D models.

## Folder structure (relevant parts)

- `src/pages/TryOnPage.jsx` – main Try-On layout (controls + 3D viewer)
- `src/components/VirtualTryOn/` – viewer, avatar loader, clothing loader, forms, selector
- `src/hooks/useAvatarScaling.js` – scales avatar/clothing based on measurements
- `src/utils/measurementUtils.js` – base measurement and scaling helpers
- `src/utils/clothingUtils.js` – available garments + model paths
- `src/services/*.js` – mock services for future backend integration
- `src/styles/tryon.css` – layout and styling
- `public/models/body/female_base.glb` – avatar model (you add this)
- `public/models/garments/*.glb` – garment models (you add these)

## Adding your 3D models

Create the following folders under `frontend/public`:

- `public/models/body/`
  - `female_base.glb`
- `public/models/garments/`
  - `tshirt01.glb`
  - `dress01.glb`
  - `dress02.glb`
  - (optional) `dress03.glb` if you add a third dress file

These files are loaded in the viewer via URLs like:

- `/models/body/female_base.glb`
- `/models/garments/tshirt01.glb`

You can add the `public` folder at any time, but to see real models in the viewer you should place these files **before** running the app.

## Installing and running (Windows, PowerShell, npm)

From your project root (`h:\\review 2 project\\ai-fashion-futures-main`):

```sh
cd "frontend"
npm install --legacy-peer-deps
npm run dev
```

Then open:

- `http://localhost:5173/try-on` – Virtual Try-On page

To build and preview a production bundle:

```sh
npm run build
npm run preview
```

