import RecipeItem from "../../Components/RecipeItem";
import { GlobalContext } from "../../Context";
import { useContext } from "react";

export default function Favorites() {
  const { FavoritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
    {FavoritesList && FavoritesList.length > 0 ? (
      FavoritesList.map((item) => <RecipeItem item={item} />)
    ) : (
      <div>
        <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
          Nothing is added in favorites.
        </p>
      </div>
    )}
  </div>
  );
}
