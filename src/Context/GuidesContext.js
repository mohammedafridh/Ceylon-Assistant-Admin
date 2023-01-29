import { createContext, useContext, useState, useEffect} from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";


const GuidesContext = createContext();

export function GuideProvider({children}) {
    const [guides, setGuides] = useState([]);
    const [tourists,setTourists] = useState([])

    useEffect(() => {
        const guidesCollection = onSnapshot(
          collection(db, "Guides"),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            console.log({list})
            setGuides(list);
          }
        );
        return () => {
          guidesCollection();
        };
      }, []);

      useEffect(() => {
        const touristCollection = onSnapshot(
          collection(db, "Tourist"),
          (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              list.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setTourists(list);
          }
        );
        return () => {
            touristCollection();
        };
      }, []);

      const context = {
        guides,
        tourists,
    }


    return (
        <GuidesContext.Provider value={context}>
            {children}
        </GuidesContext.Provider>
    )

}

export function useGuides() {
    return useContext(GuidesContext);
}