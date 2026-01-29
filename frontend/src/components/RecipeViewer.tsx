import React, { useState } from 'react';
import { RECIPE_DATA } from '../data/recipes';

interface Recipe {
  step: number;
  processStep: string;
  realInk: string;
  mimicInk: string;
  viscosity: string;
  orifice: string;
  notes: string;
}

export const RecipeViewer = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="recipe-viewer">
      <h2>Mimic Ink Recipes</h2>
      
      <div className="recipe-grid">
        <div className="recipe-header">
          <span>Step</span>
          <span>Process</span>
          <span>Real Ink</span>
          <span>Mimic Recipe</span>
          <span>Viscosity</span>
          <span>Orifice</span>
          <span>Notes</span>
        </div>
        
        <div className="recipe-body">
          {RECIPE_DATA.map((recipe: Recipe) => (
            <React.Fragment key={recipe.step}>
              <div 
                className={`recipe-row ${selectedStep === recipe.step ? 'selected' : ''}`}
                onClick={() => setSelectedStep(selectedStep === recipe.step ? null : recipe.step)}
              >
                <span className="step-num">{recipe.step}</span>
                <span className="process">{recipe.processStep}</span>
                <span className="real-ink">{recipe.realInk}</span>
                <span className="mimic-ink">{recipe.mimicInk}</span>
                <span>{recipe.viscosity}</span>
                <span>{recipe.orifice}</span>
                <span className="notes">{recipe.notes}</span>
              </div>
              
              {selectedStep === recipe.step && (
                <div className="recipe-detail">
                  <div className="detail-content">
                    <h4>{recipe.processStep}</h4>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <strong>Real Material:</strong>
                        <p>{recipe.realInk}</p>
                      </div>
                      <div className="detail-item mimic">
                        <strong>Mimic Recipe (10 mL):</strong>
                        <p>{recipe.mimicInk}</p>
                      </div>
                      <div className="detail-item">
                        <strong>Viscosity:</strong>
                        <p>{recipe.viscosity}</p>
                      </div>
                      <div className="detail-item">
                        <strong>PEEK Orifice:</strong>
                        <p>{recipe.orifice}</p>
                      </div>
                      <div className="detail-item full">
                        <strong>Notes:</strong>
                        <p>{recipe.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <style>{`
        .recipe-viewer {
          background: #1e293b;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          margin-top: 20px;
        }
        
        .recipe-viewer h2 {
          font-size: 1rem;
          color: #94a3b8;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .recipe-grid {
          overflow-x: auto;
        }
        
        .recipe-header, .recipe-row {
          display: grid;
          grid-template-columns: 40px 180px 1fr 1.5fr 80px 90px 1.5fr;
          gap: 8px;
          padding: 10px 12px;
          align-items: start;
        }
        
        .recipe-header {
          background: #334155;
          border-radius: 6px 6px 0 0;
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .recipe-row {
          background: #0f172a;
          border-bottom: 1px solid #334155;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .recipe-row:hover {
          background: #1e293b;
        }
        
        .recipe-row.selected {
          background: #334155;
        }
        
        .step-num {
          background: #3b82f6;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-align: center;
          font-size: 0.85rem;
        }
        
        .process {
          font-weight: 500;
          color: #e2e8f0;
          font-size: 0.8rem;
        }
        
        .real-ink, .mimic-ink {
          font-size: 0.75rem;
          color: #94a3b8;
        }
        
        .notes {
          font-size: 0.7rem;
          color: #64748b;
          font-style: italic;
        }
        
        .recipe-detail {
          background: #0f172a;
          border-bottom: 1px solid #334155;
          padding: 16px;
        }
        
        .detail-content h4 {
          color: #38bdf8;
          margin-bottom: 12px;
          font-size: 0.95rem;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .detail-item {
          font-size: 0.8rem;
        }
        
        .detail-item.full {
          grid-column: 1 / -1;
        }
        
        .detail-item strong {
          display: block;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        
        .detail-item.mimic strong {
          color: #22c55e;
        }
        
        .detail-item p {
          color: #e2e8f0;
          margin: 0;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};
