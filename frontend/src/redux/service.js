const createUser = async (userProfile,userName) => {
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userProfile,userName }),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data?.message;
    throw new Error(errorMessage);
  }
  return data;
};

const getUser = async (userName) => {
  const response = await fetch(`http://localhost:3001/users/${userName}`, {
    method: "GET",
  });
  if (!response.ok) {
    const errorMessage = (await response.json()).message;
    throw new Error(errorMessage);
  }

  return response.json();
};

//updateUser function
const updateUser = async (userProfile,userName) => {
  const response = await fetch(`http://localhost:3001/users/${userName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data?.message;
    throw new Error(errorMessage);
  }
  return data;
};

export default { createUser, getUser,updateUser };
