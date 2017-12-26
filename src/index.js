import "./styles/main.less";
import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import { rehydrate, hotRehydrate } from "rfx-core";
import { isProduction } from "./utils/constants";
import AppLayout from "./layouts/AppLayout";
import stores from "./stores/stores";

const store = rehydrate();

const renderApp = Component => {
	render(
		<AppContainer>
			<Provider store={isProduction ? store : hotRehydrate()}>
				<AppLayout />
			</Provider>
		</AppContainer>,
		document.getElementById("root")
	);
};

renderApp(AppLayout);

if (module.hot) {
	module.hot.accept(() => renderApp(AppLayout));
}
