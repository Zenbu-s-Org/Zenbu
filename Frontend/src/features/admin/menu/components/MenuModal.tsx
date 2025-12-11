import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useModal } from "@/components/modal";
import { useFetch } from "@/hooks/useFetch";
import { uploadImage } from "../../utils/cloudinaryUpload";

import type {
  MenuItem,
  MenuIngredient,
  Ingredient,
  MenuCategory,
} from "../../types"; //

type Props = {
  mode: "edit" | "create";
  item?: MenuItem;
  onSave: (
    payload: MenuItem | Omit<MenuItem, "_id" | "id">,
    mode: "edit" | "create"
  ) => Promise<void> | void;
};

function MenuModal({ mode, item, onSave }: Props) {
  const { closeModal } = useModal();

  const [name, setName] = useState(item?.name ?? "");
  const [price, setPrice] = useState<number>(item?.price ?? 0);
  const [category, setCategory] = useState<MenuCategory>(
    item?.category ?? "bowl"
  );
  const [desc, setDesc] = useState(item?.desc ?? "");
  const [available] = useState(item?.available ?? true);
  const [imageFile, setImageFile] = useState<File | null>();

  const [base, setBase] = useState(item?.ingredients?.[0]?.id ?? "");
  const [protein, setProtein] = useState(item?.ingredients?.[1]?.id ?? "");
  const [veg, setVeg] = useState(item?.ingredients?.[2]?.id ?? "");
  const [sauce, setSauce] = useState(item?.ingredients?.[3]?.id ?? "");

  const [singleIngredient, setSingleIngredient] = useState(
    item?.ingredients?.[0]?.id ?? ""
  );

  const { data: allIngredients } = useFetch<Ingredient[]>("/ingredients");

  const baseOptions =
    allIngredients?.filter((i) => i.category === "base") ?? [];
  const proteinOptions =
    allIngredients?.filter((i) => i.category === "protein") ?? [];
  const vegOptions = allIngredients?.filter((i) => i.category === "veg") ?? [];
  const sauceOptions =
    allIngredients?.filter((i) => i.category === "sauce") ?? [];

  function buildIngredients(): MenuIngredient[] {
    if (!allIngredients) return [];

    if (category === "bowl") {
      const selectedIds = [base, protein, veg, sauce];

      const selectedIngredients = selectedIds
        .map((id) => allIngredients.find((i) => i.id === id))
        .filter((i): i is Ingredient => Boolean(i));

      return selectedIngredients.map<MenuIngredient>((i) => ({
        id: i.id,
        name: i.name,
        category: i.category,
      }));
    }

    const found = allIngredients.find((i) => i.id === singleIngredient);
    return found
      ? [
          {
            id: found.id,
            name: found.name,
            category: found.category,
          },
        ]
      : [];
  }

  async function handleSubmit() {
    const ingredients = buildIngredients();

    let imageUrl = item?.img ?? "";

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const payload = {
      name,
      price,
      category,
      desc,
      available,
      ingredients,
      img: imageUrl,
    };

    if (mode === "edit") {
      await onSave({ ...item, ...payload }, "edit");
    } else {
      await onSave(payload, "create");
    }

    closeModal();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-bold">
        {mode === "edit" ? "Edit Menu Item" : "Add New Menu Item"}
      </h2>
      {item?.img && (
        <div className="flex justify-center w-full">
          <img
            src={item.img}
            alt={item.name}
            className="w-32 h-32 object-contain border border-stone-300 rounded-md mb-2"
          />
        </div>
      )}
      <input
        className="border-2 border-stone-900 rounded-lg cursor-pointer hover:bg-sky-50 text-center"
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        placeholder="Choose image to upload"
      />

      <Input
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />

      <Input
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Product Price"
      />

      <label className="font-semibold">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as MenuCategory)}
        className="border p-1 rounded"
      >
        <option value="bowl">Bowl</option>
        <option value="drink">Drink</option>
        <option value="extra">Extra</option>
      </select>

      {category === "bowl" && (
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Base</label>
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Select Base</option>
            {baseOptions.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <label className="font-semibold">Protein</label>
          <select
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Select Protein</option>
            {proteinOptions.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <label className="font-semibold">Vegetable</label>
          <select
            value={veg}
            onChange={(e) => setVeg(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Select Vegetable</option>
            {vegOptions.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <label className="font-semibold">Sauce</label>
          <select
            value={sauce}
            onChange={(e) => setSauce(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Select Sauce</option>
            {sauceOptions.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {category !== "bowl" && (
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Ingredient</label>
          <select
            value={singleIngredient}
            onChange={(e) => setSingleIngredient(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Select Ingredient</option>
            {allIngredients?.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <Input
        label="Description"
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Describe Item"
      />

      <Button variant="submit" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
}

export default MenuModal;
