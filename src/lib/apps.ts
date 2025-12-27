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
];

export function getEnabledApps(): MicroApp[] {
	return microApps.filter((app) => app.enabled);
}
