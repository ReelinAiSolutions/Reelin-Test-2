import React, { useState, useEffect } from 'react';
import { analyzePage, trackScrollDepth, PageHealth } from '../utils/analytics';
import { BarChart, Activity, AlertTriangle, CheckCircle, X } from 'lucide-react';

export const ConversionAnalyzer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [health, setHealth] = useState<PageHealth | null>(null);
    const [scrollDepth, setScrollDepth] = useState(0);

    useEffect(() => {
        // Run initial analysis
        setHealth(analyzePage());

        // Track scroll depth
        const cleanup = trackScrollDepth((depth) => {
            setScrollDepth(prev => Math.max(prev, depth));
        });

        return cleanup;
    }, []);

    // Re-run analysis on route change (simulated by re-opening or manual refresh if we wanted)
    const runAnalysis = () => {
        setHealth(analyzePage());
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => { setIsOpen(true); runAnalysis(); }}
                className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
                title="Open Conversion Analyzer"
            >
                <Activity className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden font-sans">
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-blue-500" />
                    Page Audit
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-4 space-y-6">

                {/* Score Card */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Health Score</span>
                        <span className="font-mono">{health?.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${(health?.score || 0) >= 90 ? 'bg-green-500' :
                                    (health?.score || 0) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${health?.score}%` }}
                        />
                    </div>
                </div>

                {/* Engagement Metrics */}
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">My Engagement</h4>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{scrollDepth}%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                            Scroll Depth<br />(How far I read)
                        </div>
                    </div>
                </div>

                {/* Issues List */}
                {health && health.issues.length > 0 && (
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Improvements
                        </h4>
                        <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                            {health.issues.map((issue, idx) => (
                                <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2 bg-red-50 dark:bg-red-900/10 p-2 rounded">
                                    <span className="mt-0.5 text-red-500">•</span>
                                    {issue}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {health && health.issues.length === 0 && (
                    <div className="text-center py-4 text-green-600 dark:text-green-400 text-sm">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        No issues found on this page!
                    </div>
                )}

            </div>

            <div className="p-3 border-t border-gray-200 dark:border-zinc-800 text-xs text-center text-gray-400">
                Reelin Analyzer Active
            </div>
        </div>
    );
};
