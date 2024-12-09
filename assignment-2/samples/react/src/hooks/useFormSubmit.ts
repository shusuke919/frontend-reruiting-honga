import { useCallback } from "react";

type FormData = {
  name: string;
  email: string;
  postalCode: string;
  prefecture: string;
  address: string;
  building?: string;
};

export const useFormSubmit = () => {
  const submitForm = async (data: FormData) => {
    const requestBody = {
      name: data.name,
      email: data.email,
      zip: data.postalCode,
      prefecture: data.prefecture,
      address1: data.address,
      address2: data.building || "",
    };

    try {
      const response = await fetch("https://httpstat.us/201", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("送信エラー", error);
    }
  };

  return { submitForm };
};
