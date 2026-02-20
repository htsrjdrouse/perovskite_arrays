import React, { useState } from 'react';

const RECIPE_DATA = [
  {
    layer: 'PEDOT:PSS mimic',
    viscosity: '3–6 cP',
    xanthan: '0.002–0.003 g',
    stockVolume: '0.2–0.3 mL',
    baseRecipe: '9.5 mL water + 3–4 drops blue + 0.3 mL glycerin + 1 drop soap',
    notes: 'Very thin — use less stock if too thick.'
  },
  {
    layer: 'FASnI₃ mimic',
    viscosity: '15–20 cP',
    xanthan: '0.004–0.005 g',
    stockVolume: '0.4–0.5 mL',
    baseRecipe: '8.8 mL water + 1–2 drops yellow + 1 drop red + 1 mL glycerin',
    notes: 'Medium thickness — start with 0.4 mL stock.'
  },
  {
    layer: 'ICBA mimic',
    viscosity: '12–18 cP',
    xanthan: '0.003–0.004 g',
    stockVolume: '0.3–0.4 mL',
    baseRecipe: '9.3 mL water + 0.6 mL glycerin + 0.2 mL hand sanitizer gel + 1 drop soap',
    notes: 'Clear & smooth — adjust stock for flow.'
  },
  {
    layer: 'Dequasol mimic',
    viscosity: '5–10 cP',
    xanthan: '0.002–0.003 g',
    stockVolume: '0.2–0.3 mL',
    baseRecipe: '9.5 mL water + 0.5 mL glycerin + 1 drop soap',
    notes: 'Thin & hard-setting — low xanthan.'
  },
  {
    layer: 'Resin seal mimic',
    viscosity: '90–150 cP',
    xanthan: '0.01–0.015 g',
    stockVolume: '1.0–1.5 mL',
    baseRecipe: '7 mL PVA glue + 3 mL water + 0.5 mL glycerin',
    notes: 'Thick — use more stock + PVA base.'
  }
];

export default function App() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  return (
    <div className="container">
      <header>
        <h1>🧪 Perovskite Mimic Ink Recipes</h1>
        <p>Using 0.1% xanthan gum stock solution</p>
      </header>

      <div className="recipe-section">
        <p className="intro">
          Make a 0.1% xanthan gum stock: Add 0.1 g xanthan to 100 mL water, shake vigorously, let hydrate 2+ hours. Use this stock to adjust viscosity.
        </p>
        
        <div className="recipe-table">
          <div className="table-header">
            <span>Layer / Ink</span>
            <span>Target Viscosity</span>
            <span>Xanthan (g/10mL)</span>
            <span>Stock Volume</span>
            <span>Base Recipe</span>
            <span>Notes</span>
          </div>
          
          {RECIPE_DATA.map((recipe, idx) => (
            <React.Fragment key={idx}>
              <div 
                className={`table-row ${selectedLayer === idx ? 'selected' : ''}`}
                onClick={() => setSelectedLayer(selectedLayer === idx ? null : idx)}
              >
                <span className="layer-name">{recipe.layer}</span>
                <span>{recipe.viscosity}</span>
                <span className="xanthan">{recipe.xanthan}</span>
                <span>{recipe.stockVolume}</span>
                <span className="base-recipe">{recipe.baseRecipe}</span>
                <span className="notes">{recipe.notes}</span>
              </div>
              
              {selectedLayer === idx && (
                <div className="detail-panel">
                  <h3>{recipe.layer}</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Target Viscosity:</strong>
                      <p>{recipe.viscosity}</p>
                    </div>
                    <div className="detail-item">
                      <strong>Xanthan per 10 mL:</strong>
                      <p>{recipe.xanthan}</p>
                    </div>
                    <div className="detail-item">
                      <strong>0.1% Stock to Add:</strong>
                      <p>{recipe.stockVolume}</p>
                    </div>
                    <div className="detail-item full">
                      <strong>Base Recipe (10 mL total):</strong>
                      <p>{recipe.baseRecipe}</p>
                    </div>
                    <div className="detail-item full">
                      <strong>Notes:</strong>
                      <p>{recipe.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f8fafc;
          color: #1e293b;
          min-height: 100vh;
        }
        .container { max-width: 1400px; margin: 0 auto; padding: 30px 20px; }
        header { text-align: center; margin-bottom: 24px; }
        header h1 {
          font-size: 2rem;
          color: #0f172a;
          margin-bottom: 6px;
        }
        header p { color: #64748b; }
        .recipe-section { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .intro {
          padding: 16px 20px;
          background: #fef3c7;
          color: #92400e;
          font-size: 0.9rem;
          border-bottom: 1px solid #fde68a;
        }
        .table-header, .table-row {
          display: grid;
          grid-template-columns: 140px 90px 100px 100px 1fr 1.2fr;
          gap: 10px;
          padding: 12px 16px;
          align-items: start;
        }
        .table-header {
          background: #f1f5f9;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
          font-weight: 600;
        }
        .table-row {
          border-bottom: 1px solid #e2e8f0;
          cursor: pointer;
          transition: background 0.2s;
        }
        .table-row:hover { background: #f8fafc; }
        .table-row.selected { background: #eff6ff; }
        .layer-name { font-weight: 500; font-size: 0.85rem; color: #1e40af; }
        .xanthan { font-weight: 500; color: #16a34a; }
        .base-recipe { font-size: 0.8rem; color: #64748b; }
        .notes { font-size: 0.75rem; color: #94a3b8; font-style: italic; }
        .detail-panel {
          background: #eff6ff;
          padding: 20px;
          border-bottom: 1px solid #dbeafe;
        }
        .detail-panel h3 { color: #1e40af; margin-bottom: 16px; font-size: 1rem; }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .detail-item strong { display: block; font-size: 0.75rem; color: #64748b; margin-bottom: 4px; text-transform: uppercase; }
        .detail-item p { font-size: 0.9rem; line-height: 1.5; }
        .detail-item.full { grid-column: 1 / -1; }
      `}</style>
    </div>
  );
}
