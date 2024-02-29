import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../Context";

export default function Details() {
  const { id } = useParams();
  const { recipeDetailsData, setRecipeDetailsData, handleAddToFavorite, FavoritesList } =
    useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data?.recipe) {
        setRecipeDetailsData(data);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  console.log(recipeDetailsData);
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.data?.recipe?.image_url}
            alt="recipe details"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.data?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.data?.recipe?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipeDetailsData?.data?.recipe)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {
              FavoritesList.includes(recipeDetailsData?.data?.recipe) ? "Remove from Favorites" : "Add to Favorites"
            }
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.data?.recipe?.ingredients.map(
              (ingredient, index) => (
                <li key={index}>
                  <span className="text-2xl font-semibold text-black">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span className="text-2xl font-semibold text-black">
                    {ingredient.description}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
