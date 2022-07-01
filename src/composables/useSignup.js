const error = $ref(null);
const isPending = $ref(false);

const useSignup = (url) => {
  const signup = async (email, password, name) => {
    let userId, token, expiryDate;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      if (res.status !== 200 && res.status !== 201) {
        const resData = await res.json();
        throw new Error("创建用户失败!", resData.message);
      }

      const resData = await res.json();
      console.log("resData: ", resData);
      const remainingMilliseconds = 24 * 60 * 60 * 1000;
      expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      userId = resData.userId;
      token = resData.token;
      error = null;
      isPending = false;
    } catch (err) {
      console.log(err.message);
      error = err.message;
      isPending = false;
    }

    return { userId, token, expiryDate };
  };

  return $$({ error, signup, isPending });
};
export default useSignup;
