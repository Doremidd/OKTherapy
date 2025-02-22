const getTherapist = async (therapistId) => {
    const response = await fetch(`http://localhost:3001/therapists/${therapistId}`, {
      method: "GET",
    });
    return response.json();
};

export default { getTherapist };