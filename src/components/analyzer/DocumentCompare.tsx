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
    return <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="47f3ab50-7866-42c3-9781-62468079666e" data-file-name="components/analyzer/DocumentCompare.tsx">
        <ArrowLeftRight className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-slate-700 mb-2" data-unique-id="91ae38e8-df5f-463e-97b2-eb3bb6275310" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="70aaad9e-a9f4-42d6-bf46-24a7725b2b92" data-file-name="components/analyzer/DocumentCompare.tsx">Select Two Documents to Compare</span></h3>
        <p className="text-slate-600 max-w-md mx-auto" data-unique-id="07d0abfd-8c00-427c-b3c8-ca3030771a86" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="1d6c4f3f-c31b-47d6-bfac-f423ae2817b5" data-file-name="components/analyzer/DocumentCompare.tsx">
          Please select two documents from your document list to compare their contents and analysis results.
        </span></p>
      </div>;
  }
  return <div className="p-4 md:p-6" data-unique-id="627e48f8-7558-4f8f-93c4-bb68e90fc7ba" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" data-unique-id="75332474-c399-49eb-9445-909ba2dd92da" data-file-name="components/analyzer/DocumentCompare.tsx">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800" data-unique-id="a51cf7ed-ab4c-4285-92ac-00f2c2210f7e" data-file-name="components/analyzer/DocumentCompare.tsx"><span className="editable-text" data-unique-id="b0189046-45fb-4599-b02f-e226d1adae5d" data-file-name="components/analyzer/DocumentCompare.tsx">Document Comparison</span></h2>
        
        <div className="flex flex-wrap gap-2" data-unique-id="f065ebf2-c79e-443d-afb9-1a4ea0ac9622" data-file-name="components/analyzer/DocumentCompare.tsx">
          <CompareViewButton active={compareView === 'content'} onClick={() => setCompareView('content')} label="Content" />
          <CompareViewButton active={compareView === 'harmful'} onClick={() => setCompareView('harmful')} label="Harmful Points" count1={doc1Counts.harmful} count2={doc2Counts.harmful} color="text-red-600" />
          <CompareViewButton active={compareView === 'good'} onClick={() => setCompareView('good')} label="Good Points" count1={doc1Counts.good} count2={doc2Counts.good} color="text-green-600" />
          <CompareViewButton active={compareView === 'awareness'} onClick={() => setCompareView('awareness')} label="Awareness Points" count1={doc1Counts.awareness} count2={doc2Counts.awareness} color="text-amber-600" />
          <CompareViewButton active={compareView === 'summary'} onClick={() => setCompareView('summary')} label="Summary" />
          <CompareViewButton active={compareView === 'ai-insights'} onClick={() => setCompareView('ai-insights')} label="AI Insights" />
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4" data-unique-id="32ba3af5-a933-4e58-a53e-64819be96f8c" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200" data-unique-id="fb5b0410-a08c-4378-b904-5cef22eb9ec5" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-blue-800 mb-1 truncate" data-unique-id="b88fb07b-c71c-4455-b3f3-d22641189ed9" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc1.name}</h3>
          <p className="text-xs text-blue-600" data-unique-id="ba06a045-1109-4182-8ee2-33376e172924" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc1.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="edce4322-5d94-47fd-b26c-983fdd5b0f42" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc1.analysisPoints.length}<span className="editable-text" data-unique-id="54f6501b-53e1-4fe7-abf7-f2c5d1a20dd1" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200" data-unique-id="fa66e0f1-e0e6-49ea-9129-7c74a4bf5528" data-file-name="components/analyzer/DocumentCompare.tsx">
          <h3 className="font-medium text-purple-800 mb-1 truncate" data-unique-id="cbbe6812-b19f-461f-9f56-336bb9ee3c7b" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">{doc2.name}</h3>
          <p className="text-xs text-purple-600" data-unique-id="7dbf732c-ae2f-47fc-9841-7a13df964e93" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {new Date(doc2.createdAt).toLocaleDateString()}<span className="editable-text" data-unique-id="abf722a2-a3b6-45b7-b360-87329643e2e5" data-file-name="components/analyzer/DocumentCompare.tsx"> • 
            </span>{doc2.analysisPoints.length}<span className="editable-text" data-unique-id="db48e10c-7a19-4996-838e-9bb6e0dfad1b" data-file-name="components/analyzer/DocumentCompare.tsx"> points
          </span></p>
        </div>
      </div>
      
      {compareView === 'content' || compareView === 'summary' ? <div className="border border-slate-200 rounded-lg overflow-hidden" data-unique-id="bde01fee-7974-4e72-98eb-164621658fd5" data-file-name="components/analyzer/DocumentCompare.tsx">
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
        </div> : <div className="grid grid-cols-2 gap-6" data-unique-id="8245177c-4433-4a8d-ac14-6f218ef67eeb" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="space-y-4 mb-6 md:mb-0" data-unique-id="60d6d091-d0fb-41ec-9938-bd0598c8f374" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-blue-800 border-b border-blue-200 pb-2 truncate" data-unique-id="9b19df6f-3351-43ad-9682-515d6b3a9bd7" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc1.name}<span className="editable-text" data-unique-id="1d1848c0-4b2b-49fc-a45b-acb43ed7230c" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="eddb57ac-4292-4f6c-a2b8-b9d74bf654e1" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc1.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc1.id}-${point.id}`]} onToggle={() => toggleItem(`${doc1.id}-${point.id}`)} />)}
            {doc1.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="b3ff0a43-815a-4b9f-9b9a-a3a8a1be5cb2" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="73496cb5-1acd-4879-b22f-30cafbeaf256" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="5edd4492-cd0f-40d3-b077-016300c0eb11" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="7d1ffda4-02df-4690-a61b-191635810e00" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
              </div>}
          </div>
          
          <div className="space-y-4" data-unique-id="15ba3cd0-0587-4271-8b81-aedaa4b028c8" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            <h3 className="font-medium text-purple-800 border-b border-purple-200 pb-2 truncate" data-unique-id="41bc2469-7e78-48fe-b827-1586886dbf31" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
              {doc2.name}<span className="editable-text" data-unique-id="e94193a7-5f23-4c88-91f9-d7b1ccb8f947" data-file-name="components/analyzer/DocumentCompare.tsx"> - </span>{compareView.charAt(0).toUpperCase() + compareView.slice(1)}<span className="editable-text" data-unique-id="014c2038-576d-489c-855a-6286aca0f190" data-file-name="components/analyzer/DocumentCompare.tsx"> Points
            </span></h3>
            {doc2.analysisPoints.filter(point => point.type === compareView).map(point => <AnalysisPointCard key={point.id} point={point} isExpanded={!!expandedItems[`${doc2.id}-${point.id}`]} onToggle={() => toggleItem(`${doc2.id}-${point.id}`)} />)}
            {doc2.analysisPoints.filter(point => point.type === compareView).length === 0 && <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-200" data-unique-id="c2d307d5-f790-4125-a5d3-e404fcc38ebc" data-file-name="components/analyzer/DocumentCompare.tsx">
                <p className="text-slate-600" data-unique-id="42506a13-5168-4bbe-acab-7f27acac31df" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="d0554410-8465-43d5-8b2b-0fbebde200ab" data-file-name="components/analyzer/DocumentCompare.tsx">No </span>{compareView}<span className="editable-text" data-unique-id="e436a7de-254d-45b9-aac2-cfc45643e857" data-file-name="components/analyzer/DocumentCompare.tsx"> points found.</span></p>
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
  }} onClick={onClick} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${active ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300'}`} data-unique-id="e642ca03-9aa4-4280-8dd0-7ba1dd0e1a7c" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      {label}
      {count1 !== undefined && count2 !== undefined && <span className={`ml-1.5 ${color || 'text-slate-500'}`} data-unique-id="1f92eb73-d734-4333-8168-9901c0db2639" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="c748b4f3-a892-4260-8bca-915ae7063bc6" data-file-name="components/analyzer/DocumentCompare.tsx">
          (</span>{count1}<span className="editable-text" data-unique-id="85990478-efd2-4cb1-acc9-23677e7c9947" data-file-name="components/analyzer/DocumentCompare.tsx">/</span>{count2}<span className="editable-text" data-unique-id="9a40b701-15a6-459d-95a4-60a6e1fc57a8" data-file-name="components/analyzer/DocumentCompare.tsx">)
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
  }} className={`bg-gradient-to-br ${style.gradient} border ${style.border} rounded-lg overflow-hidden shadow-sm ${style.shadow}`} data-unique-id="274c7be8-6013-4697-a5e3-ea7bb3b83b40" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
      <div className="p-3 flex justify-between items-center cursor-pointer" onClick={onToggle} data-unique-id="1dadf44c-e848-4a09-b7c6-bdf121a77946" data-file-name="components/analyzer/DocumentCompare.tsx">
        <div className="flex items-center space-x-2" data-unique-id="db1de3a5-f24d-4f73-8d51-8e75b2ec370a" data-file-name="components/analyzer/DocumentCompare.tsx">
          <div className="p-1 bg-white rounded-lg shadow-inner" data-unique-id="ee43c28c-1e10-413c-be07-d9f1d83aa62f" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {style.icon}
          </div>
          <div className={`${style.text} font-medium text-sm`} data-unique-id="009c0250-4bca-40be-b7d2-935cd2cb629c" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.text}
          </div>
        </div>
        <motion.button className={`${style.text} p-1 hover:bg-white/50 rounded-full`} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }} data-unique-id="a8e8c09b-fd45-47ad-90f0-9c0d59771a60" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
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
    }} data-unique-id="cc594744-bba6-42dd-aef2-33611f357a00" data-file-name="components/analyzer/DocumentCompare.tsx">
          <p className={`${style.text} leading-relaxed`} data-unique-id="0589f2a3-785e-4402-9c88-e5c2561b885b" data-file-name="components/analyzer/DocumentCompare.tsx" data-dynamic-text="true">
            {point.explanation}
          </p>
        </motion.div>}
    </motion.div>;
}