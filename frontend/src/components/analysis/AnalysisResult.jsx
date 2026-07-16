import { useState } from "react";
import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";
import { generateAnalysisPDF } from "../../utils/pdfGenerator";


const tabs = [
  {
    id: "problem",
    label: "📋 Problem",
  },
  {
    id: "reason",
    label: "🧠 Reason",
  },
  {
    id: "code",
    label: "💻 Fixed Code",
  },
  {
    id: "practice",
    label: "✨ Best Practices",
  },
  {
    id: "performance",
    label: "⚡ Performance",
  },
  {
    id: "security",
    label: "🔐 Security",
  },
];


const Section = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity:0, y:10 }}
      animate={{ opacity:1, y:0 }}
      className="
      rounded-2xl
      border
      border-base-border
      bg-base
      p-6
      shadow-sm
      "
    >
      {children}
    </motion.div>
  );
};



const ListView = ({items}) => {

  if(!items?.length)
  {
    return (
      <p className="text-ink-muted">
        No suggestions available.
      </p>
    )
  }


  return (
    <ul className="
    space-y-3
    text-ink-muted
    ">
      {
        items.map((item,index)=>(
          <li
          key={index}
          className="
          flex
          gap-3
          "
          >
            <span>•</span>
            <span>{item}</span>
          </li>
        ))
      }
    </ul>
  )
}



const CodeActions = ({ code, analysis }) => {


const copyCode = async()=>{

 await navigator.clipboard.writeText(code);

 alert("Code copied!");

}


const downloadCode = ()=>{

const blob = new Blob(
 [code],
 {
  type:"text/javascript"
 }
);


const url = URL.createObjectURL(blob);


const link=document.createElement("a");

link.href=url;

link.download="fixed-code.js";

link.click();


URL.revokeObjectURL(url);

}



return (

<div className="flex flex-wrap gap-3 mb-4">

<button
onClick={copyCode}
className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
>
📋 Copy Code
</button>

<button
onClick={downloadCode}
className="px-4 py-2 rounded-lg border border-base-border hover:bg-secondary transition"
>
💾 Download Code
</button>

<button
onClick={() => generateAnalysisPDF(analysis)}
className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
>
📄 Download PDF
</button>

</div>

)

}





const AnalysisResult = ({analysis})=>{


const [active,setActive]=useState("problem");


if(!analysis) return null;


const ai=analysis.aiResponse;



const renderContent=()=>{


switch(active){


case "problem":

return (
<p className="text-ink-muted">
{ai.problem}
</p>
);



case "reason":

return (
<p className="
text-ink-muted
whitespace-pre-wrap
">
{ai.reason}
</p>
);



case "code":

return (

<div>

<CodeActions
code={ai.fixedCode}
analysis={analysis}
/>

<CodeBlock
code={ai.fixedCode}
/>

</div>

);



case "practice":

return (
<ListView items={ai.bestPractices}/>
);



case "performance":

return (
<ListView items={ai.performanceImprovements}/>
);



case "security":

return (
<ListView items={ai.securityIssues}/>
);



default:
return null;


}



}





return (

<div className="
space-y-6
">


<div>

<h2 className="
text-3xl
font-bold
text-ink
">
🤖 AI Code Analysis
</h2>


<p className="
text-ink-muted
mt-2
">
DebugMind AI detected issues and generated improvements.
</p>


</div>





{/* Tabs */}

<div className="
flex
gap-2
overflow-x-auto
border-b
border-base-border
pb-3
">


{
tabs.map(tab=>(

<button

key={tab.id}

onClick={()=>setActive(tab.id)}

className={`
px-4
py-2
rounded-xl
text-sm
transition

${
active===tab.id

?
"bg-primary text-white"

:
"text-ink-muted hover:bg-secondary"

}

`}

>

{tab.label}

</button>


))
}


</div>





{/* Content */}

<Section>

{renderContent()}

</Section>





</div>


)

}



export default AnalysisResult;