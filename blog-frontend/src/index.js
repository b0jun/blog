import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./lib/styles/GlobalStyles";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from "redux-saga";
import { tempSetUser, check } from "./modules/user";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

/**
 * #새로고침 해도 로그인 유지#
 * RegisterForm에서 이를 구현하면 짧은 순간에 로그인이 나타났다가 로그아웃이 나타난다.
 * componenetDidMount 와 useEffect는 컴포넌트가 한 번 렌더링된 이후에 실행되기 때문인데,
 * 그래서 해당 파일에서 사용자 정보를 불러오도록 처리하고 컴포넌트를 렌더링해준다.
 */
function loadUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return; //로그인 상태가 아니라면 아무것도 안 함

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log("localStorage is not working");
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
