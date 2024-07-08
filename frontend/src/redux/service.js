const createUser = async (userProfile, username) => {
  const user = {
    ...userProfile,
    userName: username,
  };
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
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
  return response.json();
};

// TO DO: updateUser function

export default { createUser, getUser };
