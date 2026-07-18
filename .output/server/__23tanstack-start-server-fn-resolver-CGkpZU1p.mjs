//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CGkpZU1p.js
var manifest = { "e258447af0924417aae6eff07291bbffb07db30fbf9c840ffa4b2358c3492172": {
	functionName: "notifyNewOrder_createServerFn_handler",
	importer: () => import("./_ssr/notify-order.functions-DVQKc7nq.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
