const createUser = async (userProfile,userID,userName) => {
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userProfile, userID, userName }),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data?.message;
    throw new Error(errorMessage);
  }
  return data;
};

const getUser = async (userID) => {
  const response = await fetch(`http://localhost:3001/users/${userID}`, {
    method: "GET",
  });
  if (!response.ok) {
    const errorMessage = (await response.json()).message;
    throw new Error(errorMessage);
  }

  return response.json();
};

// TO DO: updateUser function
const updateUser = async (userProfile,userID) => {
  const response = await fetch(`http://localhost:3001/users/${userID}`, {
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
