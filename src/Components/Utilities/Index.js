const TOKEN_KEY = "loginToken";
const TEST_TOKEN = "testActiveToken";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};

export const testActive = () => {
  localStorage.setItem(TEST_TOKEN, "TestActive");
};

export const isTestActive = () => {
  if (localStorage.getItem(TEST_TOKEN)) {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.clear();
};
