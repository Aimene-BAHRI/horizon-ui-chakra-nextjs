import { getDictionary } from "app/dictionaries";


export default async function BtnNext({ dictionary }) {
  return (
      <button className="btn bg-[#0F0E9A] max-w-80 text-gray-50 ">
        {dictionary.nextbtn}
      </button>
  );
}
