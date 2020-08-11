
import { StackActions } from '@react-navigation/native';
import { NavigationActions } from '@react-navigation/compat'

let _container; // eslint-disable-line

function setContainer(container) {
	_container = container;
}

function reset(routeName, params) {
	_container.dispatch(
		StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					type: 'Navigation/NAVIGATE',
					routeName,
					params,
				}),
			],
		}),
	);
}

function navigate(routeName, params) {
	// StackActions.push({ routeName, params })
	_container.dispatch(
		NavigationActions.navigate({
			type: 'Navigation/NAVIGATE',
			routeName,
			params,
			key: params && params.key
		}),
	);
}

function goBack(key) {
	_container.dispatch(StackActions.pop(1))

}

function navigateDeep(actions) {
	_container.dispatch(
		actions.reduceRight(
			(prevAction, action) =>
				NavigationActions.navigate({
					type: 'Navigation/NAVIGATE',
					routeName: action.routeName,
					params: action.params,
					action: prevAction,
				}),
			undefined,
		),
	);
}

function getCurrentRoute() {
	if (!_container || !_container.state || !_container.state.nav) {
		return null;
	}
	return _container.state.nav.routes[_container.state.nav.index] || null;
}
//获取当前路由名称
const getCurrentRouteName = () => {
	return getCurrentRoute().routeName;
}

export default {
	setContainer,
	navigateDeep,
	navigate,
	reset,
	getCurrentRoute,
	goBack,
	getCurrentRouteName
};