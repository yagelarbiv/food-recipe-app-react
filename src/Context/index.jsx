import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [SearchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${SearchParams}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParams('');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParams('');
    }
  }

console.log(loading, recipeList);

  return (
    <GlobalContext.Provider
      value={{ SearchParams, loading, recipeList, setSearchParams, handleSubmit }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
