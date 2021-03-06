
import { StackActions, CommonActions } from '@react-navigation/native';
import { NavigationActions } from '@react-navigation/compat'

let _container; // eslint-disable-line

function setContainer(container) {
	_container = container;
}
function reset(routeName) {
	_container.dispatch(
		CommonActions.reset({
			index: 0,
			routes: [
				{ name: routeName }
			],
		})
	)
}

function navigate(routeName, params) {
	_container.dispatch(
		CommonActions.navigate({
			name: routeName,
			params,
			key: params && params.key
		}),
	);
}

function goBack() {
	_container.dispatch(StackActions.pop(1))
}
function navigateDeep(actions) {
	_container.dispatch(
		actions.reduceRight(
			(prevAction, action) =>
				CommonActions.navigate({
					name: action.routeName,
					params: action.params
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
	console.log(StackActions, NavigationActions)
	// return getCurrentRoute().routeName;
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
