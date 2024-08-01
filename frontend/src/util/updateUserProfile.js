export const updateUserProfile = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${id}/therapists`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  