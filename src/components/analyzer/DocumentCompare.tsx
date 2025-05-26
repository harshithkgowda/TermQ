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
    return <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="a1bb04cf-3050-4fcd-9404-43185a2b2de8" data-file-name="components/analyzer/DocumentCompare.tsx">
        <ArrowLeftRight className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-slate-700 mb-2" data-unique-id="24c81986-0de2-4ef6-aec6-1c25eaf2eac0" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="c114a61e-6448-439b-b88b-7ea4dcbd2f73" data-file-name="components/analyzer/DocumentCompare.tsx">Select Two Documents to Compare</span></h3>
        <p className="text-slate-600 max-w-md mx-auto" data-unique-id="6890209f-bc68-4922-afc6-55943670842b" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="d0a88838-64b8-4ad5-9c63-2ee129eba746" data-file-name="components/analyzer/DocumentCompare.tsx">
          Please select two documents from your document list to compare their contents and analysis results.
        </span></p>
      </div>;
  }
  return <div data-unique-id="c37444b9-e3e8-4382-b0d4-552172f0f9bc" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="flex justify-between items-center mb-6" data-unique-id="7eac0e6c-5f67-400f-a86e-ed7260a0f6ce" data-file-name="components/analyzer/DocumentCompare.tsx">
        <h2 className="text-2xl font-semibold text-slate-800" data-unique-id="fe4c62c5-de5f-4b79-90cc-775f7b67c60b" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="d6bb54a5-3a20-4334-b98c-9356643d3763" data-file-name="components/analyzer/DocumentCompare.tsx">Document Comparison</span></h2>
        
        <div className="flex space-x-2" data-unique-id="84de685c-1563-41f2-938d-7d54290d862d" data-file-name="components/analyzer/DocumentCompare.tsx">
          <CompareViewButton active={compareView === 'content'} onClick={() => setCompareView('content')} label="Content" />
          <CompareViewButton active={compareView === 'harmful'} onClick={() => setCompareView('harmful')} label="Harmful Points" count1={doc1Counts.harmful} count2={doc2Counts.harmful} color="text-red-600" />
          <CompareViewButton active={compareView === 'good'} onClick={() => setCompareView('good')} label="Good Points" count1={doc1Counts.good} count2={doc2Counts.good} color="text-green-600" />
          <CompareViewButton active={compareView === 'awareness'} onClick={() => setCompareView('awareness')} label="Awareness Points" count1={doc1Counts.awareness} count2={doc2Counts.awareness} color="text-amber-600" />
          <CompareViewButton active={compareView === 'summary'} onClick={() => setCompareView('summary')} label="Summary" />
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-2 gap-4" data-unique-id="9e3e8a61-7762-4d57-a566-6eb91fb6d7a9" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200" data-unique-id="0c34c708-1a48-41db-bead-6a2d4657cc66" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-purple-800 mb-1" data-unique-id="e9e4c3c3-6b56-445f-806a-8ddd7ae72d42" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc1.name}</h3>
          <p className="text-xs text-purple-600" data-unique-id="9289dcf5-5dc7-4d20-8e63-17433437696d" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc1.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="20640e49-fbaf-46d7-83ba-c10f64441de9" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc1.analysisPoints.length}<span className="editable-text" data-unique-id="500a049f-8229-459f-98d2-79fe64ca575c" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
        
        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200" data-unique-id="47bc018b-4e93-4321-a7ed-88cd9baf8008" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-teal-800 mb-1" data-unique-id="e8e92d9b-b19a-492b-9fe2-5db748e8ada4" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc2.name}</h3>
          <p className="text-xs text-teal-600" data-unique-id="38bf9a75-fa61-49f5-aee2-ae86b11a77ef" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc2.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="4c595187-a487-433d-adea-f3fff4210660" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc2.analysisPoints.length}<span className="editable-text" data-unique-id="b7459b09-bc44-4128-b976-196d03056fae" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
      </div>
      
      {compareView === 'content' || compareView === 'summary' ? <div className="border border-slate-200 rounded-lg overflow-hidden" data-unique-id="b2ca07f3-3b16-469c-9d15-7348002a5ea6" data-file-name="components/analyzer/DocumentCompare.tsx">
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
        </div> : <div className="grid grid-cols-2 gap-6" data-unique-id="aa67fdd6-0404-4436-8633-149a0f31c09e" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="space-y-4" data-unique-id="2346eda9-d82a-4b9b-892d-8cea8be5250c" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-purple-800 border-b border-purple-200 pb-2" data-unique-id="7059e8d5-8ac0-4697-811c-10f10ef28b47" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc1.name}<span className="editable-text" data-unique-id="891fd27f-57e7-4f48-bc0e-5f7f296e8c62" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="943e1e81-c136-496c-ae3b-439c76077c10" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc1.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc1.id}-${point.id}`]} onToggle={() => toggleItem(`${doc1.id}-${point.id}`)} />)}
            {doc1.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="416921e4-6a42-4fbd-bcca-783f99f28dc6" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="6ab748c4-1214-40b6-903b-060cdce5b834" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="9401d0b2-1ed2-45d2-a329-17431024409f" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="7fe988c2-ae8a-478b-a1d0-83989dd98f5b" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
              </div>}
          </div>
          
          <div className="space-y-4" data-unique-id="82ead041-0257-41c2-87bf-66eed6777fd4" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-teal-800 border-b border-teal-200 pb-2" data-unique-id="6f80fb83-48a2-4599-9695-3aeea1b96fe1" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc2.name}<span className="editable-text" data-unique-id="488450ef-66e4-410a-bd12-b0e4ef89908e" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="56f83f01-c7c8-42ba-b537-1b71a1f1dac9" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc2.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc2.id}-${point.id}`]} onToggle={() => toggleItem(`${doc2.id}-${point.id}`)} />)}
            {doc2.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="e723c753-9d52-4940-af0e-762f7a103057" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="01e22f6d-a7b7-4e11-8eee-b7c0d1cbc449" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="af773d58-b392-40df-9a64-70bc6f8b02e0" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="89d784c6-353e-41b5-8943-2aad68f2ebe9" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
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
  }} onClick={onClick} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${active ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300'}`} data-unique-id="1b155afb-5d42-4bfb-8c8b-08d293e62dfd" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      {label}
      {count1 !== undefined && count2 !== undefined && <span className={`ml-1.5 ${color || 'text-slate-500'}`} data-unique-id="6334b85a-861a-4734-806b-b2ba402daa29" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="9ec5c810-cb1a-4678-877e-1a50528ea5d8" data-file-name="components/analyzer/DocumentCompare.tsx">
          (</span>{count1}<span className="editable-text" data-unique-id="6222ed36-0162-421d-a68b-83a23520100c" data-file-name="components/analyzer/DocumentCompare.tsx">/</span>{count2}<span className="editable-text" data-unique-id="168005be-77aa-4072-9e71-26425c588a32" data-file-name="components/analyzer/DocumentCompare.tsx">)
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow}`} data-unique-id="b5511ecc-c653-4abc-b2e2-702684eda776" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="p-3 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="5a374e99-de12-4bf4-aee0-f52126710213" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="flex items-center space-x-2" data-unique-id="1db349de-4e20-4078-b542-bffa6eb5d080" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="p-1 bg-white rounded-lg shadow-inner" data-unique-id="9150e480-bd71-48cd-9c5c-fae5a55ce229" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium text-sm`} data-unique-id="eabe3c2a-7c8d-4876-a6f2-e713f033b0e8" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-1 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="ff5ec686-ab7f-4027-b0c9-5c7509b053e3" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
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
    }} data-unique-id="22331844-689d-4fb7-b8c3-b0d0c50b2273" data-file-name="components/analyzer/DocumentCompare.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="05654654-6f9b-4855-9c85-4b2be37d8437" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}