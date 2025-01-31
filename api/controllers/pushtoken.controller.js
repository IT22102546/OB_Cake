const createPushToken = async (req, res) => {
  const { token } = req.body;
  console.log(token);
};

export default createPushToken;
