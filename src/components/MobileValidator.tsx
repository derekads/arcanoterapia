import React, { useState, useEffect } from 'react';
import { Smartphone, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export const MobileValidator = () => {
    const [stats, setStats] = useState({
        width: 0,
        height: 0,
        isTouch: false,
        storageStorage: '0',
        errorsCount: 0,
        userAgent: ''
    });

    const [isVisible, setIsVisible] = useState(false); // Can be toggled via local storage or dev env

    useEffect(() => {
        // Toggle mechanism (e.g. only in dev mode or via URL param ?debug=true)
        if (window.location.search.includes('debug=true')) {
            setIsVisible(true);
        }

        const handleResize = () => {
            let lsSize = 0;
            try {
                let _lsTotal = 0;
                for (let x in localStorage) {
                    if (!localStorage.hasOwnProperty(x)) continue;
                    _lsTotal += (localStorage[x].length + x.length) * 2;
                }
                lsSize = _lsTotal;
            } catch (e) {
                // Ignore
            }

            setStats(prev => ({
                ...prev,
                width: window.innerWidth,
                height: window.innerHeight,
                isTouch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0),
                storageStorage: (lsSize / 1024).toFixed(2),
                userAgent: navigator.userAgent.substring(0, 50) + '...'
            }));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Catch global errors for debug
        const handleError = () => {
            setStats(p => ({ ...p, errorsCount: p.errorsCount + 1 }));
        };
        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 right-0 z-[9999] m-2 p-3 bg-black/90 backdrop-blur border border-red-500/50 rounded-xl shadow-2xl text-[10px] font-mono text-green-400 w-64 max-h-64 overflow-y-auto">
            <div className="flex justify-between items-center mb-2 border-b border-red-500/30 pb-1">
                <span className="flex items-center gap-1 font-bold text-red-400">
                    <AlertTriangle size={12} /> DEV VALIDATOR
                </span>
                <button onClick={() => setIsVisible(false)}><XCircle size={14} className="text-gray-400 hover:text-white" /></button>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <span className="text-gray-400">Viewport:</span>
                    <span className="text-yellow-300">{stats.width}x{stats.height}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Touch Device:</span>
                    <span>{stats.isTouch ? <CheckCircle2 size={12} className="inline text-green-500" /> : <XCircle size={12} className="inline text-red-500" />}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Local Storage:</span>
                    <span className={parseFloat(stats.storageStorage) > 5000 ? 'text-red-500' : 'text-blue-300'}>{stats.storageStorage} KB</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Console Errors:</span>
                    <span className={stats.errorsCount > 0 ? 'text-red-500 font-bold' : 'text-gray-500'}>{stats.errorsCount}</span>
                </div>
                <div className="mt-2 text-[8px] text-gray-500 leading-tight border-t border-gray-800 pt-1">
                    {stats.userAgent}
                </div>
            </div>
        </div>
    );
};
