import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [SearchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [FavoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

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
        setSearchParams("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParams("");
    }
  }
  function handleAddToFavorite(getCurrentItem){
    let cpyFavoritesList = [...FavoritesList];
    const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)

    if(index === -1) {
      cpyFavoritesList.push(getCurrentItem)
    } else {
      cpyFavoritesList.splice(index)
    }

    setFavoritesList(cpyFavoritesList)
  }

  return (
    <GlobalContext.Provider
      value={{
        SearchParams,
        loading,
        recipeList,
        setSearchParams,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        FavoritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
