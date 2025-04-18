import { AiBar } from "../ai/ai_bar";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AiBar /> 
      <div className="px-6 py-6 flex-1">
        {children} 
      </div>
    </div>
  );
};
