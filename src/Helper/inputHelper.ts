import React from "react";

const inputHelper = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  data: any
) => {
  const tempData = { ...data };
  const { name, type } = e.target;

  tempData[name] =
    type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

  return tempData;
};

export default inputHelper;
