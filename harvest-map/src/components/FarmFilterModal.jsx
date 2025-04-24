// File: src/components/FarmFilterModal.jsx
import React from 'react';
import './FarmFilterModal.css';

export default function FarmFilterModal({
                                            isOpen,
                                            types,
                                            selectedTypes,
                                            onToggleType,
                                            onClear,
                                            onApply,
                                            onClose
                                        }) {
    if (!isOpen) return null;

    return (
        <div
            className="filter-modal-backdrop"
            onClick={onClose}
            data-testid="filter-backdrop"
        >
            <div
                className="filter-modal-content"
                role="dialog"
                aria-modal="true"
                onClick={e => e.stopPropagation()}
            >
                <header className="filter-modal-header">
                    <h2>Filters</h2>
                    <button onClick={onClose} aria-label="Close filters">
                        &times;
                    </button>
                </header>

                <div className="filter-modal-body">
                    <h4>Farm Types</h4>
                    <div className="filter-options">
                        {types.map(ft => (
                            <label key={ft.key} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(ft.key)}
                                    onChange={() => onToggleType(ft.key)}
                                />
                                <span style={{ marginLeft: 8 }}>
                  {ft.icon} {ft.label}
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <footer className="filter-modal-footer">
                    <button onClick={onClear}>Clear all</button>
                    <button onClick={onApply}>Apply</button>
                </footer>
            </div>
        </div>
    );
}
