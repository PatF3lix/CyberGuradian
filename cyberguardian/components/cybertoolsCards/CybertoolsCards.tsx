import { useEffect, useState } from "react";
import styles from "./cybertools.module.css";
import { Cybertools, useCybertoolsContext } from "@/store/useCybertools";
import CybertoolCard from "../cybertoolCard/CybertoolCard";

type CybertoolsProps = {
  cybertools: Cybertools[];
};

export default function CybertoolsCards({ cybertools }: CybertoolsProps) {
  const [displayedTools, setDisplayedTools] = useState(20);

  const loadMoreTools = () => {
    setDisplayedTools((prevTools) => prevTools + 20);
  };

  const {
    cybertools: tools,
    setCybertoolsData,
    loadedData,
  } = useCybertoolsContext();

  useEffect(() => {
    if (!loadedData || tools.length !== cybertools.length) {
      setCybertoolsData(cybertools);
    }
  }, [cybertools, loadedData]);

  return (
    <>
      <div className={styles.toolsContainer}>
        {loadedData ? (
          <>
            {tools.slice(0, displayedTools).map((tool) => (
              <CybertoolCard key={tool.Name} name={tool.Name} />
            ))}
          </>
        ) : (
          <p>Is Loading...</p>
        )}
      </div>
      <button className={styles.toolsPageBtn} onClick={loadMoreTools}>
        Load More
      </button>
    </>
  );
}
