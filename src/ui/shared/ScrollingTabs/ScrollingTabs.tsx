import { useState, useRef, useEffect } from "react";

const tabs = [
  { name: "Obyektin mekan məlumatları", id: "tab1", },
  { name: "Obyekt sahibi məlumatları", id: "tab2" },
  { name: "Digər məlumatlar", id: "tab3" },
  { name: "Qoşmalar", id: "tab4" },
  { name: "Tərtib edilmə tarixi", id: "tab5" },
  { name: "Tasdasdsi", id: "tab6" },
  { name: "dasdsadas", id: "tab7" },
  { name: "Tədsad", id: "tab8" },
  { name: "sedilmə tarixi", id: "tab9" },
];

const ScrollingTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToSection = (id: string) => {
    const section = sectionsRef.current?.[id];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    scrollToSection(activeTab); // Automatically scroll when active tab changes
  }, [activeTab]);

  return (
    <div className="relative">
      <div className="flex space-x-4 bg-white p-4 sticky top-0 z-10 shadow-ms overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-2 rounded cursor-pointer ${
              activeTab === tab.id ? "bg-[#D2AB67] text-white" : "text-gray-600"
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div className="p-4 overflow-y-auto h-[100vh]">
        {tabs.map((tab) => (
          <section
            key={tab.id}
            id={tab.id}
            ref={(el) => (sectionsRef.current[tab.id] = el)}
            className="border-b-2 border-gray-200 pt-24"
          >
            <h2 className="text-2xl font-bold">{tab.name}</h2>
            <div><h5>Obyektin ünvanı</h5></div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ScrollingTabs;
