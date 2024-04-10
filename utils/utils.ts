export const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options as any);
};

export const formatCurrency = (value: any) => {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP", // Change to your desired currency
  }).format(value);
};

export const formatDatePicker = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  return formattedDate;
};

export const setUserToLocalStorage = (user: any) => {
  if (process.client) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setTokenToLocalStorage = (token: string) => {
  if (process.client) {
    localStorage.setItem("token", token);
  }
};

export const removeUserFromLocalStorage = () => {
  if (process.client) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");
  }
};
