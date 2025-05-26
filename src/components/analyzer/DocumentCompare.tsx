'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnalyzerStore, AnalysisPoint } from '@/store/useAnalyzerStore';
import { AlertCircle, CheckCircle, Info, ArrowLeftRight, ChevronDown, ChevronUp } from 'lucide-react';
import ReactDiffViewer from 'react-diff-viewer-continued';
type CompareView = 'content' | 'harmful' | 'good' | 'awareness' | 'summary';
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
    return <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="355ee2b0-31fe-49d2-8561-4a15c401a421" data-file-name="components/analyzer/DocumentCompare.tsx">
        <ArrowLeftRight className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-slate-700 mb-2" data-unique-id="5ba97e04-4fd0-4e40-bf5d-1a3712ff4262" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="125868bb-dfa5-4aa8-8c9e-5bdac2cb04e1" data-file-name="components/analyzer/DocumentCompare.tsx">Select Two Documents to Compare</span></h3>
        <p className="text-slate-600 max-w-md mx-auto" data-unique-id="1f552db6-39c0-4e38-a06d-af8f2045d733" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="ae185c45-d684-4676-96b5-8749732abdea" data-file-name="components/analyzer/DocumentCompare.tsx">
          Please select two documents from your document list to compare their contents and analysis results.
        </span></p>
      </div>;
  }
  return <div className="p-4 md:p-6" data-unique-id="ae3e8aa4-9f69-4855-9a37-fc347caf54c8" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" data-unique-id="46c9c311-19ce-4175-a52e-18e90d9e0740" data-file-name="components/analyzer/DocumentCompare.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="bfc4a15d-2039-411a-bf56-46097787e541" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="d9fc8bc9-f99e-4908-abb8-868e4632bb34" data-file-name="components/analyzer/DocumentCompare.tsx">Document Comparison</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="8ee719f9-2914-4266-90c6-bbb6bf23fcfd" data-file-name="components/analyzer/DocumentCompare.tsx">
          <CompareViewButton active={compareView === 'content'} onClick={() => setCompareView('content')} label="Content" />
          <CompareViewButton active={compareView === 'harmful'} onClick={() => setCompareView('harmful')} label="Harmful Points" count1={doc1Counts.harmful} count2={doc2Counts.harmful} color="text-red-600" />
          <CompareViewButton active={compareView === 'good'} onClick={() => setCompareView('good')} label="Good Points" count1={doc1Counts.good} count2={doc2Counts.good} color="text-green-600" />
          <CompareViewButton active={compareView === 'awareness'} onClick={() => setCompareView('awareness')} label="Awareness Points" count1={doc1Counts.awareness} count2={doc2Counts.awareness} color="text-amber-600" />
          <CompareViewButton active={compareView === 'summary'} onClick={() => setCompareView('summary')} label="Summary" />
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4" data-unique-id="cbfb4988-8572-4583-a6b7-9c4151da2231" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200" data-unique-id="2fb2c188-5c66-4a72-8efe-8be56ab44e9d" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-blue-800 mb-1 truncate" data-unique-id="c2abe02c-f86b-4f45-b549-89ed673c85e4" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc1.name}</h3>
          <p className="text-xs text-blue-600" data-unique-id="4153a445-104e-4368-8b97-785e84581d1b" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc1.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="8c04e109-bddd-4bef-bb83-1cffe4aa16b3" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc1.analysisPoints.length}<span className="editable-text" data-unique-id="b32a2cfc-bd8a-4072-ac81-2a78597c36c2" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200" data-unique-id="19db4c75-13a9-4a11-83d8-aee972cd716f" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-purple-800 mb-1 truncate" data-unique-id="11b236dd-b9cb-4b7b-9c80-ced485fef656" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc2.name}</h3>
          <p className="text-xs text-purple-600" data-unique-id="a8a87e9e-9ec5-4a07-8fba-60e891546956" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc2.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="68f360d6-77ce-43b7-84fc-792799d67e24" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc2.analysisPoints.length}<span className="editable-text" data-unique-id="1153fef5-9fe7-4ebd-910b-6eecaf9508aa" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
      </div>
      
      {compareView === 'content' || compareView === 'summary' ? <div className="border border-slate-200 rounded-lg overflow-hidden" data-unique-id="c382b735-4955-47b8-80e2-255f39bc962a" data-file-name="components/analyzer/DocumentCompare.tsx">
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
        </div> : <div className="grid grid-cols-2 gap-6" data-unique-id="6ffec28b-ba56-4ace-9c52-fe85e251e9f4" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="space-y-4 mb-6 md:mb-0" data-unique-id="f31afc52-3ec3-4114-aa97-843cfdd9deb9" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-blue-800 border-b border-blue-200 pb-2 truncate" data-unique-id="d6dcbbce-5ece-4447-ba9a-6dcae8b7d3f7" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc1.name}<span className="editable-text" data-unique-id="e2caa327-9788-4882-9239-14ee9d070fb1" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="b23adf38-5023-4948-91b1-79c0ea051bea" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc1.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc1.id}-${point.id}`]} onToggle={() => toggleItem(`${doc1.id}-${point.id}`)} />)}
            {doc1.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="a8f8c3f0-15f2-4c5a-8779-bffdd1aff272" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="9c75eb5e-08a6-4188-8411-41f3ad7fceb7" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="371a9098-2461-49c1-b1cf-78bf9ed3d4a6" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="1cb8ca32-9fb4-4d9a-bfe9-e16ef8d30480" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
              </div>}
          </div>
          
          <div className="space-y-4" data-unique-id="ce2ce1c9-27da-44d5-9b7c-99f30c5ae970" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-purple-800 border-b border-purple-200 pb-2 truncate" data-unique-id="64fce6ac-5fc0-4321-b4b1-25b8d5125101" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc2.name}<span className="editable-text" data-unique-id="0c6a836c-700d-44f0-9e0c-f75864793079" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="55482c80-10fe-44e0-abbc-4d16a3f1eec0" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc2.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc2.id}-${point.id}`]} onToggle={() => toggleItem(`${doc2.id}-${point.id}`)} />)}
            {doc2.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="89b53d33-950a-4a60-a18c-07c69010fcab" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="010f1eb3-31db-44c7-a1f3-fa6a04c1d518" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="699353e5-4f4c-4f91-89c6-b0ba56a37633" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="617af9e0-3a51-438c-8cf1-e8cb586f0f19" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
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
  }} onClick={onClick} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${active ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300'}`} data-unique-id="b5c97ffd-282d-45ed-95fd-64d9d2f9bebc" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      {label}
      {count1 !== undefined && count2 !== undefined && <span className={`ml-1.5 ${color || 'text-slate-500'}`} data-unique-id="ea385d65-dc79-44e0-8118-50524dd31cec" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="ea66cedf-f83e-4207-a443-e184cab1d94a" data-file-name="components/analyzer/DocumentCompare.tsx">
          (</span>{count1}<span className="editable-text" data-unique-id="615cf7e3-273a-41d5-a866-96c1109dabbd" data-file-name="components/analyzer/DocumentCompare.tsx">/</span>{count2}<span className="editable-text" data-unique-id="43c92b19-566c-4ffb-b7da-fe9decd94a55" data-file-name="components/analyzer/DocumentCompare.tsx">)
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow}`} data-unique-id="cf6c8fec-4825-4414-953f-d8238a33b4c9" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="p-3 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="fb2bef5a-3a62-449d-982d-ec33455fc907" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="flex items-center space-x-2" data-unique-id="58b584a7-e02b-48bc-add4-11f0e4a15baa" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="p-1 bg-white rounded-lg shadow-inner" data-unique-id="e1d0fbcb-0c73-4fed-a00f-5c909e9d5d38" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium text-sm`} data-unique-id="d4c5d912-b47a-4a85-b1ab-9dde6d4701d5" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-1 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="226ca13d-bc30-4002-9132-ec81e94bc4e9" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
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
    }} data-unique-id="1dcb30dd-c50c-4caa-990e-04502c475190" data-file-name="components/analyzer/DocumentCompare.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="e0d75650-0a7f-413f-8997-15996f58b3ed" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}