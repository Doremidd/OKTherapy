const getTherapist = async (therapistId) => {
    const response = await fetch(`https://project-24-oktherapy.onrender.com/therapists/${therapistId}`, {
      method: "GET",
    });
    return response.json();
};

export default { getTherapist };