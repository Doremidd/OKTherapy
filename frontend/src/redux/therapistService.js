const getTherapist = async (therapistId) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/therapists/${therapistId}`, {
      method: "GET",
    });
    return response.json();
};

export default { getTherapist };