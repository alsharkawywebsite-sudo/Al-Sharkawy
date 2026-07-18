import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-Ulv0o2vY.js
var supabaseUrl = "https://pjnxxwrkrcrfylxbcpqv.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbnh4d3JrcmNyZnlseGJjcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MDIxNDksImV4cCI6MjA5OTM3ODE0OX0.ZFIQUBPHtaoHnSQms56lzuJDg0HOkKSolRtg8vaFPnI";
var client = null;
function getClient() {
	if (client) return client;
	client = createClient(supabaseUrl, supabaseAnonKey, { auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: false
	} });
	return client;
}
var supabase = new Proxy({}, { get(_target, prop) {
	const value = getClient()[prop];
	return typeof value === "function" ? value.bind(getClient()) : value;
} });
//#endregion
export { supabase as t };
