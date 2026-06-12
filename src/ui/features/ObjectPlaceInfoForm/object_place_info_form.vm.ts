import { useState } from "react";

const ObjectPlaceInfoFormVM = () => {
    const [cultural, setCultural] = useState<number>();
    const [objectArea, setObjectArea] = useState<number | null>();
  
    return {
        setObjectArea,
        objectArea,
        setCultural,
        cultural,
    };

}

export default ObjectPlaceInfoFormVM
