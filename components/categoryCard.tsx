import React, { useState } from "react";
import { nomineeType } from "../interface/nominee";

interface CategoryCardProps {
  item: nomineeType;
  idx: number;
  setNominee: React.Dispatch<React.SetStateAction<nomineeType | any>>;
  nominee: object | any;
}
interface category {
  id?: string;
  title?: string;
  photoUrL?: string;
  parentId?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  setNominee,
  nominee,
  item,
  idx,
}) => {
  const getSelectedItem = (value: nomineeType) => {
    return nominee.some((item: nomineeType) => {
      return item.id === value.id;
    });
  };

  const selectNominee = (value: category, parentId: string | undefined) => {
    let array = structuredClone([...nominee]);
    let findNominee = nominee.find((item: nomineeType) => {
      return item.id === value.id;
    });
    let findCategory = nominee.find((item: nomineeType) => {
      return item.parentId === parentId;
    });
    let selectedItem: string | undefined = "";
    if (findNominee) {
      setNominee(
        array.filter((item: nomineeType) => {
          return item.id !== value.id;
        })
      );
    } else {
      selectedItem = value.id;
      if (!findCategory) {
        array.push({ ...value, parentId: parentId });
        setNominee(array);
      } else {
      }
    }
  };

  return (
    <div
      className="mb-10 text-white [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-7 border-gray-600"
      key={idx}
    >
      <div className="table rounded-md p-2 bg-red-700 mb-2 text-2xl group-hover:text-[#CCCCCC] font-bold">
        {item.title}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {item?.items?.map((_item: category, idx: number) => {
          return (
            <div
              onClick={() => selectNominee(_item, item.id)}
              className={`${
                nominee.length === 0
                  ? "cursor-pointer bg-basic text-white hover:text-[#CCCCCC] hover:bg-[#34AC9C] md:hover:scale-105"
                  : nominee.some(
                      (jex: nomineeType) =>
                        jex.parentId === item.id && jex.id !== _item.id
                    )
                  ? "bg-basic text-white  cursor-not-allowed"
                  : getSelectedItem(_item)
                  ? "bg-[#34AC9C] text-[#CCCCCC] scale-95 md:scale-90 cursor-pointer"
                  : "bg-basic text-white cursor-pointer"
              }  p-4 rounded-md transition-all duration-200 transform ease-in-out group `}
              key={_item.id}
            >
              <p className=" font-medium text-base">{_item.title}</p>
              <img
                className="max-h-[450px] object-cover object-center w-full mt-2"
                alt={_item.title}
                src={_item.photoUrL}
              />
              <button className="rounded-md mt-4">Select Nominee</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCard;
