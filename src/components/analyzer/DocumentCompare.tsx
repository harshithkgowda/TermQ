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
    return <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="8728bd08-2282-4a83-8437-2d4f3c5c4bdb" data-file-name="components/analyzer/DocumentCompare.tsx">
        <ArrowLeftRight className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-slate-700 mb-2" data-unique-id="569d7896-a2d9-4aa2-9f63-433d4d989f8d" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="61b905ed-276b-4c39-b9b7-a4a3aa3543ee" data-file-name="components/analyzer/DocumentCompare.tsx">Select Two Documents to Compare</span></h3>
        <p className="text-slate-600 max-w-md mx-auto" data-unique-id="d41229ed-7b54-44c2-8047-ebecf4fb251a" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="0ba6860f-65a7-430e-8f8e-ce9251c392cc" data-file-name="components/analyzer/DocumentCompare.tsx">
          Please select two documents from your document list to compare their contents and analysis results.
        </span></p>
      </div>;
  }
  return <div className="p-4 md:p-6" data-unique-id="cb7510db-e58e-4c2d-8a59-24d1a18045e4" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" data-unique-id="18e6a1b7-5ae9-40b2-96c3-63f8bb43f3ed" data-file-name="components/analyzer/DocumentCompare.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="2c1ee611-fb52-4813-b76c-92cfae8a1411" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="32265015-5fe0-4e51-91e4-2dea8c261d79" data-file-name="components/analyzer/DocumentCompare.tsx">Document Comparison</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="6360aa54-917f-4a93-98c6-86f2b647fe32" data-file-name="components/analyzer/DocumentCompare.tsx">
          <CompareViewButton active={compareView === 'content'} onClick={() => setCompareView('content')} label="Content" />
          <CompareViewButton active={compareView === 'harmful'} onClick={() => setCompareView('harmful')} label="Harmful Points" count1={doc1Counts.harmful} count2={doc2Counts.harmful} color="text-red-600" />
          <CompareViewButton active={compareView === 'good'} onClick={() => setCompareView('good')} label="Good Points" count1={doc1Counts.good} count2={doc2Counts.good} color="text-green-600" />
          <CompareViewButton active={compareView === 'awareness'} onClick={() => setCompareView('awareness')} label="Awareness Points" count1={doc1Counts.awareness} count2={doc2Counts.awareness} color="text-amber-600" />
          <CompareViewButton active={compareView === 'summary'} onClick={() => setCompareView('summary')} label="Summary" />
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4" data-unique-id="1bcc24a6-439e-435d-b9f2-afe4406069b1" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200" data-unique-id="1b2c6772-9ae8-4405-8e04-ecf61400f04b" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-blue-800 mb-1 truncate" data-unique-id="0c84f720-039e-4186-9b97-a94fcfc4234b" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc1.name}</h3>
          <p className="text-xs text-blue-600" data-unique-id="66a1316f-a4b7-4e30-864a-3192e749f6af" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc1.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="742291ef-bdfd-4d0f-ac61-a08225b70cf6" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc1.analysisPoints.length}<span className="editable-text" data-unique-id="15ad08b5-8c9f-4d63-b8e5-fe78ab1c4147" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200" data-unique-id="fd22fccc-9696-4614-af2b-6ce4223b0eaa" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-purple-800 mb-1 truncate" data-unique-id="a2e15315-7125-42ea-96e0-8b7741d471b8" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc2.name}</h3>
          <p className="text-xs text-purple-600" data-unique-id="22606414-33d9-4897-92d6-8798f9619b4e" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc2.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="ee94532f-ee2f-4706-8f87-3b3987d11e11" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc2.analysisPoints.length}<span className="editable-text" data-unique-id="d4431a92-09c4-4a39-99f1-79c2479d12e4" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
      </div>
      
      {compareView === 'content' || compareView === 'summary' ? <div className="border border-slate-200 rounded-lg overflow-hidden" data-unique-id="29284246-fd76-4789-a170-d375e8c65cd9" data-file-name="components/analyzer/DocumentCompare.tsx">
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
        </div> : <div className="grid grid-cols-2 gap-6" data-unique-id="578b3e34-7e26-4ba7-ad75-447c6ee17e3f" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="space-y-4 mb-6 md:mb-0" data-unique-id="d2866fb0-e5eb-4177-9e28-12abe070b2c6" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-blue-800 border-b border-blue-200 pb-2 truncate" data-unique-id="c42f3ff5-af79-4bd2-870d-a407b7c8a0a3" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc1.name}<span className="editable-text" data-unique-id="c9b38943-2a9f-4e35-af99-7aa5031390d4" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="7fe7b95d-3bb5-4444-ac51-e57bb960016a" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc1.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc1.id}-${point.id}`]} onToggle={() => toggleItem(`${doc1.id}-${point.id}`)} />)}
            {doc1.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="2c7f9763-4534-4002-8e5c-5f1f11c95e3e" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="296e21d8-26e4-40b6-8afa-0d02868f94bc" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="39882897-6f5d-4438-b94b-671bd8de916e" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="0c687bc1-667f-40a2-8320-eecdcfa54190" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
              </div>}
          </div>
          
          <div className="space-y-4" data-unique-id="0ced529e-126c-436c-89fa-d429788bda70" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-purple-800 border-b border-purple-200 pb-2 truncate" data-unique-id="88033819-5a66-40fd-942a-1742b145ace3" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc2.name}<span className="editable-text" data-unique-id="bd99de31-b4a5-475d-972e-36e366667a7d" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="94e7c29a-36e4-472c-9157-c860640d55b9" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc2.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc2.id}-${point.id}`]} onToggle={() => toggleItem(`${doc2.id}-${point.id}`)} />)}
            {doc2.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="33ae8e08-07ce-405c-8651-fad90f9c55b6" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="c5f24b41-b663-47d1-bc97-460fd506ae52" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="ed57ad54-6486-4f10-84b2-e4f3b6bd789e" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="91b239ef-5c5a-4385-8d0d-0e1816002857" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
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
  }} onClick={onClick} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${active ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300'}`} data-unique-id="fd9fc393-b6a9-4dcd-8b8d-39a7b2808335" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      {label}
      {count1 !== undefined && count2 !== undefined && <span className={`ml-1.5 ${color || 'text-slate-500'}`} data-unique-id="d4f45266-0a39-456d-b1f7-1acba67b92a9" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="d3366b9e-ab72-46bc-87de-ac9234d2083d" data-file-name="components/analyzer/DocumentCompare.tsx">
          (</span>{count1}<span className="editable-text" data-unique-id="398a3639-5584-47fe-a376-63c65c3f7e68" data-file-name="components/analyzer/DocumentCompare.tsx">/</span>{count2}<span className="editable-text" data-unique-id="91d826b2-209b-42a8-89f5-0028be5c2cbd" data-file-name="components/analyzer/DocumentCompare.tsx">)
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow}`} data-unique-id="76dcfe70-3e62-4869-93e4-97858b8924d6" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="p-3 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="a97f792b-d376-4bc7-90a3-38500317e721" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="flex items-center space-x-2" data-unique-id="d94dc192-58f7-44a3-8bc8-7e74a37f935b" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="p-1 bg-white rounded-lg shadow-inner" data-unique-id="01cab59b-279a-4798-843d-4770f75b891d" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium text-sm`} data-unique-id="777e3b77-0c03-445a-8ac1-3ad506a89028" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-1 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="0ae347d0-c15e-4904-b6bc-56c76aa104f2" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
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
    }} data-unique-id="1d8e2224-ada2-4231-acec-11e64d807830" data-file-name="components/analyzer/DocumentCompare.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="7e1a518b-9e6f-49b7-aced-5770528b5a0b" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}