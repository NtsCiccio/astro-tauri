export interface MicroApp {
	id: string;
	name: string;
	description: string;
	route: string;
	enabled: boolean;
}

export const microApps: MicroApp[] = [
	{
		id: "todo",
		name: "Todo App",
		description: "Gestisci le tue attività",
		route: "/apps/todo/",
		enabled: true,
	},
	{
		id: "base64",
		name: "Base64 Encoder/Decoder",
		description: "Codifica e decodifica Base64",
		route: "/apps/base64/",
		enabled: true,
	},
	{
		id: "json-formatter",
		name: "JSON Formatter",
		description: "Formatta, minifica e valida JSON",
		route: "/apps/json-formatter/",
		enabled: true,
	},
	{
		id: "jwt-decoder",
		name: "JWT Decoder",
		description: "Decodifica e analizza token JWT",
		route: "/apps/jwt-decoder/",
		enabled: true,
	},
	{
		id: "regex-tester",
		name: "Regex Tester",
		description: "Testa e debugga espressioni regolari",
		route: "/apps/regex-tester/",
		enabled: true,
	},
	{
		id: "timestamp-converter",
		name: "Timestamp Converter",
		description: "Converti timestamp Unix in date e viceversa",
		route: "/apps/timestamp-converter/",
		enabled: true,
	},
	{
		id: "yaml-validator",
		name: "YAML Validator",
		description: "Valida e formatta YAML",
		route: "/apps/yaml-validator/",
		enabled: true,
	},
];

export function getEnabledApps(): MicroApp[] {
	return microApps.filter((app) => app.enabled);
}
