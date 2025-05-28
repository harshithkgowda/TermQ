'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnalyzerStore, AnalysisPoint } from '@/store/useAnalyzerStore';
import { AlertCircle, CheckCircle, Info, ArrowLeftRight, ChevronDown, ChevronUp } from 'lucide-react';
import ReactDiffViewer from 'react-diff-viewer-continued';
type CompareView = 'content' | 'harmful' | 'good' | 'awareness' | 'summary' | 'ai-insights';
export default function DocumentCompare() {
  const {
    getCompareDocuments
  } = useAnalyzerStore();
  const documents = getCompareDocuments();
  const [compareView, setCompareView] = useState<CompareView>('content');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get the documents to compare
  const doc1 = documents[0] || null;
  const doc2 = documents[1] || null;

  // Prepare comparison data based on selected view
  const comparisonData = useMemo(() => {
    if (!doc1 || !doc2) return {
      left: '',
      right: ''
    };
    switch (compareView) {
      case 'content':
        return {
          left: doc1.content,
          right: doc2.content
        };
      case 'summary':
        return {
          left: doc1.summary.points.join('\n\n'),
          right: doc2.summary.points.join('\n\n')
        };
      case 'ai-insights':
        const leftInsights = doc1.aiInsights ? ['## SUGGESTIONS', ...doc1.aiInsights.suggestions, '', '## RISKS', ...doc1.aiInsights.risks, '', '## TAKEAWAYS', ...doc1.aiInsights.takeaways].join('\n\n') : 'No AI insights available';
        const rightInsights = doc2.aiInsights ? ['## SUGGESTIONS', ...doc2.aiInsights.suggestions, '', '## RISKS', ...doc2.aiInsights.risks, '', '## TAKEAWAYS', ...doc2.aiInsights.takeaways].join('\n\n') : 'No AI insights available';
        return {
          left: leftInsights,
          right: rightInsights
        };
      case 'harmful':
      case 'good':
      case 'awareness':
        const leftPoints = doc1.analysisPoints.filter(point => point.type === compareView).map(point => `${point.text}\n${point.explanation}`).join('\n\n');
        const rightPoints = doc2.analysisPoints.filter(point => point.type === compareView).map(point => `${point.text}\n${point.explanation}`).join('\n\n');
        return {
          left: leftPoints,
          right: rightPoints
        };
      default:
        return {
          left: '',
          right: ''
        };
    }
  }, [doc1, doc2, compareView]);

  // Get counts for each type
  const getCounts = (doc: typeof doc1) => {
    if (!doc) return {
      harmful: 0,
      good: 0,
      awareness: 0
    };
    return doc.analysisPoints.reduce((acc, point) => {
      acc[point.type] = (acc[point.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };
  const doc1Counts = getCounts(doc1);
  const doc2Counts = getCounts(doc2);

  // If we don't have 2 documents to compare
  if (!doc1 || !doc2) {
    return <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="8fcd3ce2-44ad-4b88-ae7c-093118309386" data-file-name="components/analyzer/DocumentCompare.tsx">
        <ArrowLeftRight className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-slate-700 mb-2" data-unique-id="9c52fd8a-a9db-4584-9f5c-5a0f7f0b69c2" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="ecb449a1-a516-453d-9605-e6e66714b7fb" data-file-name="components/analyzer/DocumentCompare.tsx">Select Two Documents to Compare</span></h3>
        <p className="text-slate-600 max-w-md mx-auto" data-unique-id="e6826969-db90-44b3-9151-8506c0592d0b" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="4e094c97-27c6-4d6c-8afc-d1ba5817625b" data-file-name="components/analyzer/DocumentCompare.tsx">
          Please select two documents from your document list to compare their contents and analysis results.
        </span></p>
      </div>;
  }
  return <div className="p-4 md:p-6" data-unique-id="5db5c2ed-27a4-4531-aa60-fd0fde59c247" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" data-unique-id="40fd7ebb-7ff7-4732-9fbd-00f7217858ec" data-file-name="components/analyzer/DocumentCompare.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="77a0208a-3723-404c-9656-cad33a1a390a" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="d2f7c7e7-2372-4338-90dc-6c66d7996183" data-file-name="components/analyzer/DocumentCompare.tsx">Document Comparison</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="57546537-6f77-4730-8a0b-2a6f850adcfe" data-file-name="components/analyzer/DocumentCompare.tsx">
          <CompareViewButton active={compareView === 'content'} onClick={() => setCompareView('content')} label="Content" />
          <CompareViewButton active={compareView === 'harmful'} onClick={() => setCompareView('harmful')} label="Harmful Points" count1={doc1Counts.harmful} count2={doc2Counts.harmful} color="text-red-600" />
          <CompareViewButton active={compareView === 'good'} onClick={() => setCompareView('good')} label="Good Points" count1={doc1Counts.good} count2={doc2Counts.good} color="text-green-600" />
          <CompareViewButton active={compareView === 'awareness'} onClick={() => setCompareView('awareness')} label="Awareness Points" count1={doc1Counts.awareness} count2={doc2Counts.awareness} color="text-amber-600" />
          <CompareViewButton active={compareView === 'summary'} onClick={() => setCompareView('summary')} label="Summary" />
          <CompareViewButton active={compareView === 'ai-insights'} onClick={() => setCompareView('ai-insights')} label="AI Insights" />
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4" data-unique-id="e19e196d-2db1-4ee0-b5d8-ae5d7e184455" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200" data-unique-id="c6078b31-2dd4-45b0-9b2c-ce32bb78e8aa" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-blue-800 mb-1 truncate" data-unique-id="8cb52076-a04b-499c-9761-7be5a34cdbab" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc1.name}</h3>
          <p className="text-xs text-blue-600" data-unique-id="9c705bd3-478c-462e-bfd2-b3092943d3de" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc1.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="540b7f02-bb0a-4ac0-9f9d-f82de748eb8d" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc1.analysisPoints.length}<span className="editable-text" data-unique-id="3cfc46a7-abab-4651-a38a-ef67a4c3fdf9" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200" data-unique-id="67df2600-ed53-4bd8-8d24-0b928eb858b9" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-purple-800 mb-1 truncate" data-unique-id="2169b4a3-6ce9-47f8-8b6f-f610dcb5057e" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc2.name}</h3>
          <p className="text-xs text-purple-600" data-unique-id="d95ba7d0-c0e2-4e1c-81fa-a37427262d54" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc2.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="a57e1dab-f3db-4bf9-9b09-4d1523e7f161" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc2.analysisPoints.length}<span className="editable-text" data-unique-id="10cbfda7-bd25-4656-846a-81e39f79f35d" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
      </div>
      
      {compareView === 'content' || compareView === 'summary' ? <div className="border border-slate-200 rounded-lg overflow-hidden" data-unique-id="100b2327-5432-44b2-997b-49a3436e6689" data-file-name="components/analyzer/DocumentCompare.tsx">
          <ReactDiffViewer oldValue={comparisonData.left} newValue={comparisonData.right} splitView={true} useDarkTheme={false} leftTitle={doc1.name} rightTitle={doc2.name} styles={{
        variables: {
          light: {
            diffViewerBackground: '#ffffff',
            diffViewerColor: '#212121',
            addedBackground: '#e6ffec',
            addedColor: '#24292e',
            removedBackground: '#ffebe9',
            removedColor: '#24292e',
            wordAddedBackground: '#abf2bc',
            wordRemovedBackground: '#fdb8c0',
            addedGutterBackground: '#cdffd8',
            removedGutterBackground: '#ffdce0',
            gutterBackground: '#f7f7f7',
            gutterBackgroundDark: '#f3f1f1',
            highlightBackground: '#fffbdd',
            highlightGutterBackground: '#fff5b1',
            codeFoldGutterBackground: '#dbedff',
            codeFoldBackground: '#f1f8ff',
            emptyLineBackground: '#fafbfc',
            gutterColor: '#212121',
            addedGutterColor: '#212121',
            removedGutterColor: '#212121',
            codeFoldContentColor: '#212121',
            diffViewerTitleBackground: '#f7f7f7',
            diffViewerTitleColor: '#212121',
            diffViewerTitleBorderColor: '#ddd'
          }
        }
      }} />
        </div> : <div className="grid grid-cols-2 gap-6" data-unique-id="76bc1edd-f571-448d-aafe-d2e276d8cddf" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="space-y-4 mb-6 md:mb-0" data-unique-id="83967418-a158-42be-9f37-21364dca5ade" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-blue-800 border-b border-blue-200 pb-2 truncate" data-unique-id="a2bb0a10-a604-49f8-8167-96cdb9afeb58" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc1.name}<span className="editable-text" data-unique-id="cd9c4f9d-98ba-42aa-a3ab-11baa3df293f" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="02b762f5-b510-49d1-9d10-bc4351fafa0c" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc1.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc1.id}-${point.id}`]} onToggle={() => toggleItem(`${doc1.id}-${point.id}`)} />)}
            {doc1.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="7bed8c69-3aa8-411e-bfc3-8564509d37b8" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="7192d56f-6fd6-48fd-91b4-f98fb07454b4" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="ff069735-fd7b-419c-962c-dc492aa505e5" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="6b48de64-06d4-4348-9f38-36071d178d9f" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
              </div>}
          </div>
          
          <div className="space-y-4" data-unique-id="1e0ed5d2-62fb-4e84-a04e-6a2cd94d93b8" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-purple-800 border-b border-purple-200 pb-2 truncate" data-unique-id="efb2dd5e-b0af-4dce-94c6-6792c8c2a364" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc2.name}<span className="editable-text" data-unique-id="3cc617d5-a186-4796-ad7f-2c5acbe7c211" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="5ddff14b-af7a-4d91-bb27-b751df2dc9c8" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc2.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc2.id}-${point.id}`]} onToggle={() => toggleItem(`${doc2.id}-${point.id}`)} />)}
            {doc2.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="959eadde-7405-4eeb-a38a-ac2464c7956a" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="df142d67-69f2-484a-8356-db180a5a9437" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="bc869af0-6239-4ff4-8cf1-9ed69f4728e0" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="fa40d15a-0329-425b-be0a-98661a17fe9e" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
              </div>}
          </div>
        </div>}
    </div>;
}
function CompareViewButton({
  active,
  onClick,
  label,
  count1,
  count2,
  color
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count1?: number;
  count2?: number;
  color?: string;
}) {
  return <motion.button whileHover={{
    scale: 1.03
  }} whileTap={{
    scale: 0.97
  }} onClick={onClick} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${active ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300'}`} data-unique-id="c4145883-094b-42c8-addf-46a4c042a959" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      {label}
      {count1 !== undefined && count2 !== undefined && <span className={`ml-1.5 ${color || 'text-slate-500'}`} data-unique-id="882cdf4d-3376-4e81-85ff-c5a999e26a0f" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="440d5f7b-8eae-433a-9dca-ac9b01a6e6af" data-file-name="components/analyzer/DocumentCompare.tsx">
          (</span>{count1}<span className="editable-text" data-unique-id="a4848248-577b-4421-8273-6f756d586d64" data-file-name="components/analyzer/DocumentCompare.tsx">/</span>{count2}<span className="editable-text" data-unique-id="c6a41c80-f39c-4a2a-b1c8-f637a9d24e4f" data-file-name="components/analyzer/DocumentCompare.tsx">)
        </span></span>}
    </motion.button>;
}
function AnalysisPointCard({
  point,
  isExpanded,
  onToggle
}: {
  point: AnalysisPoint;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const typeStyles = {
    harmful: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      shadow: 'shadow-red-100',
      gradient: 'from-red-50 to-rose-50',
      icon: <AlertCircle className="h-5 w-5 text-red-600" />
    },
    good: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      shadow: 'shadow-emerald-100',
      gradient: 'from-emerald-50 to-green-50',
      icon: <CheckCircle className="h-5 w-5 text-emerald-600" />
    },
    awareness: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      shadow: 'shadow-amber-100',
      gradient: 'from-amber-50 to-yellow-50',
      icon: <Info className="h-5 w-5 text-amber-600" />
    }
  };
  const style = typeStyles[point.type];
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow}`} data-unique-id="e442f41c-c8b1-4dc0-9c0d-7f7ccf6b4244" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="p-3 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="e784208a-4f6d-414d-b113-b890bb973ee1" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="flex items-center space-x-2" data-unique-id="3dd75642-3046-4fc2-8335-c1e618bcca9f" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="p-1 bg-white rounded-lg shadow-inner" data-unique-id="9a765df8-28e4-48d9-b88e-b8c3b3427a3a" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium text-sm`} data-unique-id="fb03a27c-2bf4-4065-a826-0568403317f8" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-1 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="1164de38-6f35-4bf6-8128-96b500ef8751" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </motion.button>
      </div>
      
      {isExpanded && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} transition={{
      duration: 0.3
    }} className="border-t border-dashed px-3 py-2 bg-white/50 text-sm" style={{
      borderColor: style.border
    }} data-unique-id="0b974e25-28f6-47dc-8fbc-15b48aebcb9e" data-file-name="components/analyzer/DocumentCompare.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="7f30ac20-1499-49b1-9b83-f22e0cf01294" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}